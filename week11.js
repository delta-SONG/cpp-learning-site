/* Week 11: seven binary-search lessons with fixed, inspectable teaching traces. */
(function(root){
'use strict';
const boundCode = [
  '#include <iostream>', '#include <vector>', 'using namespace std;', '',
  'int main() {', '    int n, target;', '    cin >> n;',
  '    vector<int> a(n);', '    for (int i = 0; i < n; i++) cin >> a[i];',
  '    cin >> target;', '    int lo = 0, hi = n;', '    while (lo < hi) {',
  '        int mid = lo + (hi - lo) / 2;',
  '        if (a[mid] < target) lo = mid + 1;',
  '        else hi = mid;', '    }', "    cout << lo << '\\n';",
  '    return 0;', '}'
];
const spec = [
  ['ordered','有序序列与排除','1 3 3 7 9',3,'1','第一个不小于 3 的数位于下标 1；下标 2 虽然也满足条件，却不是第一个。'],
  ['lower','半开区间与下界','2 4 6 8',5,'2','下标 2 的值 6 已经不小于 5；下标从 0 开始。'],
  ['boundary','重复值与边界','2 2 4',3,'2','下标 2 是插入位置，但该处的值为 4，不能据此认为 3 存在。'],
  ['upper','上界与出现次数','1 3 3 3 8',3,'3','下界为 1、上界为 4；半开区间 [1,4) 长度为 3，不能再加 1。']
];
const lessons=spec.map(([id,title,numbers,target,answer,reason],i)=>({
  id:'week11-'+id,week:11,day:i+1,title,subtitle:'非降序 · 半开区间 · 第一个不小于',
  goal:'理解候选区间并找到第一个不小于目标的位置。',time:'约 60 分钟',model:'w11-lower',
  inputs:[['numbers','非降序整数序列（可留空）',numbers],['target','目标值',target,-1000000,1000000]],
  numberMin:-1000000,numberMax:1000000,numberMinCount:0,code:boundCode,
  concepts:[
    '序列按非降序排列，允许重复。下界是第一个不小于目标的下标；若没有，则返回 n。下标从 0 开始。',
    '维护半开区间 [lo,hi)：左端包含、右端不包含。若中点值小于目标，中点及其左边均可排除；否则中点仍可能是答案，令 hi=mid。',
    '循环结束时 lo=hi。返回 n 是合法的插入位置，但不能访问 a[n]。要判断目标是否存在，还需先检查 lo<n，再检查 a[lo]==target。',
    '每次区间严格缩小，时间复杂度 O(log n)，存放序列需 O(n) 空间。无序输入不能使用这个排除规则。'
  ],
  note:'固定示例的教学轨迹，不是任意 C++ 代码编译器。输入必须非降序。',
  quiz:[`默认序列中，目标 ${target} 的下界是多少？`,answer,reason],
  hints:['先画出 [lo,hi)，判断中点及左侧是否可能有答案。','a[mid]<target 时 lo=mid+1；否则 hi=mid。结束后先检查 lo<n 再访问数组。'],
  tasks:[{title:'独立练习：查找下界',purpose:'读入 n、n 个非降序整数及目标，输出第一个不小于目标的下标；不存在时输出 n。自行实现线性扫描作为对照，测试空序列、重复值、首尾和缺失目标。'}],
  reflection:'为什么右边界不包含在候选区间内？为什么结果等于 n 时不能访问 a[n]？',arrayKey:'a',arrayLabel:'有序序列 a · 下标从 0 开始'
}));
function trace(model,input,code=boundCode){
  if(model==='w11-upper')return upperTrace(input);
  if(model==='w11-groups')return groupsTrace(input);
  if(model==='w11-capacity')return capacityTeachingTrace(input);
  if(model==='w11-upper')return upperTrace(input);
  if(model!=='w11-lower')throw Error('unknown model');
  const a=input.numbers, target=input.target, n=a.length, frames=[];
  let lo=0,hi=n,mid, out='';
  const step=(line,message,vars,activeIndex)=>frames.push({line,message,vars:JSON.parse(JSON.stringify(vars)),output:out,activeIndex});
  step(5,'进入 main。',{});
  step(6,'声明 n 和目标。',{n:'未赋值',target:'未赋值'});
  step(7,'读取序列长度。',{n,target:'未赋值'});
  step(8,'创建 n 个元素。',{n,target:'未赋值',a:Array(n).fill(0)});
  const read=Array(n).fill(0);
  for(let i=0;i<n;i++){read[i]=a[i];step(9,'读取当前位置。',{n,target:'未赋值',a:[...read],i},i);}
  step(10,'读取目标。',{n,target,a:[...a]});
  step(11,'候选区间初始化为 [0,n)。',{n,target,a:[...a],lo,hi});
  while(true){
    step(12,lo<hi?'区间非空，继续查找。':'区间为空，查找结束。',{n,target,a:[...a],lo,hi});
    if(lo>=hi)break;
    mid=lo+Math.floor((hi-lo)/2);
    step(13,'计算中点。',{n,target,a:[...a],lo,hi,mid},mid);
    if(a[mid]<target){lo=mid+1;step(14,'中点及左侧均小于目标，排除。',{n,target,a:[...a],lo,hi,mid},mid);}
    else {hi=mid;step(15,'中点可能是答案，将它设为新的右边界。',{n,target,a:[...a],lo,hi,mid},mid);}
  }
  out=String(lo);step(17,'输出下界；n 表示不存在。',{n,target,a:[...a],lo,hi});
  step(18,'程序结束。',{n,target,a:[...a],lo,hi});return frames;
}
const upperCode=['#include <iostream>','#include <vector>','using namespace std;','','int main() {','    int n, target;','    cin >> n;','    vector<int> a(n);','    for (int i = 0; i < n; i++) cin >> a[i];','    cin >> target;','    int lo = 0, hi = n;','    while (lo < hi) {','        int mid = lo + (hi - lo) / 2;','        if (a[mid] <= target) lo = mid + 1;','        else hi = mid;','    }','    cout << lo << \'\\n\';','    return 0;','}'];
const upperLesson={...lessons[0],id:'week11-upper',day:4,title:'上界与出现次数',subtitle:'第一个大于 · 半开区间 · 计数',model:'w11-upper',code:upperCode,inputs:[['numbers','非降序整数序列','1 3 3 3 8'],['target','目标值',3,-1000000,1000000]],quiz:['序列中目标出现几次？','3','下界为 1、上界为 4，差值 3 就是出现次数。'],concepts:['上界是第一个严格大于目标的位置。与下界相比，只把判断改为 a[mid]≤target 时向右移动。','目标值所在的位置范围是 [下界,上界)，两端相减就是出现次数。缺失时两者相等，次数为 0。','不要用 target+1 模拟上界；目标为整数最大值时加一会溢出。'],hints:['分别找第一个 ≥目标和第一个 >目标的位置。','出现次数 = 上界 - 下界。'],tasks:[{title:'独立练习：统计出现次数',purpose:'独立实现上下界并与线性计数比较，测试空序列、重复、缺失目标及整数边界。'}],reflection:'为什么上界减下界不需要再加 1？'};
Object.assign(lessons[3],upperLesson,{id:'week11-upper',day:4});
const monotone={...lessons[0],id:'week11-feasible',day:5,title:'单调可行性',subtitle:'容量变化 · 可行与否 · 单调',model:'w11-groups',inputs:[['total','总量',10,1,1000],['capacity','每组容量',3,1,1000],['limit','最多组数',3,1,1000]],quiz:['总量 10、容量 3 时至少需要几组？','4','3 组装 9 个，还剩 1 个，需要第 4 组。'],concepts:['固定容量时，总量除以容量得到完整组，余数非零还要多一组。','容量越大，需要的组数不会增加，因此“组数不超过限制”是单调条件。二分答案前先证明这种单调性。','本例输入均为正整数；不能把该公式直接当成连续分段问题的判定。'],hints:['先计算商和余数。','余数非零时组数加一，再与限制比较。'],tasks:[{title:'独立练习：枚举最小可行容量',purpose:'总量 10、最多 3 组，枚举容量并找最小可行值；解释容量 3 不可行、4 可行。'}],reflection:'容量增加时，为什么可行性不会从真变回假？'};
lessons.push(monotone);
const capacityCode=['#include <iostream>','#include <vector>','using namespace std;','','bool feasible(const vector<int>& a, int days, int cap) {','    int used = 1, sum = 0;','    for (int x : a) {','        if (x > cap) return false;','        if (sum + x > cap) { ++used; sum = 0; }','        sum += x;','    }','    return used <= days;','}','int main() {','    int n, days; cin >> n >> days;','    vector<int> a(n); int hi = 0;','    for (int& x : a) { cin >> x; hi += x; }','    int lo = 0;','    while (lo < hi) {','        int mid = lo + (hi - lo) / 2;','        if (feasible(a, days, mid)) hi = mid;','        else lo = mid + 1;','    }','    cout << lo << \'\\n\';','    return 0;','}'];
lessons.push({...lessons[0],id:'week11-answer',day:6,title:'连续分段的答案二分',subtitle:'可行性判定 · 最小可行容量',model:'w11-capacity',code:capacityCode,inputs:[['numbers','非负工作量（按原顺序）','1 2 3 4'],['days','最多连续段数',2,1,12]],numberMin:0,numberMax:100,quiz:['工作量 1 2 3 4，最多分 2 段，最小容量是多少？','6','容量 5 至少需要 3 段；容量 6 可分为 [1,2,3] 和 [4]。'],concepts:['固定容量后，从左到右尽量装满当前连续段；放不下时另开一段。任何单项超过容量就不可行。','工作量非负且顺序固定时，容量增大不会让可行变成不可行。搜索 [0,sum] 中第一个可行容量。','贪心判定依赖非负、不可拆分、保持顺序。含负数会破坏它，例如 [4,4,-4] 容量 4。'],hints:['先写固定容量的段数判定，并逐项手推。','可行则 hi=mid，不可行则 lo=mid+1；右端总和必可行。'],tasks:[{title:'独立练习：枚举切分对拍',purpose:'枚举小数组所有连续切分，与答案二分比较；测试全零、单项、天数 1 与 n。'}],reflection:'为什么非负和保持顺序是贪心判定的必要条件？'});
lessons.push({...lessons[0],id:'week11-review',day:7,title:'闭卷复习与错因整理',subtitle:'下界 · 上界 · 单调判定 · 答案二分',model:'w11-lower',inputs:[['numbers','非降序整数序列','0 0 0'],['target','目标值',0,-1000000,1000000]],review:true,quiz:['[0,0,0] 的下界是多少？','0','第一个不小于 0 的位置就是下标 0。'],concepts:['闭卷写出下界和上界的循环，说明每次更新如何缩小 [lo,hi)。','再写连续分段的固定容量判定，解释单项超限、开新段与段数限制。','分别用线性扫描和枚举切分验证。记录独立完成、提示后完成或参考答案后完成；后两种安排 2～3 天后闭卷重做。'],hints:['先画区间不变量，再决定每个分支能排除哪一段。','答案二分先证明可行性随容量单调；不能证明就不要二分。'],tasks:[{title:'综合复做',purpose:'独立实现上下界、出现次数和连续分段最小容量；每种都用小规模暴力对照，并记录一个真实错误原因。'}],reflection:'哪一步你能独立解释并写出？哪一步需要在几天后重做？'});
if(lessons.length!==7||new Set(lessons.map(x=>x.id)).size!==7)throw Error('week 11 lesson id/count mismatch');
function upperTrace(input){const a=input.numbers,target=input.target,n=a.length,frames=[];let lo=0,hi=n,mid;const step=(line,message)=>frames.push({line,message,output:'',vars:{a:[...a],n,target,lo,hi,...(mid===undefined?{}:{mid})}});step(11,'候选区间 [0,n)。');while(lo<hi){step(12,'区间非空，继续查找。');mid=lo+Math.floor((hi-lo)/2);step(13,'计算中点。');if(a[mid]<=target){lo=mid+1;step(14,'中点不大于目标，移到右侧。');}else{hi=mid;step(15,'中点大于目标，保留左侧。');}}step(17,'上界位置。');frames.at(-1).output=String(lo);step(18,'程序结束。');frames.at(-1).output=String(lo);return frames;}
const groupsCode=['#include <iostream>','using namespace std;','','int main() {','    int total, capacity, limit;','    cin >> total >> capacity >> limit;','    int groups = total / capacity;','    if (total % capacity != 0) groups++;','    bool feasible = groups <= limit;','    cout << groups << \' \' << feasible << \'\\n\';','    return 0;','}'];
function groupsTrace(input){const {total,capacity,limit}=input,frames=[];let groups;const vars={total,capacity,limit};const step=(line,message)=>frames.push({line,message,vars:{...vars},output:''});step(4,'声明输入变量。');step(5,'读入总量、容量和组数限制。');groups=Math.floor(total/capacity);vars.groups=groups;step(7,'整数除法得到完整组数。');if(total%capacity!==0){groups++;vars.groups=groups;step(8,'有余数，再增加一组。');}else step(8,'没有余数，不需要额外一组。');vars.feasible=groups<=limit;step(9,'将所需组数与限制比较。');frames.at(-1).output=`${groups} ${+vars.feasible}`;step(10,'输出所需组数和可行性。');frames.at(-1).output=`${groups} ${+vars.feasible}`;return frames;}
function capacityTeachingTrace(input){const a=input.numbers,days=input.days,n=a.length,sum=a.reduce((x,y)=>x+y,0),frames=[];let lo=0,hi=sum,mid,used=1,current=0,feasible=true;const vars=()=>({a:[...a],n,days,lo,hi,mid,used,current,feasible});const step=(line,message)=>frames.push({line,message,vars:vars(),output:''});step(15,'读入 n 与最多段数。');step(16,'创建数组并准备总和上界。');step(17,'逐项读入工作量并累加总和。');step(18,'容量答案范围从 0 到总和。');while(lo<hi){step(19,'检查候选区间是否为空。');mid=lo+Math.floor((hi-lo)/2);used=1;current=0;feasible=true;step(20,'取中点作为候选容量。');step(21,'调用可行性判定。');for(let i=0;i<n;i++){const x=a[i];step(7,`检查工作量 a[${i}]=${x}。`);if(x>mid){feasible=false;current=x;step(8,'单项超过容量，立即判为不可行。');break;}if(current+x>mid){used++;current=0;step(9,'当前段放不下，开启新段。');}current+=x;step(10,`把 a[${i}]=${x} 放入当前段。`);}if(used>days)feasible=false;step(12,'返回所需段数是否不超过限制。');if(feasible){hi=mid;step(21,'可行，尝试更小容量。');}else{lo=mid+1;step(22,'不可行，排除当前容量及更小值。');}}step(23,'候选区间缩小至一个答案。');step(24,'输出最小可行容量。');frames.at(-1).output=String(lo);step(25,'程序结束。');frames.at(-1).output=String(lo);return frames;}
Object.assign(monotone,{code:groupsCode});
root.CPP_WEEK11={lessons,trace,boundCode,upperCode,groupsCode};
if(typeof module!=='undefined')module.exports=root.CPP_WEEK11;
})(globalThis);


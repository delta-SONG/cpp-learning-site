/* Fixed, bounded teaching models for week two. No arbitrary code execution. */
(function(root){
 'use strict';
 const wrap=lines=>['#include <iostream>','using namespace std;','','int main() {',...lines.map(x=>'    '+x),'    return 0;','}'];
 const task=(title,purpose,id)=>({title,purpose,...(id?{id}:{})});
 const half=wrap(['int length, day = 1;','cin >> length;','while (length > 1) {','    length = length / 2;','    day = day + 1;','}','cout << day << \'\\n\';']);
 const count=wrap(['int n, count = 0;','cin >> n;','for (int i = 1; i <= n; i++) {','    if (i % 2 == 0) {','        count = count + 1;','    }','}','cout << count << \'\\n\';']);
 const array=wrap(['int n, a[12] = {};','cin >> n;','for (int i = 0; i < n; i++) {','    cin >> a[i];','}','cout << a[n - 1] << \'\\n\';']);
 const sum=wrap(['int n, a[12] = {}, sum = 0;','cin >> n;','for (int i = 0; i < n; i++) {','    cin >> a[i];','}','for (int i = 0; i < n; i++) {','    sum = sum + a[i];','}','cout << sum << \'\\n\';']);
 const reverse=wrap(['int a[101] = {}, n = 0, x;','while (cin >> x && x != 0) {','    a[n] = x;','    n = n + 1;','}','for (int i = n - 1; i >= 0; i--) {','    cout << a[i] << " ";','}','cout << \'\\n\';']);
 const fish=wrap(['int n, a[100] = {};','cin >> n;','for (int i = 0; i < n; i++) {','    cin >> a[i];','}','for (int i = 0; i < n; i++) {','    int count = 0;','    for (int j = 0; j < i; j++) {','        if (a[j] < a[i]) {','            count = count + 1;','        }','    }','    cout << count << " ";','}','cout << \'\\n\';']);
 const numbers=(value='3 1 4 1',max=1000)=>[['numbers',`数字（空格分隔，1–12 个，0～${max}）`,value]];
 const stream=(value='3 1 4 0')=>[['stream','完整输入（最多 12 个正整数，最后写 0）',value]];
 const lessons=[
 {id:'week2-half',title:'重复到什么时候',subtitle:'while · 循环终止 · 手推边界',goal:'先检查条件，再重复操作；看清为什么循环最终会停。',time:'约 60 分钟',model:'w2-half',inputs:[['length','木棍长度',9,1,1024]],code:half,
 concepts:['上周的 for 适合按次数重复。while (条件) 在每轮开始前检查条件：真就执行循环体，假就立刻离开；一开始为假时，一轮也不执行。','木棍第一天保持原长，day 从 1 开始。只要 length > 1，就用整数除法把长度减半，并把天数加 1。9→4→2→1，所以第 4 天到达长度 1。','循环体必须让状态朝终止条件变化。如果忘记 length = length / 2，条件一直为真就无法结束。先试 length=1：不用砍，答案就是第 1 天。'],
 note:'循环次数是 3，天数是 4；第一天也算一天。不要把这两个量混在一起。',quiz:['length=9，输出第几天到达 1？','4','第一天长度 9；第 2、3、4 天分别为 4、2、1。day 初值是 1。'],
 hints:['先列出每天的整数长度；终止条件应是已经到 1。','day=1；while (length>1) 中依次减半并增加 day，循环后输出 day。'],tasks:[task('一尺之棰','完成洛谷 P5720。原题长度最大 10^9；演示为便于观察限制为 1024。测试 1→1、2→2、9→4。','P5720')],reflection:'为什么 length=1 时循环零次？如果 day 从 0 开始，会怎样？'},
 {id:'week2-count',title:'计数和累加的区别',subtitle:'循环内判断 · 计数器',goal:'数一数满足条件的项，区分“几个”和“总和”。',time:'约 60 分钟',model:'w2-count',inputs:[['n','检查 1 到 n',6,1,20]],code:count,
 concepts:['上周 sum += i 是把数值相加。这里每找到一个偶数，就让 count 加 1；变量保存的是数量，不是偶数的和。','先把 count 初始化为 0。对 1 到 n 的每个数检查 i % 2 == 0，只有条件成立时才增加计数。奇数也会占用一次循环。','n=6 时，循环检查 6 次，找到 2、4、6 共 3 个偶数。n=1 时计数保持 0；最后一轮 i==n 仍然要检查。'],note:'count = count + 1 是“多发现一个”；sum = sum + i 是“把当前值加入总和”。',quiz:['1 到 6 有几个偶数？程序输出什么？','3','满足条件的是 2、4、6，共 3 个；12 是它们的总和，不是数量。'],hints:['列出范围内的数，为满足条件的每个数画一条记号。','初始化 count=0，循环检查 i%2==0；成立就 count=count+1。'],tasks:[task('本地练习：同时数一数、加一加','从空白文件写程序，输出 1 到 n 的偶数个数及其总和。测试 n=1、2、6、7；例如 n=6 输出 3 12。参考代码只示范计数，总和由你补充。')],reflection:'如果把 count=count+1 改成 count=count+i，变量的含义会变成什么？'},
 {id:'week2-index',title:'给一组数字编号',subtitle:'数组 · 下标从 0 开始',goal:'把输入存进连续的格子，找到最后一个有效位置。',time:'约 60 分钟',model:'w2-index',inputs:numbers(),code:array,
 concepts:['int a[12] = {}; 创建 12 个整数格子，编号是 0 到 11；{} 把这些格子初始化为 0。a[0] 是第一个，不是第零个数据。','n 表示这次实际读入的数据个数。for (int i=0; i<n; i++) 依次访问 a[0] 到 a[n-1]，恰好 n 次。容量 12 和有效数据个数 n 不是一回事。','本例先读 n，再读 n 个数字。网页根据你填写的数字个数准备 n。最后有效位置是 n-1，所以输出 a[n-1]；读取 a[n] 不能得到最后一个输入。'],note:'演示只显示有效的 n 个格子。数组容量有 12 个；提交自己的程序时，容量必须覆盖题目范围。',quiz:['输入为 4 个数 3 1 4 1，最后一个输入的下标是多少？','3','四个位置依次是 0、1、2、3；最后下标 n-1=3，最后值为 1。题目问下标，不是值。'],hints:['画四个格子，从 0 开始编号，再填入数据。','先读 n，再用 i=0 到 i<n 读入 a[i]，循环后输出 a[n-1]。'],tasks:[task('本地练习：首尾对照','读入 n 和 n 个非负整数，输出第一个和最后一个数。限制 1≤n≤12。测试只有一个数、所有数相同、最后一个数为 0。示例只输出最后一个值，尝试自行增加第一个。')],reflection:'n=1 时，a[0] 和 a[n-1] 是否是同一个格子？'},
 {id:'week2-traverse',title:'存下来，再走一遍',subtitle:'数组遍历 · 两次循环',goal:'分开“读入”与“处理”，理解为什么数据可以再次使用。',time:'约 60 分钟',model:'w2-array-sum',inputs:numbers('2 0 5'),code:sum,
 concepts:['第一段循环只把数据存到数组里；第二段循环重新从 i=0 开始，依次取出每个值并加入 sum。两次 i 是各自循环内的局部变量。','读入 i=2 的数据以后，a[0] 与 a[1] 的值仍然保留。数组让我们可以按下标回头访问，而单个 x 读下一个数时会覆盖旧值。','sum 从 0 开始，第二段循环每轮做 sum=sum+a[i]。读入循环和求和循环各走 n 次，总共与 n 成正比，不是 n²。下一课会用数组从后往前访问。'],note:'两段先后执行的循环与一段循环里面再套一段循环，执行次数不同。',quiz:['输入数字为 2 0 5，第二段循环结束后的 sum 是多少？','7','sum 从 0 开始，依次变为 2、2、7。中间的 0 是正常数据，不是结束标记。'],hints:['分别写下读入后的数组和处理过程中的 sum。','读入循环结束后，再从 i=0 开始遍历，用 sum=sum+a[i] 累加；输出写在循环外。'],tasks:[task('本地练习：第二次使用数据','读入 n（1～12）和数组，先输出总和，再按原顺序输出每个数。测试一个数、全零、重复值。想一想：若需要反复访问数据，为什么要保留数组？')],reflection:'本课的 0 为什么不能结束输入？哪一个量规定了需要读几个数？'},
 {id:'week2-reverse',title:'读到标记，再倒着走',subtitle:'while 输入 · 结束标记 · 逆序',goal:'先判断 0，再决定是否保存；从最后一个有效位置开始输出。',time:'约 60 分钟',model:'w2-reverse',inputs:stream(),code:reverse,
 concepts:['输入长度未知，用 0 表示结束。while (cin >> x && x != 0) 先尝试读入；成功且 x 非零才执行循环体。&& 从左到右检查，前一项为假就不再检查后一项。','n 从 0 开始，表示已保存的个数，也是下一个可写位置。先 a[n]=x，再 n=n+1。读到 0 时循环体不会执行，所以结束标记不进入数组。','输出从 i=n-1 开始，每次 i--，只要 i>=0 就输出 a[i]。i 使用有符号 int；如果一开始就是 0，则 n=0、i=-1，输出循环零次。程序最后只输出换行。'],note:'这里 0 有特殊意义。本课必须在输入末尾写 0，且前面的数字都为正；这与上一课的“已知 n 个数字”不同。',quiz:['完整输入为 3 1 4 0，倒序输出是什么？用空格分隔。','4 1 3','0 只负责结束，不保存、不输出。有效数据共有 3 个，按下标 2、1、0 输出。'],hints:['先把 0 前面的数字存下来，再从最后一个有效下标向前走。','n=0；每读到非零 x，存 a[n] 后 n++；最后 for(int i=n-1;i>=0;i--) 输出 a[i]。'],tasks:[task('小鱼的数字游戏','完成洛谷 P1427。题目输入没有 n，以末尾唯一的 0 结束；数字最多 100 个。代码容量 101，实验最多 12 个正整数。测试 0、7 0、2 2 5 0。','P1427')],reflection:'为什么必须先检查 x!=0 再存入？如果从 i=n 开始倒序，会多出什么？'},
 {id:'week2-fish',title:'一条鱼，看左边的鱼',subtitle:'双重循环 · 严格比较 · 计数清零',goal:'用两个下标区分当前对象和比较对象，避免数到自己。',time:'可分段完成',model:'w2-fish',inputs:numbers('3 1 3 4',10),numberMax:10,code:fish,
 concepts:['当前鱼的位置是 i，只能看到左边 j=0 到 i-1 的鱼。外层选择 i，内层遍历左边位置；j<i 避免把自己和右边也算进来。','每换一条鱼，都把 count 初始化为 0。仅当 a[j]<a[i] 时增加计数；一样可爱不算更小。例如 3 1 3 4 对应 0 0 1 3。','内层比较次数依次是 0、1、2、…、n-1，总计 n(n-1)/2，数量级是 O(n²)。O(n²) 描述规模增长趋势，并不表示恰好比较 n² 次。本题 n≤100，可以直接枚举。'],note:'每次外层循环都需要一份新的 count；相等值不计数，比较用 < 而不是 <=。',quiz:['可爱值 3 1 3 4，各条鱼看到的更小值数量是什么？','0 0 1 3','第 3 条鱼左边的 3 与它相等，只有 1 更小。最后一条鱼左边三个数都小于 4。'],hints:['选定一条鱼，只圈它左边的位置，再数其中严格更小的值。','读入数组；外层 i=0..n-1，先 count=0；内层 j=0..i-1，若 a[j]<a[i] 就 count++；输出本条鱼的 count。'],tasks:[task('小鱼比可爱','完成洛谷 P1428，输入先给 n，再给可爱值（0～10），最多 100 条鱼。测试 n=1、全部相同、严格升序和严格降序。','P1428')],reflection:'如果 count 放在外层循环外并且不清零，3 1 3 4 的最后一个输出会如何出错？'},
 {id:'week2-review',review:true,title:'检查数组与循环的边界',subtitle:'混合预测 · 闭卷复做 · 最小反例',goal:'通过换输入和独立编码，检查计数、下标与结束标记。',time:'可分段完成',model:'w2-reverse',inputs:stream('2 2 5 0'),code:reverse,
 concepts:['先不看参考答案，手推输入 2 2 5 0。记录每次 n 的值，再解释倒序循环的起点和终点。重复值依然是两个数据，不能擅自去重。','本周最常见的边界是：零次循环、一个输入、最后一个下标、结束标记，以及相等值是否计数。遇到错误时先用最小输入复现，再检查初始化和条件。','从空白文件复做逆序与左侧计数。不记得语法时先看第一层提示，完成后记录真实完成方式；2～3 天后再闭卷重做。课程可以继续浏览，未掌握的内容需要顺延复习。'],note:'下方根据本周记录列出回顾建议；自报完成、预测正确和网页浏览都不能替代独立实现。',quiz:['完整输入 2 2 5 0，逆序结果是什么？','5 2 2','重复值要全部保留；末尾 0 不输出，结果从最后一个有效数据开始。'],extraQuiz:[['一开始输入 0，有效数据个数 n 是多少？','0','0 是结束标记，所以没有保存任何数据。数组输出循环会跳过。'],['可爱值为 2 2 2，左侧更小值计数依次是什么？','0 0 0','相等不满足严格小于，每条鱼的计数也会重新从 0 开始。']],hints:['先画有效数组；分清“个数 n”和“最后下标 n-1”。','读到非零才保存，倒序从 n-1 到 0；左侧计数则每次重置 count 并严格比较。'],tasks:[task('复做：小鱼的数字游戏','关闭旧代码重写，测试只有 0、单个数与重复数。','P1427'),task('复做：小鱼比可爱','关闭参考代码，解释每层循环及 count 的作用域。测试相等与降序。','P1428'),task('本周总结','写出你独立完成的内容、最常见的一次边界错误和下次第一步。仍依赖提示的题安排 2～3 天后重做。')],reflection:'我能解释 n、i、j 各表示什么吗？下一次最值得先修哪个问题？'}
 ];
 lessons.forEach((l,i)=>{l.week=2;l.day=i+1;});
 function trace(model,input,code){
  const frames=[],vars={};let out='',activeIndex=null;
  const step=(line,message,changes={},output,index=null)=>{Object.assign(vars,changes);if(output!==undefined)out=String(output);activeIndex=index;frames.push({line,message,vars:Object.fromEntries(Object.entries(vars).map(([k,v])=>[k,Array.isArray(v)?v.slice():v])),output:out,activeIndex});};
  step(3,'程序进入 main。');
  if(model==='w2-half'){
   step(4,'声明 length；day 从第 1 天开始。',{length:'未赋值',day:1});step(5,'读入初始长度。',{length:input.length});
   while(true){step(6,`${vars.length} > 1 为${vars.length>1?'真':'假'}。`);if(vars.length<=1)break;step(7,'整数除法舍去小数部分，长度减半。',{length:Math.trunc(vars.length/2)});step(8,'再过一天。',{day:vars.day+1});}
   step(10,'输出到达长度 1 的天数。',{},vars.day);
  }else if(model==='w2-count'){
   step(4,'count 从 0 开始。',{n:'未赋值',count:0});step(5,'读入检查上限。',{n:input.n});step(6,'初始化 i=1。',{i:1});
   for(let i=1;i<=input.n;i++){step(6,`${i} <= ${input.n} 为真。`);step(7,`${i}%2==0 为${i%2===0?'真':'假'}。`);if(i%2===0)step(8,'找到一个偶数，数量加 1。',{count:vars.count+1});step(6,'执行 i++。',{i:i+1});}
   step(6,'循环条件为假，退出。');delete vars.i;step(11,'输出数量，而不是偶数之和。',{},vars.count);
  }else if(model==='w2-reverse'){
   step(4,'数组初始化为 0；n=0，尚无有效数据。',{a:[],n:0,x:'未赋值'});
   for(const x of input.stream){step(5,`读入 x=${x}；x!=0 为${x!==0?'真':'假'}。`,{x});if(x===0)break;vars.a.push(x);step(6,`把 x 写入下标 ${vars.n}。`,{},undefined,vars.n);step(7,'已保存个数增加 1。',{n:vars.n+1});}
   step(9,'倒序从最后一个有效下标 n-1 开始。',{i:vars.n-1});
   for(let i=vars.n-1;i>=0;i--){step(9,`${i} >= 0 为真。`,{},undefined,i);out+=vars.a[i]+' ';step(10,`输出 a[${i}]，重复值照常保留。`,{},out,i);step(9,'执行 i--。',{i:i-1});}
   step(9,'-1 >= 0 为假；空序列也会直接跳过。');delete vars.i;step(12,'输出换行；结果展示省去行末空格。',{},out.trim());
  }else{
   const a=input.numbers,n=a.length;
   const isSum=model==='w2-array-sum',isFish=model==='w2-fish';
   step(4,`创建容量为 ${isFish?100:12} 的数组并初始化为 0。`,{n:'未赋值',a:Array(n).fill(0),...(isSum?{sum:0}:{})});
   step(5,`网页先提供 n=${n}，再依次提供数字。`,{n});step(6,'读入循环初始化 i=0。',{i:0});
   for(let i=0;i<n;i++){step(6,`${i} < ${n} 为真。`,{},undefined,i);vars.a[i]=a[i];step(7,`读入第 ${i+1} 个数，放进 a[${i}]。`,{},undefined,i);step(6,'执行 i++。',{i:i+1});}
   step(6,`${n} < ${n} 为假，读入结束。`);delete vars.i;
   if(model==='w2-index')step(9,`最后有效下标为 ${n-1}，输出该格子的值。`,{},a[n-1],n-1);
   if(isSum){step(9,'新一段循环重新初始化 i=0。',{i:0});for(let i=0;i<n;i++){step(9,`${i} < ${n} 为真。`,{},undefined,i);step(10,`把 a[${i}]=${a[i]} 加入 sum。`,{sum:vars.sum+a[i]},undefined,i);step(9,'执行 i++。',{i:i+1});}step(9,'条件为假，退出处理循环。');delete vars.i;step(12,'输出累加结果。',{},vars.sum);}
   if(isFish){step(9,'外层从第 0 条鱼开始。',{i:0});for(let i=0;i<n;i++){
    step(9,`${i} < ${n} 为真，选择当前鱼。`,{},undefined,i);step(10,'为当前鱼创建新的计数器，从 0 开始。',{count:0},undefined,i);step(11,'内层初始化 j=0。',{j:0},undefined,i);
    for(let j=0;j<i;j++){step(11,`${j} < ${i} 为真，只看左侧。`,{},undefined,j);step(12,`a[${j}]=${a[j]} < a[${i}]=${a[i]} 为${a[j]<a[i]?'真':'假'}。`,{},undefined,j);if(a[j]<a[i])step(13,'找到更小值，count 加 1。',{count:vars.count+1},undefined,j);step(11,'执行 j++。',{j:j+1},undefined,i);}
    step(11,`${i} < ${i} 为假，内层结束。`,{},undefined,i);delete vars.j;out+=vars.count+' ';step(16,'输出这条鱼的计数。',{},out,i);delete vars.count;step(9,'本条鱼处理完毕，i++。',{i:i+1});
   }step(9,'外层条件为假，结束。');delete vars.i;step(18,'输出换行；结果展示省去行末空格。',{},out.trim());}
  }
  step(code.length-2,'return 0：程序正常结束。');return frames;
 }
 root.CPP_WEEK2={lessons,trace};if(typeof module!=='undefined')module.exports=root.CPP_WEEK2;
})(globalThis);

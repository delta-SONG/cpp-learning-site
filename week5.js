/* Fixed ASCII teaching traces. Input is data, never executable source. */
(function(root){
 'use strict';
 const wrap=lines=>['#include <iostream>','#include <string>','using namespace std;','','int main() {',...lines.map(s=>'    '+s),'    return 0;','}'];
 const task=(title,purpose,id)=>({title,purpose,...(id?{id}:{})});
 const character=wrap(['char c;','cin >> c;','bool digit = c >= \'0\' && c <= \'9\';','cout << digit << \'\\n\';']);
 const length=wrap(['string s;','getline(cin, s);','int n = s.size();','cout << n << \'\\n\';','if (n > 0) {','    cout << s[n - 1] << \'\\n\';','}']);
 const digits=wrap(['string s;','getline(cin, s);','int n = s.size(), count = 0;','for (int i = 0; i < n; i++) {','    if (s[i] >= \'0\' && s[i] <= \'9\') {','        count = count + 1;','    }','}','cout << count << \'\\n\';']);
 const nonspace=wrap(['string s;','getline(cin, s);','int n = s.size(), count = 0;','for (int i = 0; i < n; i++) {','    if (s[i] != \' \') {','        count = count + 1;','    }','}','cout << count << \'\\n\';']);
 const uppercase=wrap(['string s;','getline(cin, s);','int n = s.size();','for (int i = 0; i < n; i++) {','    if (s[i] >= \'a\' && s[i] <= \'z\') {','        s[i] = char(s[i] - \'a\' + \'A\');','    }','}','cout << s << \'\\n\';']);
 const palindrome=wrap(['string s;','getline(cin, s);','int n = s.size();','int left = 0, right = n - 1;','bool same = true;','while (left < right) {','    if (s[left] != s[right]) {','        same = false;','    }','    left = left + 1;','    right = right - 1;','}','cout << same << \'\\n\';']);
 const text=value=>[['text','一行文本（0–32 个 ASCII 可打印字符，保留两端空格）',value]];
 const lessons=[
 {id:'week5-char',title:'一个字符，不是一个整数',subtitle:'char · 字符字面量 · 数字字符',goal:'区分字符 \'5\'、整数 5 和字符串 "5"，用条件识别数字字符。',time:'约 60 分钟',model:'w5-char',inputs:[['character','单个 ASCII 可打印字符（不含空格）','5']],charKeys:['c'],code:character,
 concepts:['char 用来保存一个字符。代码中的 \'5\' 是字符字面量，5 是整数，"5" 是字符串字面量，三者的类型与用途不同。单引号包一个字符，双引号包一段文本。','cin >> c 读取一个非空白字符。本课输入框严格限制为一个字符；若在终端输入多个字符，程序只读其中第一个，剩余字符仍留在输入中。','c>=\'0\' && c<=\'9\' 判断它是否为数字字符，输出 bool 的 1 或 0。若要把数字字符变成对应数值，可在确认范围后计算 c-\'0\'；不要把字符直接当成输入整数。'],note:'本周教学实验限定 ASCII 字符，先避开多字节编码。中文或 emoji 在 C++ string 中不能简单按一个下标等同一个可见文字。',quiz:['输入字符 5，这个程序输出 0 还是 1？','1','字符 \'5\' 位于 \'0\'～\'9\' 之间，因此 digit 为真，默认输出 1。'],hints:['先明确读入的是一个字符，再与字符 \'0\'、\'9\' 比较。','声明 char c，用 cin 读入；两个比较用 && 连接，结果保存为 bool 并输出。'],tasks:[task('本地练习：识别并转成数值','输入一个非空白 ASCII 字符，先判断是否为数字字符；若是，再输出 c-\'0\' 的数值。测试 0、9、A、/、:；参考代码只做判断，数值转换请自己补充。')],reflection:'为什么写 c>=0 && c<=9 与本课想做的字符判断不同？'},
 {id:'week5-line',title:'把空格也读进来',subtitle:'string · getline · 长度与最后下标',goal:'保留整行文本，理解长度和最后一个有效下标。',time:'约 60 分钟',model:'w5-line',inputs:text('hello C++'),stringKeys:['s'],code:length,
 concepts:['string 保存一串字符，需要 #include <string>。string s; 创建一个初始为空的字符串。s.size() 给出长度；本课最多 32 个 ASCII 字符，用 int n 保存这个长度是安全的。','cin >> s 按空白分隔，无法一次读入含空格的完整标题；getline(cin,s) 读取当前这一行，保留行内的空格，不把行末换行保存到 s。此程序在 getline 之前没有用 cin 读取其他数据。','长度 n 的有效下标为 0 到 n-1。空字符串 n=0 时没有最后一个有效字符，所以先检查 n>0，才访问 s[n-1]。以后混用 cin>> 与 getline 时，还要处理前次读取留下的换行，本课先使用单独 getline。'],note:'输入框不会自动删除两端空格，␠ 表示一个实际空格。程序先输出长度，非空时再单独输出最后一个字符。',quiz:['一行文本 hello C++ 的长度是多少（包括中间空格）？','9','hello 有 5 个字符，中间 1 个空格，C++ 有 3 个字符，共 9 个；最后有效下标为 8。'],hints:['逐格数一遍，空格也占一个位置。空字符串不能访问最后一个格子。','getline 读入，n=s.size()；先输出 n，只有 n>0 时再输出 s[n-1]。'],tasks:[task('本地练习：长度与末尾字符','输入一行最多 32 个 ASCII 可打印字符，输出长度；非空时再输出最后一个字符。测试空行、单字符、只有空格、含首尾空格的文本。输入空行时在终端直接按 Enter。')],reflection:'为什么 n=0 时不能访问 s[n-1]？getline 读到的行末换行算在长度里吗？'},
 {id:'week5-digits',title:'沿着字符串数数字',subtitle:'逐字符访问 · 条件计数 · 边界',goal:'用熟悉的循环遍历字符，按条件更新计数器。',time:'约 60 分钟',model:'w5-digits',inputs:text('a1 20'),stringKeys:['s'],code:digits,
 concepts:['字符串也可以通过下标逐个访问。for(int i=0;i<n;i++) 恰好检查 n 个有效字符；i==n 时退出，不把结尾标记当作一个要统计的输入字符。','每次检查 s[i] 是否为 \'0\'～\'9\'。这里统计出现次数，不是把字符组成一个整数，也不是把数字值相加。a1 20 中的 1、2、0 共三个数字字符。','重复数字要逐个统计。007 中有三个数字字符；空行循环零次，count 保持 0。空格、字母和标点都不应增加 count。'],note:'把“当前检查到哪个字符”和“已经数到几个”分开：i 是位置，count 是数量。',quiz:['文本 a1 20 中有几个数字字符？','3','逐个统计 \'1\'、\'2\'、\'0\'，数量是 3；不是计算 1+20，也不是把数字值相加。'],hints:['圈出每个数字字符，每圈一个画一条记号。','count=0；循环检查 s[i]>=\'0\' && s[i]<=\'9\'，成立就 count++，循环后输出。'],tasks:[task('本地练习：数字字符计数','输入一行最多 32 个 ASCII 可打印字符，输出数字字符个数。测试空行、007、全字母、0a9、数字只在最后一个位置的文本。')],reflection:'如何用 ab9 发现循环少检查最后一个字符的错误？'},
 {id:'week5-title',title:'空格计不计入',subtitle:'统计规则 · 字符比较 · 整行输入',goal:'根据题意过滤空格，而不是直接把字符串长度当作答案。',time:'约 60 分钟',model:'w5-title',inputs:text('a B2 '),stringKeys:['s'],code:nonspace,
 concepts:['标题统计要求忽略空格和行末换行。getline 已经不保存行末换行；剩下只需逐个检查 s[i]!=\' \'，非空格才计数。','s.size() 包含行内空格，不能直接作为有效字符数。a B2 后面再跟一个空格时，长度是 5，但非空格只有 a、B、2，共 3 个。','原题 P5015 的标题长度为 1～5，只含大小写字母、数字、空格及行末换行。实验放宽到 0～32 个 ASCII 可打印字符，用来检查空行和首尾空格；本地提交仍按原题约束。'],note:'空格用单引号写成 \' \'。不要先把输入框 trim，再声称程序正确处理了前后空格。',quiz:['文本为 a␠B2␠（␠ 表示空格），有效字符数是多少？','3','a、B、2 共 3 个；两个空格不计入。getline 不把行末换行放进字符串。'],hints:['把空格画成 ␠，逐格判断是否计数。','getline 读整行；count=0，循环中若 s[i]!=\' \' 则加一，最后输出 count。'],tasks:[task('标题统计','完成洛谷 P5015。原题整行长度 1～5，输入含字母、数字或空格；忽略空格和行末换行。测试 007、a B2、前后有空格的 5 字符标题。','P5015')],reflection:'如果用 cin>>s 代替 getline，输入 a B2 时会漏掉哪些内容？'},
 {id:'week5-uppercase',title:'逐个修改小写字母',subtitle:'字符串原地修改 · 字符运算 · 保持其余字符',goal:'只把小写变成大写，并保留数字、空格和已有大写字母。',time:'约 60 分钟',model:'w5-uppercase',inputs:text('Abc9 z!'),stringKeys:['s'],code:uppercase,
 concepts:['字符串下标不仅能读取，也能赋值修改。先判断 s[i] 是否为 \'a\'～\'z\'；只有小写字母进入修改分支，数字与其他字符保持原样。','在本机 ASCII 编码下，s[i]-\'a\' 给出小写字母相对 a 的位置，再加 \'A\' 得到对应大写的编码，char(...) 把这个计算结果转成字符。这个算式依赖这里明确使用的 ASCII 字母排列。','原题 P5733 输入不含空格，长度不超过 100。示例用 getline，因此也能展示空格保持不变；网页为方便单步只接收最多 32 个字符，参考代码本身可处理原题的 100 个字符。'],note:'先判断范围，再转换；不要把每个字符都机械减去同一个数。这里不进行中文转换或 Unicode 大小写处理。',quiz:['输入 Abc9 z!，程序最终输出什么？','ABC9 Z!','b、c、z 变成 B、C、Z；A、9、空格和 ! 都保留原样。'],hints:['只圈出小写字母，其他格子不要改。','循环检查小写范围，成立时 s[i]=char(s[i]-\'a\'+\'A\')，最后输出修改后的 s。'],tasks:[task('自动修正','完成洛谷 P5733。把不含空格、长度不超过 100 的字符串中的小写字母转成大写。测试全大写、全小写、数字标点混合、首尾小写；实验额外允许空格。','P5733')],reflection:'为什么必须先检查是否小写？如果输入已经是 Z，应当修改吗？'},
 {id:'week5-palindrome',title:'两端字符是否相同',subtitle:'字符串比较 · 回文 · 空串和单字符',goal:'只读地比较对称位置，正确处理不相等和中间位置。',time:'可分段完成',model:'w5-palindrome',inputs:text('abba'),stringKeys:['s'],code:palindrome,
 concepts:['回文从左往右和从右往左读相同。例如 abba 与 aba 是回文，abca 不是。本课比较原始 ASCII 字符，区分大小写，也把空格计入比较。','left=0、right=n-1。只要 left<right，就比较这两个位置；不相等时把 same 设为 false。之后继续向中间移动，已经为假的结果不能因为后来相等就重新设为 true。','空字符串和单字符在本课约定下都算回文：没有需要比较的不同字符对。n=0 时 right=-1，条件一开始为假，不会读取非法位置；奇数长度的中间字符也不必与自己比较。'],note:'这次比较不会修改 s。蓝色同时标出本轮两端；它与第四周真正交换数组元素的实验不同。',quiz:['输入 abba，程序输出 0 还是 1？','1','两端 a 与 a 相等，接着 b 与 b 相等，因此 same 保持 true，输出 1。'],hints:['把两端一一配对，找到任何一对不同就不可能是回文。','same=true；while(left<right) 中比较，发现不同就 same=false；两端向内移动，循环后输出 same。'],tasks:[task('本地练习：严格回文','输入一行最多 32 个 ASCII 可打印字符，判断是否严格回文，输出 1 或 0。约定空串为真；不忽略空格、不转换大小写。测试空行、a、aba、abba、abca、Aba、a a。')],reflection:'为什么发现一对不同后不能重新把 same 改为 true？'},
 {id:'week5-review',review:true,title:'用空格和空行检验理解',subtitle:'混合预测 · 闭卷复做 · 输入边界',goal:'区分长度、有效字符数、数字个数，并独立实现字符串处理。',time:'可分段完成',model:'w5-digits',inputs:text('007 x9'),stringKeys:['s'],code:digits,
 concepts:['今天先不看参考代码，判断 007 x9 的总长度、非空格数量和数字字符数量分别是什么。三个问题使用同一份输入，但统计规则不同。','闭卷重写一个计数程序和一个修改或比较程序。先写输入规则与下标范围，再测试空行、单字符、两端空格和最后一位满足条件的情况。','继续按真实完成方式记录。若仍会混淆 getline 与 cin>>，先巩固输入；若使用了提示，在 2～3 天后再从空白文件复做。课程已经开放并不代表你已经掌握。'],note:'本周实验只接收一行 ASCII 可打印字符；前后空格会原样保留。网页显示 ␠ 只是为了看清格子，不是把它替换进 C++ 输入。',quiz:['文本 007 x9 中有几个数字字符？','4','0、0、7、9 共四个；空格和 x 不计入。前导零仍然是实际字符。'],extraQuiz:[['getline 读到空行后，字符串长度是多少？','0','行末换行不保存进 s，空行产生空字符串，不能访问 s[-1]。'],['Az9 只把小写转大写，结果是什么？','AZ9','A 已经是大写，z 变成 Z，9 保持不变。']],hints:['先把空格画出来，分别列出三个统计问题的判断条件。','长度取 s.size()；非空格判断 !=\' \'；数字判断 \'0\'～\'9\'；修改只发生在小写范围内。'],tasks:[task('闭卷复做：标题统计','独立写 P5015 并测试有首尾空格的标题。检查是否使用整行读取。','P5015'),task('闭卷复做：修改或比较','从自动大写或严格回文中任选一题，从空白文件写出并测试。工作日每次只完成一个小目标；卡住可继续下一次，记录具体问题。'),task('总结一次边界测试','写明空行、单字符、首尾空格、末尾数字这四类输入各能检查什么问题；没有真实错误时不虚构失败经历。')],reflection:'我能用一句话区分字符串长度、非空格数和数字字符数吗？下次最需要先复做哪一题？'}
 ];
 lessons.forEach((l,i)=>{l.week=5;l.day=i+1;l.textual=true;});
 function trace(model,input,code){
  const frames=[],vars={};let out='';
  const step=(line,message,changes={},output,activeIndices=[])=>{Object.assign(vars,changes);if(output!==undefined)out=String(output);frames.push({line,message,vars:{...vars},output:out,activeString:'s',activeIndices});};
  step(4,'程序进入 main。');
  if(model==='w5-char'){step(5,'声明一个字符变量，尚未读入。',{c:'未赋值'});step(6,'读取一个非空白字符。',{c:input.character});step(7,`检查 ${JSON.stringify(input.character)} 是否在字符 0～9 之间。`,{digit:input.character>='0'&&input.character<='9'});step(8,'bool 默认输出真为 1，假为 0。',{},Number(vars.digit));}
  else{
   step(5,'string 默认构造为空字符串。',{s:''});step(6,'getline 读取整行，保留前后空格，不保存换行。',{s:input.text});
   const n=input.text.length;
   if(model==='w5-line'){
    step(7,'在已限制的长度范围内，用 int 保存 s.size()。',{n});step(8,'先输出长度并换行。',{},n+'\n');step(9,`${n} > 0 为${n>0?'真':'假'}。`);if(n>0)step(10,`最后有效下标为 ${n-1}。`,{},out+vars.s[n-1]+'\n',[n-1]);
   }else if(model==='w5-palindrome'){
    step(7,'记录长度。',{n});step(8,'空串时 right=-1，所以不会访问任何字符。',{left:0,right:n-1});step(9,'尚未发现不同，same 初始为 true。',{same:true});
    while(true){const {left,right}=vars;step(10,`${left} < ${right} 为${left<right?'真':'假'}。`);if(left>=right)break;step(11,`比较 s[${left}]=${JSON.stringify(vars.s[left])} 与 s[${right}]=${JSON.stringify(vars.s[right])}。`,{},undefined,[left,right]);if(vars.s[left]!==vars.s[right])step(12,'发现不同，same 设为 false，后续不会再变回 true。',{same:false},undefined,[left,right]);step(14,'左端向右移动。',{left:left+1});step(15,'右端向左移动。',{right:right-1});}
    step(17,'输出严格回文的判断结果。',{},Number(vars.same));
   }else{
    const upper=model==='w5-uppercase';step(7,upper?'保存字符串长度。':'长度与计数器分别初始化。',{n,...(upper?{}:{count:0})});step(8,'循环下标从 0 开始。',{i:0});
    for(let i=0;i<n;i++){step(8,`${i} < ${n} 为真。`,{},undefined,[i]);const ch=vars.s[i],yes=upper?(ch>='a'&&ch<='z'):model==='w5-title'?ch!==' ':(ch>='0'&&ch<='9');step(9,`当前字符 ${JSON.stringify(ch)} ${yes?'满足':'不满足'}本课条件。`,{},undefined,[i]);if(yes){if(upper){const replacement=String.fromCharCode(ch.charCodeAt(0)-97+65);step(10,`本机 ASCII 下，把 ${ch} 转为 ${replacement}。`,{s:vars.s.slice(0,i)+replacement+vars.s.slice(i+1)},undefined,[i]);}else step(10,'找到一个符合条件的字符，计数加 1。',{count:vars.count+1},undefined,[i]);}step(8,'执行 i++。',{i:i+1});}step(8,'i==n，循环条件为假。');delete vars.i;step(13,upper?'输出修改后的字符串。':'输出符合条件的字符数量。',{},upper?vars.s:vars.count);
   }
  }
  // Remove just the final line ending. Spaces are actual program output.
  step(code.length-2,'return 0：程序正常结束。',{},out.endsWith('\n')?out.slice(0,-1):out);return frames;
 }
 function stdin(model,input){return model==='w5-char'?input.character:input.text;}
 root.CPP_WEEK5={lessons,trace,stdin};if(typeof module!=='undefined')module.exports=root.CPP_WEEK5;
})(globalThis);

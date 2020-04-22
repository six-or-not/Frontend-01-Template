// 匹配十进制数
let num = /(?<!\d|\.|-)-?([1-9][0-9]*|0(?!\d))(\.\d+)?(?!\d|-)/g  
//先整数，然后点，然后小数部分
console.log(num.exec("abc-12-3.5sd"));
//匹配结果包括十进制数，整数部分，小数部分
//0或者.开头都算非法输入，不匹配
//从字符串中读取常人逻辑中的复合要求的数字，即两个非数字中间必须是符合要求的数字



// 匹配字符串
function allStr(input = '') {
  let str = /\"[^\"]*\"|\'[^\']*\'/g
  let res
  while (res = str.exec(input)) {
    console.log(res[0]);
  }
}
let text = "abc\'456\"def\'012\'\'\"qwe\'123\'asd\"741"
allStr(text)



//UTF-8 Encoding函数
function utf8Encoding(str){
  return str.split('').map(e=>"\\u" + e.charCodeAt().toString(16)).join('')
}

console.log(utf8Encoding("测试"));
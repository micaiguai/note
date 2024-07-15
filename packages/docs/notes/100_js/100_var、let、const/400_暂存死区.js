/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

//#region snippet1
let foo = 1
{
  // 这里会触发暂存死区
  console.log(foo)
  // error: ReferenceError: Cannot access 'foo' before initialization
  let foo = 2
  console.log(foo)
}
//#endregion snippet1

//#region snippet2
// 用var声明一个foo
var foo = 1
{
  console.log(foo)
  // output: 1
  var foo = 2
  console.log(foo)
  // output: 2
}
//#endregion snippet2

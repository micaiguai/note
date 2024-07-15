/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable block-scoped-var */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-lone-blocks */
/* eslint-disable vars-on-top */

{
  // #region snippet1
  let foo = 1
  {
    // 这里会触发暂存死区
    console.log(foo)
    // error: ReferenceError: Cannot access 'foo' before initialization
    let foo = 2
    console.log(foo)
  }
  // #endregion snippet1
}

{
  // #region snippet2
  // 用var声明一个foo
  var foo = 1
  {
    console.log(foo)
    // output: 1
    var foo = 2
    console.log(foo)
    // output: 2
  }
  // #endregion snippet2
}

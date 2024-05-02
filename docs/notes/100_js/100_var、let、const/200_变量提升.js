/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

//#region snippet1
console.log(foo)
// output: undefined
var foo = 1
//#endregion snippet1

//#region snippet2
console.log(foo)
// error: ReferenceError: Cannot access 'foo' before initialization
let foo = 1
//#endregion snippet2

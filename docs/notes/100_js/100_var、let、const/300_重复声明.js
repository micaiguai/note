/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

//#region snippet1
var foo = 1
var foo = 2
console.log(foo)
// output: 2
//#endregion snippet1

//#region snippet2
let foo = 1
let foo = 2
// error: SyntaxError: Identifier 'foo' has already been declared
console.log(foo)
//#endregion snippet2

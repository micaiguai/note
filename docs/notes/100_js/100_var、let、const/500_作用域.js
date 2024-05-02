/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

//#region snippet1
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
    // output: 3
    // output: 3
    // output: 3
  })
}
//#endregion snippet1

//#region snippet2
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
    // output: 0
    // output: 1
    // output: 2
  })
}
//#endregion snippet2

/* eslint-disable no-const-assign, no-console */
{
// #region snippet1
  const foo = 1
  // error: TypeError: Assignment to constant variable.
  foo = 2
  console.log(foo)
// #endregion snippet1
}

{
// #region snippet2
  const foo = {
    bar: 1,
  }
  foo.bar = 2
  console.log(foo.bar)
  // output: 2
// #endregion snippet2
}

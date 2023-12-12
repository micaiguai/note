
const person = {
  age: 10,
  hobbies: ['eat']
}
const pet = {
  name: 'snow'
}
const info = {
  ...person,
  ...pet
}
person.hobbies.push('movie')
// output: { age: 10, hobbies: [ 'eat', 'movie' ], name: 'snow' }
console.log(info)
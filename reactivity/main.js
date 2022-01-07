import observe from './js/observe'
import Watcher from './js/Watcher'

const person = {
  name: 'tom',
  age: 18,
  score: {
    math: 100
  }
}

observe(person)

const node = document.querySelector('.origin-data')
function renderData() {
  node.innerText = JSON.stringify(person)
}

function renderComputed() {
  const node = document.querySelector('.computed-data')
  const computedData = person.name + ': ' + person.score.math
  node.innerText = computedData
}

new Watcher(renderData)
new Watcher(renderComputed)

const button = document.querySelector('button')
button.addEventListener('click', () => {
  person.name = 'jerry'
  person.score.math = 90
})

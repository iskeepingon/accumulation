import el from './element.js'

let ul = el('ul', { id: 'list' }, [
    el('li', { class: 'item' }, ['Item 1']),
    el('li', { class: 'item' }, ['Item 2']),
    el('li', { class: 'item' }, ['Item 3'])
])
// let ulRoot = ul.render()
console.log(ul)
import './style.css'

const btn = document.createElement('button')
btn.innerHTML = 'ADD'
document.body.appendChild(btn)

btn.onclick = function() {
  const div = document.createElement('div')
  div.innerHTML = 'Item'
  document.body.appendChild(div)
}
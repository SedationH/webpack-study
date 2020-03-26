export default function () {
  const div = document.createElement('div')
  div.setAttribute('id', 'add')
  div.innerHTML = 1

  div.onclick = function () {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1
  }
  document.body.appendChild(div)
}
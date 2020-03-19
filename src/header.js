export default function header() {
  const dom = document.getElementById('root')
  const ele = document.createElement('div')
  ele.innerText = 'header'
  dom.append(ele)
}
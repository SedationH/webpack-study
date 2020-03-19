export default function Content() {
  const dom = document.getElementById('root')
  const ele = document.createElement('div')
  ele.innerText = 'content'
  dom.append(ele)
}
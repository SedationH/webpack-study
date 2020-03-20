import pic from './pic-1.png'
import './index.css'

const img = new Image()
img.src = pic
img.className = 'avatar'

const root = document.getElementById('root')
root.append(img)

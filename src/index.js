import Add from './add'
import Num from './num'

Add()
Num()

if (module.hot) {
  module.hot.accept('./num', function () {
    document.body.removeChild(document.getElementById('num'))
    Num()
  })
}

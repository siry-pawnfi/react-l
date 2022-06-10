const btn = document.querySelector('#btn')
const show = document.querySelector('#show')

let count = 0
window.addEventListener('click', onClick)


function onClick() {
  show.innerHTML = ++count
  for(let i=0;i<1; i++) {
    log()
  }
  console.log('asd')
  console.log('asd')
  console.log('asd')
  console.log('asd')

}

function log() {
  console.log('点击事件')
  for(let i=0;i<10; i++) {
    console.log('>>>')
  }
}
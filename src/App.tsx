import { useState, forwardRef , useRef} from 'react'
import logo from './logo.svg'
import './App.css'
import List from './components/list'

function App() {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  const refChange = (ele: HTMLElement) => {
    console.log(ele)
  }

  return (
    <div className="App w-600px ">
      {/* <Test ref={refChange}/> */}
      <List />
    </div>
  )
}


const Test = forwardRef((props, ref: any) => {
  return (
    <div ref={ref}>222</div>
  )
})

export default App

import { useState, forwardRef , useRef, useEffect} from 'react'
import logo from './logo.svg'
import './App.css'
import List from './components/list'
import Routes , { Link, navigate} from './components/routes'

function App() {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  const refChange = (ele: HTMLElement) => {
    console.log(ele)
  }

  return (
    <div className="App w-600px ">
      {/* <Test ref={refChange}/> */}
      {/* <List />
      <Routes 
        routes={[
          {
            path: '/about',
            element: <div>about</div>
          },
          {
            path: '/home',
            element: <div>home</div>
          }
        ]}
      />
      <Link href='/home'>home</Link>
        <Link href='/about'>about</Link> */}


        <Counter />
    </div>
  )
}


function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('siry')
  useEffect(() => {
    console.log('first')
  })
  return(
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}

const Test = forwardRef((props, ref: any) => {
  return (
    <div ref={ref}>222</div>
  )
})

export default App

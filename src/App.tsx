import React, { useState, forwardRef , useRef, useEffect} from 'react'
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


        <Counter  render={(name: any) => (
          <div>{name || '这人很懒没没有输入名字....'}</div>
        )}/>

        <Father>
            <Child/>
        </Father>

    </div>
  )
}


function Counter(props: any) {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('siry')
  useEffect(() => {
    console.log('first')
  })
  return(
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>增加</button>
      {
        props.render('siry')
      }

      <Test />
    </div>
  )
}

const Test = React.memo(() => {
  useEffect(() => {
    console.log('Test渲染')
  })
  return (
    <div  className="sssssssssssss">222</div>
  )
})

function Child() {
  console.log('Child');
  return <div>Child</div>;
}
    
    
function Father(props:any) {
  const [num, setNum] = React.useState(0);
  return (
    <div onClick={() => {setNum(num + 1)}}>
      {num}
      {props.children}
    </div>
  );
}
    

export default App

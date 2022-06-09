import React,{ ReactNode, useRef, useState } from 'react'

const rowRenderer = ({index, style}: {index: number, style: React.CSSProperties}) => {
  const item = index
  return (
    <div
      key={item}
      style={style}
      onClick={ () => {
        console.log('Item-', index)
      }}
    >
      item-{item}
    </div>
  )
}


interface Props {
  height?: number
  total?: number
  rowHeight?: number
  bufferSize?: number //缓冲大小
}
//定高
export default function List(props: Props) {

  const {
    height = 800,
    total = 10000,
    rowHeight = 80,
    bufferSize = 5
  } = props

  const limit = Math.ceil(height / rowHeight)

  const scrollRef = useRef<HTMLDivElement>(null)
  let originStartIdx = useRef(0)
  let startIndex = useRef(Math.max(originStartIdx.current - bufferSize, 0))  //把缓冲的item也计算在内.
  let endIndex = useRef(Math.min(originStartIdx.current + limit + bufferSize, total - 1))
  const [scrollTop, setScrollTop] = useState(0)

  // let originStartIdx.current = 0
  // let startIndex.current = Math.max(originStartIdx.current - bufferSize, 0)
  // let endIndex.current = Math.min(originStartIdx.current + limit + bufferSize, total - 1)

  const renderContent: () => ReactNode = () => {
    const content = []
    // console.log(startIndex.current, endIndex.current)
    for(let i=startIndex.current; i <= endIndex.current; ++i) {
      content.push(
        rowRenderer({
          index: i,
          style: {
            height: rowHeight - 1 + 'px',
            lineHeight: rowHeight + 'px',
            left: 0,
            right: 0,
            position: 'absolute',
            top: i*rowHeight,
            borderBottom: '1px solid #000',
            width: '100%'
          }
        })
      )
    }
    return content
  }

  const onScroll = (e: any) => {
    if(e.target === scrollRef.current) {
      const domScrollTop  = e.target.scrollTop
      //根据dom的实际宽度计算出来的索引值
      const curIndex = Math.floor(domScrollTop / rowHeight)
      // console.log(domScrollTop, rowHeight, curIndex)
      //与设置的索引值进行比较
      if(originStartIdx.current !== curIndex) {
        originStartIdx.current = curIndex// 以实际的为准
        startIndex.current = Math.max(curIndex - bufferSize, 0)
        endIndex.current = Math.min(curIndex + limit + bufferSize, total - 1)
        //更新state,触发render,(其实内部的state没有用到)
        setScrollTop(domScrollTop)
      }
    }
  }

  return (
    <div 
      ref={scrollRef}
      style={{
        overflowX: 'hidden',
        overflowY: 'auto',
        height: height,
        backgroundColor: '#e8e8e8'
      }}
      onScroll={onScroll}
    >
      <div
        style={{
          height: total * rowHeight,
          position: 'relative'
        }}
      >
        {renderContent()}
      </div>
    </div>
  )
}


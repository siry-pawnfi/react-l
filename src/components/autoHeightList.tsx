import React,{ ReactNode, useRef, useState, useEffect } from 'react'
import { useUpdateEffect } from '../hooks'
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

interface CachedPosition {
  index: number;
  top: number;
  bottom: number;
  height: number;
  dValue: number;
}

interface Props {
  height?: number
  total?: number
  estimatedRowHeight?: number
  bufferSize?: number //缓冲大小
}
//定高
export default function List(props: Props) {

  const {
    height = 800,
    total = 10000,
    estimatedRowHeight = 80, //预估的item的高度, 后面需要进行, 实际的计算.然后更新高度值
    bufferSize = 5
  } = props

  const limit = Math.ceil(height / estimatedRowHeight)

  const scrollRef = useRef<HTMLDivElement>(null)
  const phantomContentRef = useRef<HTMLDivElement>(null)
  const actualContentRef = useRef<HTMLDivElement>(null)

    // 
  let cachedPositions: CachedPosition[] = [];
  let phantomHeight = estimatedRowHeight * total;

  let originStartIdx = useRef(0)
  let startIndex = useRef(Math.max(originStartIdx.current - bufferSize, 0))  //把缓冲的item也计算在内.
  let endIndex = useRef(Math.min(originStartIdx.current + limit + bufferSize, total - 1))
  const [scrollTop, setScrollTop] = useState(0)

  // let originStartIdx.current = 0
  // let startIndex.current = Math.max(originStartIdx.current - bufferSize, 0)
  // let endIndex.current = Math.min(originStartIdx.current + limit + bufferSize, total - 1)

  useEffect(() => {
    //初始化缓存位置数组, 
    initCachedPositions()
  },[])

  //只在更新阶段执行的effect
  useUpdateEffect(() => {
    updateCachedPositions()
  })

  const initCachedPositions = () => {
    //初始化positions
  }

  const updateCachedPositions = () => {
    //更新positions
  }

  const renderContent: () => ReactNode = () => {
    const content = []
    // console.log(startIndex.current, endIndex.current)
    for(let i=startIndex.current; i <= endIndex.current; ++i) {
      content.push(
        rowRenderer({
          index: i,
          style: {
            height: estimatedRowHeight - 1 + 'px',
            lineHeight: estimatedRowHeight + 'px',
            left: 0,
            right: 0,
            position: 'absolute',
            top: i*estimatedRowHeight,
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
      const curIndex = Math.floor(domScrollTop / estimatedRowHeight)
      // console.log(domScrollTop, estimatedRowHeight, curIndex)
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

  const getTransform = () => {
    //TODO 获取transform
    return  `translate3d(0,${
      startIndex.current >= 1
        ? cachedPositions[startIndex.current - 1].bottom
        : 0
    }px,0)`;
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
        ref={phantomContentRef}
        style={{
          height: phantomHeight,
          position: 'relative'
        }}
      >
      </div>

      <div
        ref={actualContentRef}
        style={{
          width: '100%',
          // height: total * estimatedRowHeight,
          top: 0,
          position: 'absolute',
          transform: getTransform()
        }}
      >
        {renderContent()}
      </div>
    </div>
  )
}


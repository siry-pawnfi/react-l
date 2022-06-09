import React, { useEffect, useState } from 'react'
interface Route {
  path: string,
  element: React.ReactNode
}
interface Props {
  routes: Route[]
}
export default function Routes(props: Props) {

  const { 
    routes = []
  } = props
  //存储当前的pathname
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  console.log(window.location.pathname)
  useEffect(() => {
    const onLocationChange = (state: any) => {
      setCurrentPath(window.location.pathname)
      console.log(state, '状态')
    }
    //就监听popstate事件, 调用浏览器的前进后退时触发
    window.addEventListener('popstate', onLocationChange)

    return () => window.removeEventListener('popstate', onLocationChange)
  },[])

  let route =  routes.find(({path, element}: any) => path === currentPath) as any
  if(route) {
    return route?.element
  } else {
    return null
  }
  // return routes.find(({ path, component }) => path === currentPath)?.component
}

/**
 * 
 * 单页跳转的 API history.pushState 并不会触发 popstate，为了让实现更优雅，我们可以在 pushState 后手动触发 popstate 事件
 */
export function navigate(href: string) {
  //用 pushState 直接刷新 url，而不触发真正的浏览器跳转
  window.history.pushState({name: '跳转'}, "", href)

  //手动触发一次popstate, 让Route组件监听并触发onLocationChange
  const navEvent = new PopStateEvent('popstate')
  window.dispatchEvent(navEvent)
}

interface LinkProps {
  className?: string,
  href:  string
  children: React.ReactNode
}
export function Link(props: LinkProps) {
  const {
    className,
    href,
    children
  } = props
  const onClick = (event: any) => {
    //按住ctrl时点击a标签的处理,直接返回原生行为
    if(event.metaKey || event.ctrlKey) {
      return
    }

    //阻止默认行为
    event.preventDefault()

    //做一次单页跳转
    navigate(href)
  }

  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  )
}
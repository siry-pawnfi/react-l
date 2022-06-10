import React, { useLayoutEffect,useEffect ,useState } from 'react';

export function useViewport(){
    const [rect,setRect] = useState(
        {
            windowWidth:document.documentElement.clientWidth,
            windowHeight:document.documentElement.clientHeight
        })
        useEffect(()=>{
        const resizeObserver = new ResizeObserver(nodes => {
            setRect({
                windowWidth:nodes[0].contentRect.width,
                windowHeight:nodes[0].contentRect.height,
            })
        })
        resizeObserver.observe(document.documentElement)
       
        return ()=>resizeObserver.unobserve(document.documentElement)
    },[])

    return {...rect}
}



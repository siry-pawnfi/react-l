import React, { useEffect, useRef } from 'react'

export default function useMount(fn: () => void) {

  useEffect(() => {
      fn?.()
  },[])
}

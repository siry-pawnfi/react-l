import React, { useRef, useEffect} from 'react'
import type { DependencyList } from 'react'

export default function useUpdateEffect(effect: () => void, deps?: DependencyList) {
  const ref = useRef(true)

  useEffect(() => {
    if(ref.current) {
      ref.current = false
    } else {
      effect?.()
    }
  },deps)
}

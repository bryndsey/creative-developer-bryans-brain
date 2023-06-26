'use client'
import { useSpringValue } from '@react-spring/three'
import { atom, useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'

const autoRotateSpeed = 0.2

export const useAutoRotateAtom = atom(true)

export function useAutoRotateValue() {
  const timer = useRef(null)

  const currentAutoRotateSpeed = useSpringValue(autoRotateSpeed)

  const useAutoRotate = useAtomValue(useAutoRotateAtom)

  const startAutoRotate = () => {
    currentAutoRotateSpeed.start(autoRotateSpeed, { config: { duration: 3000 } })
  }

  const scheduleAutoRotateStart = () => {
    timer.current = setTimeout(() => {
      startAutoRotate()
    }, 1500)
  }

  const stopAutoRotate = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current)
      timer.current = null
    }
    currentAutoRotateSpeed.set(0)
  }

  useEffect(() => {
    if (useAutoRotate) {
      startAutoRotate()
    } else {
      stopAutoRotate()
    }
  }, [useAutoRotate])

  return { currentAutoRotateSpeed, stopAutoRotate, scheduleAutoRotateStart }
}

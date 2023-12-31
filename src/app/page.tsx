'use client'

import { Three } from '@/helpers/components/Three'
import { useSpringValue } from '@react-spring/three'
import { animated as animatedDom } from '@react-spring/web'
import { useProgress } from '@react-three/drei'
import { useAtom } from 'jotai'
import { Suspense, useState } from 'react'
import { ThreeContent } from './ThreeContent'
import { primaryTextColor } from './colors'
import { useAutoRotateAtom } from './useAutoRotateValue'

export default function Page() {
  const [showLoading, setShowLoading] = useState(true)
  const opacity = useSpringValue(0, {
    onChange(result) {
      if (!showLoading && result.value !== 0) {
        setShowLoading(true)
      }
    },
    onRest(result) {
      if (showLoading && result.value === 0) {
        setShowLoading(false)
      }
    },
  })

  useProgress((state) => {
    const finishedLoading = !state.active && state.progress === 100
    const actualTarget = finishedLoading ? 0 : 1
    if (opacity.goal !== actualTarget) {
      opacity.start(actualTarget)
    }
  })

  const [autoRotateOn, setAutoRotateOn] = useAtom(useAutoRotateAtom)

  return (
    <div className='h-screen bg-white'>
      <Three>
        <Suspense fallback={null}>
          <ThreeContent />
        </Suspense>
      </Three>
      {!showLoading && (
        <div className='fixed bottom-2 right-2 z-10'>
          <label
            style={{ color: primaryTextColor }}
            onPointerDownCapture={(e) => e.stopPropagation()}
            className='p-4 text-xs opacity-30 transition-opacity hover:opacity-100'
          >
            Auto-rotate{' '}
            <input
              type='checkbox'
              checked={autoRotateOn}
              className='accent-stone-700'
              onChange={(e) => setAutoRotateOn(e.target.checked)}
            />
          </label>
        </div>
      )}
      {showLoading && (
        <animatedDom.div style={{ opacity }} className='fixed inset-0 z-20 grid place-items-center bg-white'>
          Loading
        </animatedDom.div>
      )}
    </div>
  )
}

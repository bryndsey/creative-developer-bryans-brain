'use client'

import dynamic from 'next/dynamic'
import React, { useRef } from 'react'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef()

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
        touchAction: 'auto',
      }}
    >
      {children}
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          // zIndex: -1,
        }}
        eventSource={ref}
        eventPrefix='client'
        camera={{ fov: 40 }}
      />
    </div>
  )
}

export { Layout }

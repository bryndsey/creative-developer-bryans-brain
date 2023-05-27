'use client'

import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { MotionConfig } from 'framer-motion'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef()

  return (
    <MotionConfig transition={{ duration: 0.5, ease: 'circOut' }}>
      <div
        ref={ref}
        style={{
          position: 'relative',
          width: ' 100%',
          height: '100%',
          overflow: 'auto',
          touchAction: 'auto',
        }}
        className='bg-green-400'
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
          }}
          eventSource={ref}
          eventPrefix='client'
        />
      </div>
    </MotionConfig>
  )
}

export { Layout }

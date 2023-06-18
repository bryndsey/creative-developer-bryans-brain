'use client'

import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { MotionConfig } from 'framer-motion'
import { ReactLenis } from '@studio-freight/react-lenis'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef()

  return (
    <MotionConfig transition={{ duration: 0.5, ease: 'circOut' }}>
      <ReactLenis root>
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
            // orthographic
            camera={{ fov: 20 }}
          />
        </div>
      </ReactLenis>
    </MotionConfig>
  )
}

export { Layout }

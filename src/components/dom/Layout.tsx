'use client'

import dynamic from 'next/dynamic'
import React, { useRef } from 'react'
import 'react-creative-cursor/dist/styles.css'
import { Cursor } from 'react-creative-cursor'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef()

  return (
    <>
      <Cursor animationDuration={0.5} exclusionBackgroundColor='yellow' isGelly />
      <div data-cursor-exclusion className='cursor-none bg-white'>
        <div
          ref={ref}
          style={{
            position: 'relative',
            width: ' 100%',
            height: '100%',
            touchAction: 'auto',
            backgroundColor: '#fff',
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
      </div>
    </>
  )
}

export { Layout }

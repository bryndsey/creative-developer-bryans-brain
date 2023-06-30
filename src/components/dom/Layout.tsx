'use client'

import dynamic from 'next/dynamic'
import React, { useRef, useState } from 'react'
import 'react-creative-cursor/dist/styles.css'
import { Cursor } from 'react-creative-cursor'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef()

  const [hasMouseMoved, setMouseMoved] = useState(false)

  return (
    <>
      {/* Set cursor size to a non-zero but small number to effectively hide it. 
      There's an issue with setting it to zero where it messes up the alignment, which is why it isn't zero */}
      <Cursor
        animationDuration={0.5}
        exclusionBackgroundColor='yellow'
        isGelly
        cursorSize={hasMouseMoved ? 125 : 0.1}
      />
      <div
        data-cursor-exclusion
        className='cursor-none bg-white'
        onPointerEnter={(e) => {
          if (!hasMouseMoved && e.pointerType === 'mouse') {
            setMouseMoved(true)
          }
        }}
      >
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

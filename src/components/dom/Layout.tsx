'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
// import { motion } from 'framer-motion'
const AnimatePresence = dynamic(() => import('framer-motion').then((mod) => mod.AnimatePresence), { ssr: false })
const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()
  const route = usePathname()
  console.log(route)

  return (
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
      <AnimatePresence
        initial={false}
        mode='wait'
        onExitComplete={() => {
          console.log('Exit complete')
        }}
      >
        {/* <MotionDiv key={route} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> */}
        {children}
        {/* </MotionDiv> */}
      </AnimatePresence>
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
  )
}

export { Layout }

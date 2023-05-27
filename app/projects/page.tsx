'use client'

import { AvatarModel } from '@/components/AvatarModel'
import { motion, useAnimate } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const [scope, animate] = useAnimate()
  const router = useRouter()

  return (
    <motion.div
      ref={scope}
      key='project'
      className='grid min-h-screen grid-cols-2'
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
    >
      <motion.section className='bg-white p-8'>
        <a
          href='/'
          onClick={async (e) => {
            e.preventDefault()
            router.prefetch('/')
            await animate(scope.current, { x: '-100%' }, { duration: 0.5, ease: 'circIn' })
            router.push('/')
          }}
        >
          Back
        </a>
        <h2 className='text-6xl font-bold'>Project title</h2>
        <br />
        <p>This is the project description. It will be kinda long and take up more space.</p>
        <button className='rounded bg-yellow-300 p-2'>Try it out!</button>
        <p>Tech stack info here</p>
      </motion.section>
      <View id='project-hero-display'>
        <Common />
        <AvatarModel />
      </View>
    </motion.div>
  )
}

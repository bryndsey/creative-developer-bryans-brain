'use client'

import { AvatarModel } from '@/components/AvatarModel'
import { useAnimate } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

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
    <div ref={scope} className='relative'>
      <View className='flex h-screen flex-col items-center justify-center'>
        <Suspense fallback={null}>
          <AvatarModel position={[-0.25, -0.75, 0]} scale={2} />
          <Common />
        </Suspense>
      </View>
      <div className='bg-white'>
        <section id='about' className='p-8'>
          <h2 className='text-6xl font-extrabold'>About Me</h2>
          {"Here is where my 'About Me' content will go."}
          <br />
          {"Here is where my 'About Me' content will go."}
          <br />
          {"Here is where my 'About Me' content will go."}
          <br />
          {"Here is where my 'About Me' content will go."}
          <br />
          {"Here is where my 'About Me' content will go."}
          <br />
        </section>
        <section id='project-list' className='flex min-h-screen flex-col p-8'>
          <h2 className='text-6xl font-extrabold'>Projects</h2>
          <ul className='flex grow flex-col justify-evenly gap-4  '>
            <li>
              <a
                href='./projects'
                className='text-4xl font-extrabold'
                onClick={async (e) => {
                  e.preventDefault()
                  await animate(scope.current, { x: '100vw' })
                  router.push('./projects')
                }}
              >
                SongSpark
              </a>
              <p>Tagline here</p>
            </li>
            <li>
              <h3 className='text-4xl font-extrabold'>Pedals</h3>
              <p>Tagline here</p>
            </li>
            <li>
              <h3 className='text-4xl font-extrabold'>Tic-Tac-Toe+</h3>
              <p>Tagline here</p>
            </li>
            <li>
              <h3 className='text-4xl font-extrabold'>Android Projects</h3>
              <p>Tagline here</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

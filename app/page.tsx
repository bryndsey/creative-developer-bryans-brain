'use client'

import { AvatarModel } from '@/components/AvatarModel'
import { projects } from '@/projects'
import { ContactShadows } from '@react-three/drei'
import { motion, useAnimate } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
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
    <motion.div ref={scope} className='relative' initial={{ x: '100%' }} animate={{ x: 0 }}>
      <View className='flex h-screen flex-col items-center justify-center'>
        <Suspense fallback={null}>
          <AvatarModel position={[-0.25, -0.75, 0]} scale={2} />
          <ContactShadows position-y={-0.75} opacity={0.33} scale={8} blur={1} />
          <Common />
        </Suspense>
      </View>
      <div className='bg-white'>
        <section id='about' className='p-12'>
          <div className='grid w-full grid-cols-2 gap-4'>
            <div>
              <h2 className='text-6xl font-extrabold'>About Me</h2>
              <p>I love making things.</p>
              <br />
              <p>
                As a kid, I would invent my own dinosaurs, reverse-engineering them by drawing them skeleton-first. I
                once spent 3 hours folding an origami moose. I buy Legos for my kids, but secretly (ok, maybe not so
                secretly…) relish putting them together myself.
              </p>
              <br />
              <br />
              <p>I also love solving problems.</p>
              <br />
              <p>
                I was the kid in calculus class who was a little too eager to raise their hand. I do logic puzzles like
                sudoku and nurikabe for fun. I’ve mastered the art of finding the optimal arrangement of dishes in the
                dishwasher.
              </p>
              <br />
              <br />
              <p>
                But most of all, I love the intersection of the two. And software development sits right in the middle
                of that beautiful Venn diagram for me. Whether its learning a new tech stack to build the next iteration
                of my music-generating app or creating a VR castle defense game, technical problem-solving + creativity
                = *chef kiss*
              </p>
              <br />
            </div>
            <View>
              <Common></Common>
              <AvatarModel position={[0, -0.75, 0]} scale={2} />
            </View>
          </div>
        </section>
        <section id='projects' className='flex min-h-screen flex-col p-12'>
          <h2 className='text-6xl font-extrabold'>Projects</h2>
          <ul className='flex grow flex-col justify-evenly gap-4  '>
            {projects.map((project) => {
              return (
                <li key={project.id}>
                  <a
                    href={`./projects/${project.id}`}
                    className='text-4xl font-extrabold'
                    onClick={async (e) => {
                      e.preventDefault()
                      router.prefetch(`./projects/${project.id}`)
                      await animate(scope.current, { x: '100%' }, { duration: 0.5, ease: 'circIn' })
                      router.push(`./projects/${project.id}`)
                    }}
                  >
                    {project.name}
                  </a>
                  <p>{project.shortDescription}</p>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </motion.div>
  )
}

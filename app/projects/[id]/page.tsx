'use client'

import { AvatarModel } from '@/components/AvatarModel'
import { Project, projectMap, projects } from '@/projects'
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

export function generatetaticParams() {
  return projects
}

export default function Page({ params }: { params: { id: string } }) {
  const projectId = params.id
  const project: Project = projectMap[projectId]

  const [scope, animate] = useAnimate()
  const router = useRouter()

  return (
    <motion.div ref={scope} className='grid min-h-screen grid-cols-2' initial={{ x: '-100%' }} animate={{ x: 0 }}>
      <motion.section className='bg-white p-8'>
        <a
          href='/'
          onClick={async (e) => {
            e.preventDefault()
            router.prefetch('/')
            await animate(scope.current, { x: '-100%' }, { duration: 0.5, ease: 'circIn' })
            router.push('/#projects')
          }}
        >
          Back
        </a>
        <br />
        <h2 className='text-6xl font-bold'>{project.name}</h2>
        <br />
        <p>{project.description}</p>
        <br />
        <div className='flex flex-row gap-1'>
          {project.tags &&
            project.tags.map((tag) => (
              <div key={tag.name} className='rounded bg-green-200 px-1'>
                {tag.name}
              </div>
            ))}
        </div>
        <br />
        {project.url && (
          <a className='rounded bg-yellow-300 p-2' href={project.url}>
            Try it out!
          </a>
        )}
      </motion.section>
      <View id='project-hero-display'>
        <Common />
        <AvatarModel />
      </View>
    </motion.div>
  )
}

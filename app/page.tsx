'use client'

import { Three } from '@/helpers/components/Three'
import { links } from '@/links'
import { projects } from '@/projects'
import {
  Box,
  Capsule,
  ContactShadows,
  Cylinder,
  Float,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Sphere,
} from '@react-three/drei'
import dynamic from 'next/dynamic'

export const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
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
export const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  return (
    <div>
      <Three>
        <color attach={'background'} args={[200, 200, 200]} />
        <Common />
        <group position={[-1, 1, 0]}>
          <Float>
            <Sphere args={[0.5]} scale-y={0.7}>
              <meshStandardMaterial color={'salmon'} />
            </Sphere>
            <Sphere args={[0.2]} position={[0.2, -0.3, 0]}>
              <meshStandardMaterial color={'palevioletred'} />
            </Sphere>
            <Cylinder args={[0.025, 0.025]} position={[0.2, -0.4, 0]}>
              <meshStandardMaterial color={'palevioletred'} />
            </Cylinder>
          </Float>
          <Cylinder args={[0.66, 0.66, 2, 32, 4]}>
            <MeshTransmissionMaterial
              distortionScale={0.5}
              temporalDistortion={0}
              thickness={0.2}
              color={'white'}
              transmission={0.95}
              backside
              // roughness={0.1}
            />
          </Cylinder>
          <Cylinder args={[0.7, 0.7, 0.1, 16, 1]} position-y={-1}>
            <meshStandardMaterial metalness={1} color={'gray'} />
          </Cylinder>
        </group>
        <Box position={[-1, 0.5, -2]} rotation-y={0.7}>
          <meshStandardMaterial color={'blue'} />
        </Box>
        <PerspectiveCamera makeDefault position={[0, 1, 3]} rotation-x={-0.1} />
        <ContactShadows />
      </Three>
      <div id='hero' className='relative h-screen'>
        <div className='absolute inset-y-0 right-0 w-1/2 p-4'>
          <p>Hello. My name is</p>
          <h1>
            <span className='text-8xl font-extrabold line-through opacity-20'>BRAIN</span>
            <br />
            <span className='text-8xl font-extrabold line-through opacity-20'>BRIAN</span>
            <br />
            <span className='text-8xl font-extrabold'>BRYAN</span>
          </h1>
          <br />
          <br />
          <p>I am a</p>
          <h2>
            <span className='text-4xl font-extrabold line-through opacity-20'>BRAIN</span>
            <br />
            <span className='text-4xl font-extrabold line-through opacity-20'>PORTFOLIO WEBSITE</span>
            <br />
            <span className='text-4xl font-extrabold'>CREATIVE DEVELOPER</span>
          </h2>
        </div>
      </div>

      <section id='about' className='flex min-h-screen flex-col'>
        <div className='grid flex-1 grid-cols-3 gap-3 p-4'>
          <div className='justify-self-end text-end'>
            <h2 className='text-2xl font-extrabold'>I love to make things</h2>
            <ul>
              <li>Invented my own dinosaurs as a child by drawing the skeleton and then adding muscle and skin.</li>
              <li>Once spent 3 hours folding an origami moose.</li>
              <li>I buy Legos for my children, but really I just get them for myself.</li>
            </ul>
          </div>
          <div className='col-start-3'>
            <h2 className='text-2xl font-extrabold'>I love solving problems</h2>
            <ul>
              <li>Was the kid in calculus class who was too eager to raise their hand.</li>
              <li>Solves nurikabe puzzles for fun.</li>
              <li>
                Often spends longer to fit more dishes in the dishwasher than it would take to hand wash the dishes.
              </li>
            </ul>
          </div>
        </div>
        <h2 className='p-8 text-center text-4xl font-extrabold'>I especially love doing both at the same time</h2>
      </section>
      <section id='projects' className='flex min-h-screen flex-col p-12'>
        <h2 className='text-6xl font-extrabold'>Projects</h2>
      </section>
      <section id='links' className='p-12'>
        <h2 className='text-2xl font-extrabold'>Find out more</h2>
        <br />
        <ul>
          {links.map((link) => {
            return (
              <li key={link.displayName}>
                <a href={link.url}>{link.displayName}</a>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

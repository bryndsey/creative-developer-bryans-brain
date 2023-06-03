'use client'

import { BrainTank } from '@/BrainTank'
import { Three } from '@/helpers/components/Three'
import { links } from '@/links'
import { ContactShadows, Environment, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Lenis from '@studio-freight/lenis'
import { useLenis } from '@studio-freight/react-lenis'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import StickyBox from 'react-sticky-box'
import { Camera, Group, MathUtils, Vector3 } from 'three'

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

interface Keyframe {
  id: string | 'start' | 'end'
  cameraRigRotation: number
  cameraPositionOnRig: Vector3
  cameraLookTargetPosition: Vector3
}

const startCameraBaseRotation = 0.5
const about1CameraBaseRotation = -Math.PI / 2 + 0.33
const about2CameraBaseRotation = Math.PI / 2 - 0.33
const about3CameraBaseRotation = 0
const projectCameraBaseRotation = 0
const endCameraBaseRotation = 0

let actualRotation = startCameraBaseRotation

const startCameraPosition = new Vector3(0, 0.5, 10)
const about1CameraPosition = new Vector3(-1.5, 0, 8)
const about2CameraPosition = new Vector3(1.5, 0, 8)
const about3CameraPosition = new Vector3(0, 0, 10)
const projectCameraPosition = new Vector3(0, 0.25, 10)
const endCameraPosition = new Vector3(-3, 1, 20)
const actualTargetCameraPosition = new Vector3()

const startCameraLookTargetPosition = new Vector3(1, 1.25, 0)
const about1CameraLookTargetPosition = new Vector3(0, 1, -1)
const about2CameraLookTargetPosition = new Vector3(0, 1, -1)
const about3CameraLookTargetPosition = new Vector3(0, 1, 0)
const projectCameraLookTargetPosition = new Vector3(-0.5, 1.25, -1)
const endCameraLookTargetPosition = new Vector3(-0.5, 1, 0)

const actualCameraLookTargetPosition = new Vector3()

const keyframes: Keyframe[] = [
  {
    id: 'start',
    cameraRigRotation: startCameraBaseRotation,
    cameraPositionOnRig: startCameraPosition,
    cameraLookTargetPosition: startCameraLookTargetPosition,
  },
  {
    id: 'about',
    cameraRigRotation: about1CameraBaseRotation,
    cameraPositionOnRig: about1CameraPosition,
    cameraLookTargetPosition: about1CameraLookTargetPosition,
  },
  {
    id: 'makeThings',
    cameraRigRotation: about2CameraBaseRotation,
    cameraPositionOnRig: about2CameraPosition,
    cameraLookTargetPosition: about2CameraLookTargetPosition,
  },
  {
    id: 'solveProblems',
    cameraRigRotation: about3CameraBaseRotation,
    cameraPositionOnRig: about3CameraPosition,
    cameraLookTargetPosition: about3CameraLookTargetPosition,
  },
  {
    id: 'projects',
    cameraRigRotation: projectCameraBaseRotation,
    cameraPositionOnRig: projectCameraPosition,
    cameraLookTargetPosition: projectCameraLookTargetPosition,
  },
  {
    id: 'end',
    cameraRigRotation: endCameraBaseRotation,
    cameraPositionOnRig: endCameraPosition,
    cameraLookTargetPosition: endCameraLookTargetPosition,
  },
]

function ThreeContent() {
  const cameraBaseRef = useRef<Group>(null)
  const cameraRef = useRef<Camera>(null)

  useFrame((state) => {
    cameraBaseRef.current.rotation.y = actualRotation

    cameraRef.current.position.set(
      actualTargetCameraPosition.x,
      actualTargetCameraPosition.y,
      actualTargetCameraPosition.z,
    )

    cameraRef.current.lookAt(actualCameraLookTargetPosition)
  })

  return (
    <>
      <Environment preset='warehouse' />
      <BrainTank scale={1.5} />
      {/* <Box position={[-1, 0.5, -2]} rotation-y={0.7}>
          <meshStandardMaterial metalness={1} color={'gray'} />
        </Box> */}
      <group ref={cameraBaseRef} position-y={1}>
        <PerspectiveCamera makeDefault position={startCameraPosition} rotation-x={-0.1} ref={cameraRef} fov={20} />
      </group>
      <ContactShadows />
    </>
  )
}

function getElementPositionsForKeyframes() {
  return keyframes.map((keyframe) => {
    if (keyframe.id === 'start') {
      return 0
    } else if (keyframe.id === 'end') {
      return document.body.scrollHeight
    } else {
      // TODO: Figure out safer way to do this
      const element = document.querySelector(`#${keyframe.id}`) as HTMLElement
      return element.offsetTop
    }
  })
}

export default function Page() {
  useLenis((lenis: Lenis) => {
    const scrollKeyframes = getElementPositionsForKeyframes()

    const scrollPoint = lenis.animatedScroll
    const nextTargetIndex = scrollKeyframes.findIndex((offset) => offset > scrollPoint)
    const nextKeyframe = keyframes[nextTargetIndex]
    const previousKeyframe = keyframes[nextTargetIndex - 1]

    const scrollProgressBetweenTargets = MathUtils.inverseLerp(
      scrollKeyframes[nextTargetIndex - 1],
      scrollKeyframes[nextTargetIndex],
      scrollPoint,
    )
    const smoothedValue = MathUtils.smootherstep(scrollProgressBetweenTargets, 0, 1)

    actualRotation = MathUtils.lerp(previousKeyframe.cameraRigRotation, nextKeyframe.cameraRigRotation, smoothedValue)

    actualTargetCameraPosition.lerpVectors(
      previousKeyframe.cameraPositionOnRig,
      nextKeyframe.cameraPositionOnRig,
      smoothedValue,
    )

    actualCameraLookTargetPosition.lerpVectors(
      previousKeyframe.cameraLookTargetPosition,
      nextKeyframe.cameraLookTargetPosition,
      smoothedValue,
    )
  })

  return (
    <div>
      <Three>
        <ThreeContent />
      </Three>
      <div id='hero' className='relative h-screen'>
        <div className='absolute inset-y-0 right-0 flex w-1/2 flex-col justify-around p-8'>
          <div>
            <p>Hello. My name is</p>
            <h1>
              <span className='text-8xl font-extrabold line-through opacity-20'>BRAIN</span>
              <br />
              <span className='text-8xl font-extrabold line-through opacity-20'>BRIAN</span>
              <br />
              <span className='text-8xl font-extrabold'>BRYAN</span>
            </h1>
          </div>

          <div>
            <p>I am a</p>
            <h2>
              <span className='text-4xl font-extrabold line-through opacity-20'>BRAIN</span>
              <br />
              <span className='text-4xl font-extrabold line-through opacity-20'>PORTFOLIO WEBSITE</span>
              <br />
              <span className='text-4xl font-extrabold'>
                <span className='font-sans italic'>CREATIVE </span>DEVELOPER
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className='h-screen' />

      <section id='about'>
        <div className='grid h-[400vh] grid-cols-3 items-start p-16'>
          <StickyBox className='flex min-h-screen flex-col justify-center'>
            <h2 className='text-2xl font-extrabold'>
              I love to <span className='font-sans italic'>make things</span>
            </h2>
            <ul className='list-disc'>
              <li>Invented my own dinosaurs as a child by drawing the skeleton and then adding muscle and skin.</li>
              <li>Once spent 3 hours folding an origami moose.</li>
              <li>I buy Legos for my children, but really I just get them for myself.</li>
            </ul>
          </StickyBox>
          <div className='col-start-3 flex h-full flex-col'>
            <div className='h-[200vh]' />
            <div id='makeThings' />
            <StickyBox className='flex min-h-screen flex-col justify-center'>
              <h2 className='text-2xl font-extrabold'>
                I <span className='font-sans italic'>love </span>solving problems
              </h2>
              <ul className='list-disc'>
                <li>Was the kid in calculus class who was too eager to raise their hand.</li>
                <li>Solves nurikabe puzzles for fun.</li>
                <li>
                  Often spends longer to fit more dishes in the dishwasher than it would take to hand wash the dishes.
                </li>
              </ul>
            </StickyBox>
          </div>
        </div>
        <h2 className='p-8 text-center text-4xl font-extrabold' id='solveProblems'>
          I especially love doing <span className='font-sans'>both</span> at the{' '}
          <span className='italic'>same time</span>
        </h2>
      </section>

      <div className='h-screen' />

      <section id='projects' className='flex min-h-screen flex-col p-12'>
        <h2 className='text-6xl font-extrabold'>Projects</h2>
      </section>

      <div className='h-screen' />

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

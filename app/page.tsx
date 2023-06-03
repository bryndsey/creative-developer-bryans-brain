'use client'

import { Three } from '@/helpers/components/Three'
import { links } from '@/links'
import { projects } from '@/projects'
import {
  Box,
  Capsule,
  ContactShadows,
  Cylinder,
  Environment,
  Float,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Sphere,
} from '@react-three/drei'
import { useLenis } from '@studio-freight/react-lenis'
import Lenis from '@studio-freight/lenis'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { Camera, Color, ColorRepresentation, Group, MathUtils, Vector3 } from 'three'
import { BrainTank } from '@/BrainTank'
import StickyBox from 'react-sticky-box'

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

const background = new Color('white')

function PlaceholderBrain() {
  return (
    <group position={[0, 1, 0]}>
      <Float>
        <Sphere args={[0.5]} scale={[0.66, 0.7, 1]} position-x={0.125}>
          <meshStandardMaterial color={'salmon'} roughness={0.25} />
        </Sphere>
        <Sphere args={[0.5]} scale={[0.66, 0.7, 1]} position-x={-0.125}>
          <meshStandardMaterial color={'salmon'} roughness={0.25} />
        </Sphere>
        <Sphere args={[0.2]} position={[0, -0.3, -0.2]}>
          <meshStandardMaterial color={'palevioletred'} roughness={0.25} />
        </Sphere>
        <Cylinder args={[0.025, 0.025]} position={[0, -0.4, -0.2]}>
          <meshStandardMaterial color={'palevioletred'} roughness={0.25} />
        </Cylinder>
      </Float>
      <Cylinder args={[0.66, 0.66, 2, 32, 4]}>
        <MeshTransmissionMaterial
          distortionScale={0.5}
          distortion={0.5}
          temporalDistortion={0}
          thickness={0.2}
          backside
          background={background}
          // roughness={0.1}
        />
      </Cylinder>
      <Cylinder args={[0.7, 0.7, 0.1, 16, 1]} position-y={-0.95}>
        <meshStandardMaterial metalness={1} color={'gray'} />
      </Cylinder>
    </group>
  )
}

const startCameraBaseRotation = 0.5
const about1CameraBaseRotation = -Math.PI / 2 + 0.33
const about2CameraBaseRotation = Math.PI / 2 - 0.33
const about3CameraBaseRotation = 0
const projectCameraBaseRotation = 0
const endCameraBaseRotation = 0

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

export default function Page() {
  const about1Ref = useRef<HTMLElement>(null)
  const about2Ref = useRef<HTMLDivElement>(null!)
  const about3Ref = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLElement>(null)

  const cameraBaseRef = useRef<Group>(null)
  const cameraRef = useRef<Camera>(null)
  useLenis((lenis: Lenis) => {
    if (cameraRef.current === null) return
    if (cameraBaseRef.current === null) return

    if (about1Ref.current === null) return
    if (about2Ref.current === null) return
    if (about3Ref.current === null) return
    if (projectsRef.current === null) return
    const cameraBaseRotations = [
      startCameraBaseRotation,
      about1CameraBaseRotation,
      about2CameraBaseRotation,
      about3CameraBaseRotation,
      projectCameraBaseRotation,
      endCameraBaseRotation,
    ]
    const cameraPositions = [
      startCameraPosition,
      about1CameraPosition,
      about2CameraPosition,
      about3CameraPosition,
      projectCameraPosition,
      endCameraPosition,
    ]
    const cameraLookPositions = [
      startCameraLookTargetPosition,
      about1CameraLookTargetPosition,
      about2CameraLookTargetPosition,
      about3CameraLookTargetPosition,
      projectCameraLookTargetPosition,
      endCameraLookTargetPosition,
    ]

    const scrollKeyframes = [
      -1,
      about1Ref.current.offsetTop,
      about2Ref.current.offsetTop,
      about3Ref.current.offsetTop,
      projectsRef.current.offsetTop,
      lenis.limit + 1,
    ]
    const scrollPoint = lenis.animatedScroll
    const nextTargetIndex = scrollKeyframes.findIndex((offset) => offset > scrollPoint)

    const scrollProgressBetweenTargets = MathUtils.inverseLerp(
      scrollKeyframes[nextTargetIndex - 1],
      scrollKeyframes[nextTargetIndex],
      scrollPoint,
    )
    const smoothedValue = MathUtils.smootherstep(scrollProgressBetweenTargets, 0, 1)

    const nextTargetBaseRotation = cameraBaseRotations[nextTargetIndex]
    const previousTargetBaseRotation = cameraBaseRotations[nextTargetIndex - 1]

    const actualRotation = MathUtils.lerp(previousTargetBaseRotation, nextTargetBaseRotation, smoothedValue)
    cameraBaseRef.current.rotation.y = actualRotation

    const nextTargetPosition = cameraPositions[nextTargetIndex]
    const previousTargetPosition = cameraPositions[nextTargetIndex - 1]

    actualTargetCameraPosition.lerpVectors(previousTargetPosition, nextTargetPosition, smoothedValue)
    cameraRef.current.position.set(
      actualTargetCameraPosition.x,
      actualTargetCameraPosition.y,
      actualTargetCameraPosition.z,
    )

    const nextLookTargetPosition = cameraLookPositions[nextTargetIndex]
    const previousLookTargetPosition = cameraLookPositions[nextTargetIndex - 1]

    actualCameraLookTargetPosition.lerpVectors(previousLookTargetPosition, nextLookTargetPosition, smoothedValue)
    cameraRef.current.lookAt(actualCameraLookTargetPosition)
    // console.log(actualTarget)
  })

  return (
    <div>
      <Three>
        <Environment preset='warehouse' />
        <BrainTank scale={1.5} />
        {/* <Box position={[-1, 0.5, -2]} rotation-y={0.7}>
          <meshStandardMaterial metalness={1} color={'gray'} />
        </Box> */}
        <group ref={cameraBaseRef} position-y={1}>
          <PerspectiveCamera makeDefault position={startCameraPosition} rotation-x={-0.1} ref={cameraRef} fov={20} />
        </group>
        <ContactShadows />
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

      <section id='about' ref={about1Ref}>
        <div className='flex h-[400vh] flex-row items-start'>
          <StickyBox className='flex min-h-screen w-1/2 flex-col justify-center'>
            <h2 className='text-2xl font-extrabold'>
              I love to <span className='font-sans italic'>make things</span>
            </h2>
            <ul>
              <li>Invented my own dinosaurs as a child by drawing the skeleton and then adding muscle and skin.</li>
              <li>Once spent 3 hours folding an origami moose.</li>
              <li>I buy Legos for my children, but really I just get them for myself.</li>
            </ul>
          </StickyBox>
          <div className='flex h-full w-1/2 flex-col'>
            <div className='h-[200vh]' />
            <div ref={about2Ref} />
            <StickyBox className='flex min-h-screen flex-col justify-center'>
              <h2 className='text-2xl font-extrabold'>
                I <span className='font-sans italic'>love </span>solving problems
              </h2>
              <ul>
                <li>Was the kid in calculus class who was too eager to raise their hand.</li>
                <li>Solves nurikabe puzzles for fun.</li>
                <li>
                  Often spends longer to fit more dishes in the dishwasher than it would take to hand wash the dishes.
                </li>
              </ul>
            </StickyBox>
          </div>
        </div>
        <h2 className='p-8 text-center text-4xl font-extrabold' ref={about3Ref}>
          I especially love doing <span className='font-sans'>both</span> at the{' '}
          <span className='italic'>same time</span>
        </h2>
      </section>

      <div className='h-screen' />

      <section id='projects' className='flex min-h-screen flex-col p-12' ref={projectsRef}>
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

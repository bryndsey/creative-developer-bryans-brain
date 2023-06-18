'use client'

import { BrainTank } from '@/BrainTank'
import { Three } from '@/helpers/components/Three'
import { CameraControls, Cylinder, Environment, Resize, Shadow } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useLenis } from '@studio-freight/react-lenis'
import Lenis from '@studio-freight/lenis'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { Box3, Group, Mesh, Vector3 } from 'three'

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
  worldRotation: number
  worldPosition: Vector3
  cameraLookTargetPosition: Vector3
}

let actualRotation = 0
const actualTargetCameraPosition = new Vector3()
const actualCameraLookTargetPosition = new Vector3()

const keyframes: Keyframe[] = [
  {
    id: 'start',
    worldRotation: -0.5,
    worldPosition: new Vector3(-1, -1.5, -2),
    cameraLookTargetPosition: new Vector3(1, 1.25, 0),
  },
  {
    id: 'about',
    worldRotation: Math.PI / 2 - 0.33,
    worldPosition: new Vector3(1.5, 0, 0),
    cameraLookTargetPosition: new Vector3(0, 1, -1),
  },
  {
    id: 'makeThings',
    worldRotation: -Math.PI / 2 + 0.33,
    worldPosition: new Vector3(-1.5, 0, 0),
    cameraLookTargetPosition: new Vector3(0, 1, -1),
  },
  {
    id: 'solveProblems',
    worldRotation: 0,
    worldPosition: new Vector3(0, 0, -2),
    cameraLookTargetPosition: new Vector3(0, 1, 0),
  },
  {
    id: 'projects',
    worldRotation: 0,
    worldPosition: new Vector3(0, -0.25, -2),
    cameraLookTargetPosition: new Vector3(-0.5, 1.25, -1),
  },
  {
    id: 'end',
    worldRotation: 0,
    worldPosition: new Vector3(3, -3, -12),
    cameraLookTargetPosition: new Vector3(-0.5, 0, 0),
  },
]

const boundingBox = new Box3()

function ThreeContent() {
  const cameraControlsRef = useRef<CameraControls>(null!)
  const tankRef = useRef<Group>(null!)

  useEffect(() => {
    cameraControlsRef.current.mouseButtons.wheel = 0
    cameraControlsRef.current.mouseButtons.right = 0
    cameraControlsRef.current.touches.two = 0
    cameraControlsRef.current.touches.three = 0
    cameraControlsRef.current.maxPolarAngle = Math.PI / 2
    // cameraControlsRef.current.setPosition(0, 2, 4)

    // cameraControlsRef.current.enabled = false
  }, [])

  useFrame((state, delta) => {
    if (tankRef.current === null) return
    if (boundingBox.isEmpty()) {
      boundingBox.setFromObject(tankRef.current)
    }

    cameraControlsRef.current.fitToBox(boundingBox, false, {
      cover: false,
      paddingRight: 0.5,
      paddingLeft: 0.01,
      paddingTop: 0.01,
      paddingBottom: 0.01,
    })
  })

  return (
    <>
      <CameraControls makeDefault ref={cameraControlsRef} />
      <Environment preset='warehouse' />
      <Resize scale={0.5}>
        <BrainTank ref={tankRef} />
      </Resize>
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
  // useLenis((lenis: Lenis) => {
  //   const scrollKeyframes = getElementPositionsForKeyframes()

  //   const scrollPoint = lenis.animatedScroll
  //   const nextTargetIndex = scrollKeyframes.findIndex((offset) => offset > scrollPoint)
  //   const nextKeyframe = keyframes[nextTargetIndex]
  //   const previousKeyframe = keyframes[nextTargetIndex - 1]

  //   const scrollProgressBetweenTargets = MathUtils.inverseLerp(
  //     scrollKeyframes[nextTargetIndex - 1],
  //     scrollKeyframes[nextTargetIndex],
  //     scrollPoint,
  //   )
  //   const smoothedValue = MathUtils.smootherstep(scrollProgressBetweenTargets, 0, 1)

  //   actualRotation = MathUtils.lerp(previousKeyframe.worldRotation, nextKeyframe.worldRotation, smoothedValue)

  //   actualTargetCameraPosition.lerpVectors(previousKeyframe.worldPosition, nextKeyframe.worldPosition, smoothedValue)

  //   actualCameraLookTargetPosition.lerpVectors(
  //     previousKeyframe.cameraLookTargetPosition,
  //     nextKeyframe.cameraLookTargetPosition,
  //     smoothedValue,
  //   )
  // })

  return (
    <div>
      <Three>
        <ThreeContent />
      </Three>
      <div id='hero' className='relative grid h-screen grid-cols-2'>
        <div className='col-start-2 flex h-screen flex-col justify-around p-4'>
          <div>
            <p>Hello. My name is</p>
            <h1 className='text-9xl font-extrabold'>
              <span className='line-through opacity-20'>BRAIN</span>
              <br />
              <span className='line-through opacity-20'>BRIAN</span>
              <br />
              <span>BRYAN</span>
            </h1>
          </div>

          <div>
            <p>I am a</p>
            <h2 className='text-4xl font-extrabold'>
              <span className='line-through opacity-20'>BRAIN</span>
              <br />
              <span className='line-through opacity-20'>PORTFOLIO WEBSITE</span>
              <br />
              <span>
                <span className='font-sans italic'>CREATIVE </span>DEVELOPER
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

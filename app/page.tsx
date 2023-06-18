'use client'

import { BrainTank } from '@/BrainTank'
import { Three } from '@/helpers/components/Three'
import { CameraControls, Cylinder, Environment, Resize, Shadow, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useLenis } from '@studio-freight/react-lenis'
import Lenis from '@studio-freight/lenis'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { Box3, Group, Mesh, Vector3 } from 'three'

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

  // useFrame((state, delta) => {
  //   if (tankRef.current === null) return
  //   if (boundingBox.isEmpty()) {
  //     boundingBox.setFromObject(tankRef.current)
  //   }

  //   cameraControlsRef.current.fitToBox(boundingBox, false, {
  //     cover: false,
  //     paddingRight: 0.5,
  //     paddingLeft: 0.01,
  //     paddingTop: 0.01,
  //     paddingBottom: 0.01,
  //   })
  // })

  return (
    <>
      <CameraControls makeDefault ref={cameraControlsRef} />
      <Environment preset='warehouse' />

      <Text position={[1.25, 0.25, 0]} fontSize={0.2} color={'dimgrey'}>
        LEFT BRAIN
      </Text>
      <Text position={[-1.25, 0.25, 0]} fontSize={0.2} color={'dimgrey'}>
        RIGHT BRAIN
      </Text>
      <BrainTank ref={tankRef} position-y={-1} />
    </>
  )
}

function MetaContent() {
  return (
    <div>
      <p>Made by</p>
      <h1 className='text-9xl font-extrabold'>
        <span className='line-through opacity-20'>BRAIN</span>
        <br />
        <span className='line-through opacity-20'>BRIAN</span>
        <br />
        <span>BRYAN</span>
        <br />
        {/* This calue is chosen for the ratio of size between first and last name, assuming monospace */}
        <span className='text-[0.71em]'>LINDSEY</span>
      </h1>
    </div>
  )
}

export default function Page() {
  // useLenis((lenis: Lenis) => {

  // })

  return (
    <div className='h-screen'>
      <Three>
        <ThreeContent />
      </Three>
      <MetaContent />
    </div>
  )
}

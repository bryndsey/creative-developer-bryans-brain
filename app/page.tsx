'use client'

import { BrainTank } from '@/BrainTank'
import { Three } from '@/helpers/components/Three'
import { CameraControls, Cylinder, Environment, Html, Resize, Shadow, Text } from '@react-three/drei'
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

      <group position-y={-0.5}>
        {/* <Text position={[0, -1, 1]} fontSize={0.4} color={'dimgrey'}>
        CREATIVE DEVELOPER
      </Text> */}
        <Text position={[-0.85, 0, 0]} fontSize={0.4} color={'dimgrey'} rotation-z={Math.PI / 2}>
          CREATIVE
        </Text>
        <Text position={[0.85, 0, 0]} fontSize={0.35} color={'dimgrey'} rotation-z={-Math.PI / 2}>
          DEVELOPER
        </Text>

        <Text position={[1.25, 0.25, 0]} fontSize={0.2} color={'dimgrey'}>
          LEFT BRAIN
        </Text>
        <Text position={[1.25, 0, 0]} fontSize={0.1} color={'lightgrey'}>
          Logic
        </Text>
        <Text position={[1.25, -0.15, 0]} fontSize={0.1} color={'lightgrey'}>
          Analysis
        </Text>
        <Text position={[1.25, -0.3, 0]} fontSize={0.1} color={'lightgrey'}>
          Reason
        </Text>
        <Text position={[-1.25, 0.25, 0]} fontSize={0.2} color={'dimgrey'}>
          RIGHT BRAIN
        </Text>
        <Text position={[-1.25, 0, 0]} fontSize={0.1} color={'lightgrey'}>
          Creativity
        </Text>
        <Text position={[-1.25, -0.15, 0]} fontSize={0.1} color={'lightgrey'}>
          Expression
        </Text>
        <Text position={[-1.25, -0.3, 0]} fontSize={0.1} color={'lightgrey'}>
          Imagination
        </Text>
        <BrainTank ref={tankRef} position-y={-1} />

        <Html transform position={[0, 1.55, 0]} distanceFactor={1}>
          <MetaContent />
        </Html>
      </group>
    </>
  )
}

function MetaContent() {
  return (
    <div>
      <p>Made by</p>
      <div className='text-9xl font-extrabold leading-none'>
        <p>
          <span className='line-through opacity-20'>BRAIN</span>
          <br />
          <span className='line-through opacity-20'>BRIAN</span>
          <br />
          <span className='leading-none'>BRYAN</span>
        </p>
        {/* This value is chosen for the ratio of size between first and last name, assuming monospace */}
        <p className='text-[0.71em] leading-none'>LINDSEY</p>
      </div>
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
      {/* <MetaContent /> */}
    </div>
  )
}

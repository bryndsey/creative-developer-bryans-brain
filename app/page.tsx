'use client'

import { BrainTank } from '@/BrainTank'
import { Three } from '@/helpers/components/Three'
import { CameraControls, Cylinder, Environment, Html, Resize, Shadow, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { transform, useAnimate, useMotionValue, useTransform } from 'framer-motion'
import { motion } from 'framer-motion-3d'
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

  const leftBrainTransitionProgress = useMotionValue(0)
  const rightBrainTransitionProgress = useMotionValue(0)
  const [scope, animate] = useAnimate()

  const developerTextOpacity = useTransform(leftBrainTransitionProgress, [0, 1], [1, 0])
  const developerTextOffset = useTransform(leftBrainTransitionProgress, [0, 1], [0, 0.5])
  const leftBrainTextOffset = useTransform(leftBrainTransitionProgress, [0, 1], [-0.5, 0])

  useFrame((state) => {
    // console.log(cameraControlsRef.current.)
    if (
      // TODO: Normalize the angle so repeated rotations still work
      cameraControlsRef.current.azimuthAngle > 0.5 &&
      leftBrainTransitionProgress.get() !== 1 &&
      !leftBrainTransitionProgress.isAnimating()
    ) {
      console.log('Triggering left brain')
      animate(leftBrainTransitionProgress, 1, { duration: 0.3 }).play()
    } else if (
      cameraControlsRef.current.azimuthAngle < 0.5 &&
      leftBrainTransitionProgress.get() !== 0 &&
      !leftBrainTransitionProgress.isAnimating()
    ) {
      console.log('Hiding left brain')
      // leftBrainTransitionProgress.set(0)
      animate(leftBrainTransitionProgress, 0, { duration: 0.3 }).play()
    }

    // console.log(leftBrainTransitionProgress.get())
  })

  return (
    <>
      <CameraControls makeDefault ref={cameraControlsRef} />
      <Environment preset='warehouse' />

      <group position-y={-0.5}>
        <Html transform position={[0, 1.55, -0.2]} distanceFactor={1}>
          <MetaContent />
        </Html>

        {/* <Text position={[0, -1, 1]} fontSize={0.4} color={'dimgrey'}>
        CREATIVE DEVELOPER
      </Text> */}
        <Text position={[-0.85, 0, 0.1]} fontSize={0.4} color={'dimgrey'} rotation-z={Math.PI / 2}>
          CREATIVE
        </Text>
        <motion.group position-z={developerTextOffset}>
          <Text position={[0.85, 0, 0.1]} fontSize={0.35} color={'dimgrey'} rotation-z={-Math.PI / 2}>
            DEVELOPER
            <motion.meshBasicMaterial transparent opacity={developerTextOpacity} />
          </Text>
        </motion.group>

        <group rotation-y={0.75}>
          <motion.group position-x={1.25} position-z={leftBrainTextOffset}>
            <Text position-y={0.25} fontSize={0.2} color={'dimgrey'}>
              LEFT BRAIN
              <motion.meshBasicMaterial transparent opacity={leftBrainTransitionProgress} />
            </Text>
            <Text fontSize={0.1} color={'lightgrey'}>
              Logic
              <motion.meshBasicMaterial transparent opacity={leftBrainTransitionProgress} />
            </Text>
            <Text position-y={-0.15} fontSize={0.1} color={'lightgrey'}>
              Analysis
              <motion.meshBasicMaterial transparent opacity={leftBrainTransitionProgress} />
            </Text>
            <Text position-y={-0.3} fontSize={0.1} color={'lightgrey'}>
              Reason
              <motion.meshBasicMaterial transparent opacity={leftBrainTransitionProgress} />
            </Text>
          </motion.group>
        </group>

        <group rotation-y={-0.75}>
          <group position-x={-1.25}>
            <Text position-y={0.25} fontSize={0.2} color={'dimgrey'}>
              RIGHT BRAIN
            </Text>
            <Text fontSize={0.1} color={'lightgrey'}>
              Creativity
            </Text>
            <Text position-y={-0.15} fontSize={0.1} color={'lightgrey'}>
              Expression
            </Text>
            <Text position-y={-0.3} fontSize={0.1} color={'lightgrey'}>
              Imagination
            </Text>
          </group>
        </group>

        <BrainTank ref={tankRef} position-y={-1} />
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

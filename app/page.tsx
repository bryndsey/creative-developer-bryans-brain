'use client'

import { BrainTank } from '@/BrainTank'
import { Three } from '@/helpers/components/Three'
import { animated, useSpringValue } from '@react-spring/three'
import { Box, CameraControls, Cylinder, Environment, Html, Resize, Shadow, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Box3, Group, MathUtils, Mesh, Vector3 } from 'three'

const boundingBox = new Box3()

function normalizeAngle(angle: number) {
  return MathUtils.euclideanModulo(angle, Math.PI * 2)
}

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

  const leftBrainSpringValue = useSpringValue(0)
  const rightBrainSpringValue = useSpringValue(0)

  useFrame((state) => {
    const normalizedAzimuth = normalizeAngle(cameraControlsRef.current.azimuthAngle)

    if (normalizedAzimuth < Math.PI && normalizedAzimuth > 0.5 && leftBrainSpringValue.goal !== 1) {
      leftBrainSpringValue.start(1)
    } else if ((normalizedAzimuth > Math.PI || normalizedAzimuth < 0.5) && leftBrainSpringValue.goal !== 0) {
      leftBrainSpringValue.start(0)
    }

    if (normalizedAzimuth > Math.PI && normalizedAzimuth < Math.PI * 2 - 0.5 && rightBrainSpringValue.goal !== 1) {
      rightBrainSpringValue.start(1)
    } else if (
      (normalizedAzimuth < Math.PI || normalizedAzimuth > Math.PI * 2 - 0.5) &&
      rightBrainSpringValue.goal !== 0
    ) {
      rightBrainSpringValue.start(0)
    }
  })

  return (
    <>
      <CameraControls makeDefault ref={cameraControlsRef} />
      <Environment preset='warehouse' />

      <group position-y={-0.5}>
        {/* <Html transform position={[0, 0, -0.75]} distanceFactor={1} rotation-y={Math.PI} occlude>
          <MetaContent />
        </Html> */}

        {/* <Text position={[0, -1, 1]} fontSize={0.4} color={'dimgrey'}>
        CREATIVE DEVELOPER
      </Text> */}
        <animated.group position-z={rightBrainSpringValue}>
          <Text position={[-0.85, 0, 0.1]} fontSize={0.4} color={'dimgrey'} rotation-z={Math.PI / 2}>
            CREATIVE
            <animated.meshBasicMaterial transparent opacity={rightBrainSpringValue.to((value) => 1 - value)} />
          </Text>
        </animated.group>
        <animated.group position-z={leftBrainSpringValue}>
          <Text position={[0.85, 0, 0.1]} fontSize={0.35} color={'dimgrey'} rotation-z={-Math.PI / 2}>
            DEVELOPER
            <animated.meshBasicMaterial transparent opacity={leftBrainSpringValue.to((value) => 1 - value)} />
          </Text>
        </animated.group>

        <group rotation-y={0.75}>
          <animated.group position-x={1.25} position-z={leftBrainSpringValue.to((value) => value - 1)}>
            <Text position-y={0.25} fontSize={0.2} color={'dimgrey'}>
              LEFT BRAIN
              <animated.meshBasicMaterial transparent opacity={leftBrainSpringValue} />
            </Text>
            <Text fontSize={0.1} color={'lightgrey'}>
              Logic
              <animated.meshBasicMaterial transparent opacity={leftBrainSpringValue} />
            </Text>
            <Text position-y={-0.15} fontSize={0.1} color={'lightgrey'}>
              Analysis
              <animated.meshBasicMaterial transparent opacity={leftBrainSpringValue} />
            </Text>
            <Text position-y={-0.3} fontSize={0.1} color={'lightgrey'}>
              Reason
              <animated.meshBasicMaterial transparent opacity={leftBrainSpringValue} />
            </Text>
          </animated.group>
        </group>

        <group rotation-y={-0.75}>
          <animated.group position-x={-1.25} position-z={rightBrainSpringValue.to((value) => value - 1)}>
            <Text position-y={0.25} fontSize={0.2} color={'dimgrey'}>
              RIGHT BRAIN
              <animated.meshBasicMaterial transparent opacity={rightBrainSpringValue} />
            </Text>
            <Text fontSize={0.1} color={'lightgrey'}>
              Creativity
              <animated.meshBasicMaterial transparent opacity={rightBrainSpringValue} />
            </Text>
            <Text position-y={-0.15} fontSize={0.1} color={'lightgrey'}>
              Expression
              <animated.meshBasicMaterial transparent opacity={rightBrainSpringValue} />
            </Text>
            <Text position-y={-0.3} fontSize={0.1} color={'lightgrey'}>
              Imagination
              <animated.meshBasicMaterial transparent opacity={rightBrainSpringValue} />
            </Text>
          </animated.group>
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

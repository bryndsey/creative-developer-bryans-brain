'use client'

import { BrainTank } from '@/BrainTank'
import { Three } from '@/helpers/components/Three'
import { animated, useSpringValue } from '@react-spring/three'
import { animated as animatedDom } from '@react-spring/web'
import { CameraControls, Center, Environment, Html, Resize, Text, useProgress } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useAtom } from 'jotai'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Group, MathUtils } from 'three'
import { useAutoRotateValue, useAutoRotateAtom } from './useAutoRotateValue'

const primaryTextColor = 'dimgrey'
const secondaryTextColor = 'darkgrey'

function normalizeAngle(angle: number) {
  return MathUtils.euclideanModulo(angle, Math.PI * 2)
}

function ThreeContent() {
  const cameraControlsRef = useRef<CameraControls>(null!)
  const itemsRef = useRef<Group>(null!)
  const leftBrainTextRef = useRef<Group>(null!)
  const rightBrainTextRef = useRef<Group>(null!)
  const metaContent = useRef<HTMLDivElement | null>(null)
  const metaContentGroupRef = useRef<Group>(null!)

  const { currentAutoRotateSpeed, stopAutoRotate, scheduleAutoRotateStart } = useAutoRotateValue()

  useEffect(() => {
    const cameraControls = cameraControlsRef.current

    cameraControls.mouseButtons.wheel = 0
    cameraControls.mouseButtons.right = 0
    cameraControls.touches.two = 0
    cameraControls.touches.three = 0
    cameraControls.maxPolarAngle = Math.PI / 2 + 0.25
    cameraControls.minPolarAngle = Math.PI / 4

    cameraControls.rotateAzimuthTo(-0.4)

    cameraControls.addEventListener('controlend', () => {
      scheduleAutoRotateStart()
    })

    cameraControls.addEventListener('controlstart', () => {
      stopAutoRotate()
    })

    return () => {
      cameraControls.removeAllEventListeners('controlstart')
      cameraControls.removeAllEventListeners('controlend')
    }
  }, [])

  useFrame((state, delta) => {
    if (currentAutoRotateSpeed.get() > 0) {
      cameraControlsRef.current.rotate(currentAutoRotateSpeed.get() * delta, 0, false)
    }
  })

  const isTall = useThree((state) => state.viewport.aspect < 4 / 3)
  const isPortrait = useThree((state) => state.viewport.aspect < 1)
  const brainSideTextZOffset = isPortrait ? 0.5 : 0
  const metaContentZOffset = isPortrait ? -0.75 : -0.95

  useEffect(() => {
    if (itemsRef.current === null) return

    const brainSideTextXOffset = isPortrait ? 0 : 1.25
    const brainSideTextYOffset = isPortrait ? -1.5 : 0

    leftBrainTextRef.current.position.setX(brainSideTextXOffset)
    leftBrainTextRef.current.position.setY(brainSideTextYOffset)
    rightBrainTextRef.current.position.setX(-brainSideTextXOffset)
    rightBrainTextRef.current.position.setY(brainSideTextYOffset)

    const metaContentYOffset = isPortrait ? -1.33 : -0.15
    metaContentGroupRef.current.position.setY(metaContentYOffset)
  }, [isPortrait])

  useFrame((state) => {
    const minScale = isTall
      ? Math.min(state.viewport.width * 1.5, state.viewport.height / 1.25)
      : state.viewport.height * 1.25
    itemsRef.current.scale.setScalar(minScale)
  })

  const leftBrainSpringValue = useSpringValue(0)
  const rightBrainSpringValue = useSpringValue(0)
  const metaTextSpringValue = useSpringValue(0)

  const yPosition = useSpringValue(-3)
  useProgress((state) => {
    const finishedLoading = !state.active && state.progress === 100
    const actualTarget = finishedLoading ? 0 : -3
    if (yPosition.goal !== actualTarget) {
      yPosition.start(actualTarget, { delay: 500 })
    }
  })

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

    if (
      normalizedAzimuth > (Math.PI * 2) / 3 &&
      normalizedAzimuth < (Math.PI * 4) / 3 &&
      metaTextSpringValue.goal !== 1
    ) {
      metaTextSpringValue.start(1)
    } else if (
      (normalizedAzimuth < (Math.PI * 2) / 3 || normalizedAzimuth > (Math.PI * 4) / 3) &&
      metaTextSpringValue.goal !== 0
    ) {
      metaTextSpringValue.start(0)
    }

    if (metaContent.current !== null) {
      metaContent.current.style.opacity = `${metaTextSpringValue.get()}`
    }
  })

  return (
    <>
      <CameraControls makeDefault ref={cameraControlsRef} />
      <Environment preset='warehouse' />

      <animated.group position-y={yPosition}>
        <Center>
          <Resize ref={itemsRef}>
            <animated.group
              position-y={-0.15}
              position-z={metaTextSpringValue.to((value) => (value - 1) * 0.66 + metaContentZOffset)}
              ref={metaContentGroupRef}
            >
              <Html transform distanceFactor={1} rotation-y={Math.PI} ref={metaContent} scale={0.75}>
                <MetaContent />
              </Html>
            </animated.group>

            <animated.group position-z={rightBrainSpringValue}>
              <Text
                position={[-0.85, 0, 0.1]}
                fontSize={0.4}
                color={primaryTextColor}
                rotation-z={Math.PI / 2}
                font='/SpaceMono-BoldItalic.ttf'
              >
                Creative
                <animated.meshBasicMaterial transparent opacity={rightBrainSpringValue.to((value) => 1 - value)} />
              </Text>
            </animated.group>
            <animated.group position-z={leftBrainSpringValue}>
              <Text
                position={[0.85, 0, 0.1]}
                fontSize={0.325}
                color={primaryTextColor}
                rotation-z={-Math.PI / 2}
                font='/telegrama_render.otf'
              >
                Developer
                <animated.meshBasicMaterial transparent opacity={leftBrainSpringValue.to((value) => 1 - value)} />
              </Text>
            </animated.group>

            <group rotation-y={Math.PI / 4}>
              <animated.group
                position-z={leftBrainSpringValue.to((value) => value - 1 + brainSideTextZOffset)}
                ref={leftBrainTextRef}
              >
                <Text position-y={0.25} position-z={0.1} fontSize={0.2} font='/telegrama_render.otf'>
                  Left Brain
                  <animated.meshBasicMaterial
                    color={primaryTextColor}
                    transparent
                    opacity={leftBrainSpringValue}
                    depthWrite={false}
                  />
                </Text>
                <Center disableY disableZ>
                  <Text
                    fontSize={0.1}
                    anchorX={-0.25}
                    position-z={-0.05}
                    textAlign='center'
                    color={secondaryTextColor}
                    font='/telegrama_render.otf'
                  >
                    Logic
                    <animated.meshBasicMaterial transparent opacity={leftBrainSpringValue} />
                  </Text>
                  <Text
                    position-y={-0.15}
                    anchorX={-0.25}
                    textAlign='center'
                    fontSize={0.1}
                    color={secondaryTextColor}
                    font='/telegrama_render.otf'
                  >
                    Analysis
                    <animated.meshBasicMaterial transparent opacity={leftBrainSpringValue} />
                  </Text>
                  <Text
                    position-y={-0.3}
                    anchorX={-0.25}
                    position-z={0.05}
                    textAlign='center'
                    fontSize={0.1}
                    color={secondaryTextColor}
                    font='/telegrama_render.otf'
                  >
                    Reason
                    <animated.meshBasicMaterial transparent opacity={leftBrainSpringValue} />
                  </Text>
                </Center>
              </animated.group>
            </group>

            <group rotation-y={-Math.PI / 4}>
              <animated.group
                position-z={rightBrainSpringValue.to((value) => value - 1 + brainSideTextZOffset)}
                ref={rightBrainTextRef}
              >
                <Text position-y={0.25} position-z={0.1} fontSize={0.2} font='/SpaceMono-BoldItalic.ttf'>
                  Right Brain
                  <animated.meshBasicMaterial
                    color={primaryTextColor}
                    transparent
                    opacity={rightBrainSpringValue}
                    depthWrite={false}
                  />
                </Text>
                <Text
                  fontSize={0.1}
                  rotation-y={0.05}
                  rotation-z={0.025}
                  position-z={0.05}
                  color={secondaryTextColor}
                  font='/SpaceMono-BoldItalic.ttf'
                >
                  Creativity
                  <animated.meshBasicMaterial transparent opacity={rightBrainSpringValue} />
                </Text>
                <Text
                  position-y={-0.15}
                  anchorX={'right'}
                  rotation-y={0.1}
                  position-z={-0.05}
                  fontSize={0.1}
                  color={secondaryTextColor}
                  font='/SpaceMono-BoldItalic.ttf'
                >
                  Expression
                  <animated.meshBasicMaterial transparent opacity={rightBrainSpringValue} />
                </Text>
                <Text
                  position-y={-0.3}
                  fontSize={0.1}
                  rotation-y={-0.1}
                  anchorX={0.2}
                  color={secondaryTextColor}
                  font='/SpaceMono-BoldItalic.ttf'
                >
                  Imagination
                  <animated.meshBasicMaterial transparent opacity={rightBrainSpringValue} />
                </Text>
              </animated.group>
            </group>

            <BrainTank position-y={-1} />
          </Resize>
        </Center>
      </animated.group>
    </>
  )
}

function MetaContent() {
  return (
    <div className='rounded-xl bg-white/60 p-8 [box-shadow:0_0_25px_25px_rgba(255,255,255,0.6)]'>
      <p className='text-4xl'>Made by</p>
      <div className='text-9xl font-extrabold leading-none' style={{ color: primaryTextColor }}>
        <p>
          <span className='line-through opacity-70' style={{ color: secondaryTextColor }}>
            BRAIN
          </span>
          <br />
          <span className='line-through opacity-70' style={{ color: secondaryTextColor }}>
            BRIAN
          </span>
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
  const [showLoading, setShowLoading] = useState(true)
  const opacity = useSpringValue(0, {
    onChange(result) {
      if (!showLoading && result.value !== 0) {
        setShowLoading(true)
      }
    },
    onRest(result) {
      if (showLoading && result.value === 0) {
        setShowLoading(false)
      }
    },
  })

  useProgress((state) => {
    const finishedLoading = !state.active && state.progress === 100
    const actualTarget = finishedLoading ? 0 : 1
    if (opacity.goal !== actualTarget) {
      opacity.start(actualTarget)
    }
  })

  const [autoRotateOn, setAutoRotateOn] = useAtom(useAutoRotateAtom)

  return (
    <div className='h-screen'>
      <Three>
        <Suspense fallback={null}>
          <ThreeContent />
        </Suspense>
      </Three>
      {!showLoading && (
        <div className='fixed bottom-4 right-4 z-10 text-xs opacity-30 transition-opacity hover:opacity-100'>
          <label style={{ color: secondaryTextColor }} onPointerDownCapture={(e) => e.stopPropagation()}>
            Auto-rotate{' '}
            <input
              type='checkbox'
              checked={autoRotateOn}
              className='accent-stone-700'
              onChange={(e) => setAutoRotateOn(e.target.checked)}
            />
          </label>
        </div>
      )}
      {showLoading && (
        <animatedDom.div style={{ opacity }} className='fixed inset-0 z-20 grid place-items-center bg-white'>
          Loading
        </animatedDom.div>
      )}
    </div>
  )
}

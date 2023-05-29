'use client'

import { View } from '@/components/canvas/View'
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import useMeasure from 'react-use-measure'
import { Group, PerspectiveCamera as ThreePerspectiveCamera, Vector3 } from 'three'
import { AcousticGuitar } from './AcousticGuitar'

const viewportTarget = new Vector3()
const guitarPosition = new Vector3()
function HeroContent({ bounds }) {
  const guitarRef = useRef<Group>(null!)
  const cameraRef = useRef<ThreePerspectiveCamera>(null!)
  useFrame((state) => {
    const myViewport = state.viewport.getCurrentViewport(cameraRef.current, viewportTarget, bounds)
    // console.log(state.size)
    // console.log(cameraRef.current.view.width, cameraRef.current.view.height)
    // console.log(cameraRef.current)

    // console.log('Width', myViewport.width, 'Height', myViewport.height)
    guitarRef.current.position.x = myViewport.width / 4

    //   console.log(state.size.width)
    // console.log(state.viewport.factor)

    // guitarPosition.set(0.5, -0.25, 0.92)
    // const newPosition = guitarPosition.unproject(cameraRef.current)
    // guitarRef.current.position.set(newPosition.x, newPosition.y, newPosition.z)
    // console.log(newPosition)
    guitarRef.current.rotation.set(Math.PI / 2, -0.25, 0.75)
  })

  return (
    <>
      <group ref={guitarRef}>
        <AcousticGuitar />
      </group>
      <ambientLight />
      <PerspectiveCamera ref={cameraRef} makeDefault fov={40} far={10} position={[0, 0, 3]} />
    </>
  )
}

export function SongSparkHero() {
  const [ref, bounds] = useMeasure()

  return (
    <View className='h-full min-h-[400px] w-full' ref={ref}>
      <HeroContent bounds={bounds} />
    </View>
  )
}

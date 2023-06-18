'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, Stats } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import { Perf } from 'r3f-perf'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
      {/* <Stats />
      <Perf position='top-right' /> */}
    </Canvas>
  )
}

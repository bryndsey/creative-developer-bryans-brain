'use client'
import { Cylinder, Float, MeshTransmissionMaterial, Sphere } from '@react-three/drei'
import { Color } from 'three'

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
        />
      </Cylinder>
      <Cylinder args={[0.7, 0.7, 0.1, 16, 1]} position-y={-0.95}>
        <meshStandardMaterial metalness={1} color={'gray'} />
      </Cylinder>
    </group>
  )
}

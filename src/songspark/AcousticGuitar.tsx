import { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'

export function AcousticGuitar() {
  const gltf = useGLTF('/guitar.glb')
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}

useGLTF.preload('/guitar.glb')

import { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'

export function ViolinModel() {
  const gltf = useGLTF('/violin.glb')
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}

useGLTF.preload('/violin.glb')

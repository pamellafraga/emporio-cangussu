import {
  ContactShadows,
  Environment,
  OrbitControls,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useRef } from 'react'
import type { Group } from 'three'
import type { Wine } from '@/data/wines'
import { WineBottle } from './WineBottle'

type BottleSceneProps = {
  wine: Wine
  className?: string
  interactive?: boolean
}

function FloatingBottle({ wine }: { wine: Wine }) {
  const floatRef = useRef<Group>(null)

  useFrame((state) => {
    const group = floatRef.current
    if (!group) return
    const t = state.clock.elapsedTime
    // Flutuação vertical + leve balanço (visível)
    group.position.y = Math.sin(t * 1.15) * 0.08
    group.rotation.z = Math.sin(t * 0.9) * 0.035
    group.rotation.x = Math.cos(t * 0.7) * 0.025
  })

  return (
    <group ref={floatRef}>
      <WineBottle wine={wine} autoRotate={false} />
    </group>
  )
}

function SceneContent({ wine, interactive }: { wine: Wine; interactive: boolean }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight
        position={[2.8, 5.5, 3]}
        angle={0.32}
        penumbra={0.85}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#f7f1e4"
      />
      <spotLight position={[-3.2, 3.5, -1.5]} angle={0.45} penumbra={1} intensity={0.8} color="#a83226" />
      <pointLight position={[0.5, 2, 2.5]} intensity={0.45} color="#d4a25f" />
      <directionalLight position={[-2, 4, 2]} intensity={0.4} color="#8da399" />

      <Environment preset="warehouse" environmentIntensity={0.65} />

      <FloatingBottle wine={wine} />

      {interactive ? (
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.9}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.65}
          target={[0, 0.15, 0]}
        />
      ) : null}

      <mesh position={[0, -1.12, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.3, 64]} />
        <meshStandardMaterial color="#3a2b20" roughness={0.82} metalness={0.04} transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, -1.34, 0]} receiveShadow>
        <cylinderGeometry args={[1.08, 1.18, 0.42, 48]} />
        <meshStandardMaterial color="#241a14" roughness={0.92} metalness={0.02} />
      </mesh>

      <ContactShadows
        position={[0, -1.12, 0]}
        opacity={0.45}
        scale={8}
        blur={2.4}
        far={4}
        color="#050505"
      />

      <EffectComposer>
        <Bloom luminanceThreshold={0.88} intensity={0.25} mipmapBlur />
      </EffectComposer>
    </>
  )
}

function LoaderFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshBasicMaterial color="#d4a25f" wireframe />
    </mesh>
  )
}

export function BottleScene({ wine, className, interactive = true }: BottleSceneProps) {
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <img
        src="/scene-backdrop-hq.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        decoding="async"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/35 via-transparent to-forest-deep/20"
        aria-hidden
      />
      <Canvas
        className="relative z-10 h-full w-full touch-none"
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.35, 4.2], fov: 36 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMappingExposure: 1.05,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<LoaderFallback />}>
          <SceneContent wine={wine} interactive={interactive} />
        </Suspense>
      </Canvas>
    </div>
  )
}

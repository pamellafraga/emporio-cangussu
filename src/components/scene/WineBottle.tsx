import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import {
  CanvasTexture,
  DoubleSide,
  MathUtils,
  SRGBColorSpace,
  Vector2,
  type Group,
} from 'three'
import type { Wine } from '@/data/wines'

type WineBottleProps = {
  wine: Wine
  autoRotate?: boolean
}

function createLabelTexture(wine: Wine) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Fundo pergaminho
  ctx.fillStyle = wine.labelTint
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Faixa superior na cor da cápsula
  ctx.fillStyle = wine.foilColor
  ctx.fillRect(0, 0, canvas.width, 36)
  ctx.fillRect(0, canvas.height - 36, canvas.width, 36)

  // Painéis laterais (verso do rótulo) — ajuda a ver a rotação
  ctx.fillStyle = 'rgba(30, 77, 43, 0.12)'
  ctx.fillRect(0, 36, 180, canvas.height - 72)
  ctx.fillRect(canvas.width - 180, 36, 180, canvas.height - 72)

  // Área central do rótulo
  const cx = canvas.width / 2

  ctx.fillStyle = '#1a1a1a'
  ctx.font = '600 28px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText('EMPÓRIO', cx, 100)

  ctx.font = '700 72px Georgia, serif'
  ctx.fillText('Cangussu', cx, 175)

  ctx.strokeStyle = wine.foilColor
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(cx - 140, 200)
  ctx.lineTo(cx + 140, 200)
  ctx.stroke()

  ctx.font = '600 40px Georgia, serif'
  ctx.fillStyle = '#1a1a1a'
  ctx.fillText(wine.name, cx, 260)

  ctx.font = '500 26px Outfit, sans-serif'
  ctx.fillStyle = '#4a4f42'
  ctx.fillText(`${wine.grape}  ·  ${wine.vintage}`, cx, 310)

  ctx.font = '500 22px Outfit, sans-serif'
  ctx.fillStyle = wine.foilColor
  ctx.fillText(wine.region.toUpperCase(), cx, 360)

  // Marca lateral (visível ao girar)
  ctx.save()
  ctx.translate(90, canvas.height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.font = '600 22px Georgia, serif'
  ctx.fillStyle = '#1e4d2b'
  ctx.textAlign = 'center'
  ctx.fillText('CANGUSSU', 0, 0)
  ctx.restore()

  ctx.save()
  ctx.translate(canvas.width - 90, canvas.height / 2)
  ctx.rotate(Math.PI / 2)
  ctx.font = '600 22px Georgia, serif'
  ctx.fillStyle = '#1e4d2b'
  ctx.textAlign = 'center'
  ctx.fillText(wine.vintage.toString(), 0, 0)
  ctx.restore()

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

export function WineBottle({ wine, autoRotate = true }: WineBottleProps) {
  const group = useRef<Group>(null)
  const clock = useRef(0)

  const profile = useMemo(
    () => [
      new Vector2(0, 0),
      new Vector2(0.4, 0),
      new Vector2(0.45, 0.06),
      new Vector2(0.44, 0.2),
      new Vector2(0.44, 1.35),
      new Vector2(0.4, 1.52),
      new Vector2(0.26, 1.7),
      new Vector2(0.17, 1.95),
      new Vector2(0.16, 2.2),
      new Vector2(0.19, 2.28),
      new Vector2(0.19, 2.4),
      new Vector2(0, 2.4),
    ],
    [],
  )

  const labelTexture = useMemo(() => createLabelTexture(wine), [wine])

  useLayoutEffect(() => {
    return () => {
      labelTexture.dispose()
    }
  }, [labelTexture])

  useFrame((_, delta) => {
    if (!autoRotate || !group.current) return
    clock.current += delta
    const yaw = Math.sin(clock.current * 0.65) * 1.15
    const tilt = Math.sin(clock.current * 0.4) * 0.08
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, yaw, 0.08)
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, tilt, 0.08)
  })

  return (
    <group ref={group} position={[0, -1.05, 0]}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 64]} />
        <meshPhysicalMaterial
          color={wine.glassColor}
          metalness={0}
          roughness={0.04}
          transmission={0.94}
          thickness={0.75}
          ior={1.52}
          transparent
          opacity={1}
          envMapIntensity={1.8}
          clearcoat={1}
          clearcoatRoughness={0.03}
          specularIntensity={1}
          attenuationColor="#2a1210"
          attenuationDistance={0.9}
          side={DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.405, 0.405, 1.38, 48]} />
        <meshPhysicalMaterial
          color={wine.liquidColor}
          roughness={0.4}
          metalness={0}
          transmission={0.12}
          thickness={1}
          ior={1.33}
          transparent
          opacity={0.94}
          attenuationColor={wine.liquidColor}
          attenuationDistance={0.35}
        />
      </mesh>

      {/* Rótulo com arte — muda com o vinho selecionado */}
      <mesh position={[0, 0.55, 0]} castShadow rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[0.453, 0.453, 0.58, 64, 1, true]} />
        <meshStandardMaterial
          map={labelTexture}
          roughness={0.75}
          metalness={0.02}
          side={DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.455, 0.455, 0.035, 64, 1, true]} />
        <meshStandardMaterial
          color={wine.foilColor}
          roughness={0.35}
          metalness={0.25}
          side={DoubleSide}
        />
      </mesh>

      <mesh position={[0, 2.18, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.185, 0.36, 48]} />
        <meshStandardMaterial color={wine.foilColor} metalness={0.6} roughness={0.25} />
      </mesh>

      <mesh position={[0, 2.38, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.07, 32]} />
        <meshStandardMaterial color="#c4a574" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  )
}

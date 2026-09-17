import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(root, '..', 'public')
const source = path.join(publicDir, 'logo-cangussu.jpg')

await mkdir(publicDir, { recursive: true })

async function makeIcon(size, outName) {
  const out = path.join(publicDir, outName)
  await sharp(source)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(out)
  console.log(`wrote ${outName} (${size}x${size})`)
}

await makeIcon(192, 'pwa-192.png')
await makeIcon(512, 'pwa-512.png')
await makeIcon(180, 'apple-touch-icon.png')

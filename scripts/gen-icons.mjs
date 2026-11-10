import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const svg = readFileSync('public/favicon.svg')
const targets = [
  ['public/pwa-192x192.png', 192],
  ['public/pwa-512x512.png', 512],
  ['public/apple-touch-icon.png', 180],
]
for (const [file, size] of targets) {
  await sharp(svg).resize(size, size).png().toFile(file)
  console.log('generated', file)
}


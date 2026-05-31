import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'
import convert from 'heic-convert'
import ffmpegStatic from 'ffmpeg-static'
import Ffmpeg from 'fluent-ffmpeg'

Ffmpeg.setFfmpegPath(ffmpegStatic)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const picsDir   = path.join(__dirname, '../public/pics')
const vidsDir   = path.join(__dirname, '../public/vids')

// ── PHOTOS ──────────────────────────────────────────────────────────────────
const picFiles  = fs.readdirSync(picsDir)
const heicList  = picFiles.filter(f => /\.heic$/i.test(f))

console.log(`\nPhotos: ${heicList.length} HEIC files to convert...`)
for (const file of heicList) {
  const inPath  = path.join(picsDir, file)
  const outName = file.replace(/\.heic$/i, '.jpg')
  const outPath = path.join(picsDir, outName)
  if (fs.existsSync(outPath)) { console.log(`  skip  ${file}`); continue }
  process.stdout.write(`  converting ${file} ... `)
  const input  = fs.readFileSync(inPath)
  const output = await convert({ buffer: input, format: 'JPEG', quality: 0.88 })
  fs.writeFileSync(outPath, Buffer.from(output))
  console.log('done')
}

// ── VIDEOS ───────────────────────────────────────────────────────────────────
const vidFiles = fs.readdirSync(vidsDir)
const movList  = vidFiles.filter(f => /\.mov$/i.test(f))

console.log(`\nVideos: ${movList.length} MOV files to convert...`)
for (const file of movList) {
  const inPath  = path.join(vidsDir, file)
  const outName = file.replace(/\.mov$/i, '.mp4')
  const outPath = path.join(vidsDir, outName)
  if (fs.existsSync(outPath)) { console.log(`  skip  ${file}`); continue }
  process.stdout.write(`  converting ${file} ... `)
  await new Promise((resolve, reject) => {
    Ffmpeg(inPath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions(['-crf 23', '-preset fast', '-movflags +faststart'])
      .save(outPath)
      .on('end', resolve)
      .on('error', reject)
  })
  console.log('done')
}

console.log('\nAll done!')

import { mkdir, rm, stat } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { spawn } from 'node:child_process';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const imageOutputDir = 'src/assets/optimized/img';
const videoOutputDir = 'src/assets/optimized/videos';
const targetWidths = [640, 1280, 1920];

const rasterImages = [
  { src: 'src/assets/img/digital-kontext-logo5.png', name: 'digital-kontext-logo5', quality: 82, avifQuality: 58 },
  { src: 'src/assets/img/compuviejo.png', name: 'compuviejo', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/claqueta.png', name: 'claqueta', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/menschenundatmosphere.png', name: 'menschenundatmosphere', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/detailsundprodukte.jpg', name: 'detailsundprodukte', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/webundpresentation.jpg', name: 'webundpresentation', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/imagefilm.png', name: 'imagefilm', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/socialclips.jpg', name: 'socialclips', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/arbeitsprocesse.jpg', name: 'arbeitsprocesse', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/fotoJuan.JPG', name: 'fotoJuan', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/firma.png', name: 'firma', quality: 82, avifQuality: 58 },
  { src: 'src/assets/img/projects/sherpa-east-studio.png', name: 'project-sherpa-east-studio', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/projects/ladenie-online-shop.png', name: 'project-ladenie-online-shop', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/projects/mcekat.png', name: 'project-mcekat', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/projects/empanada-society.png', name: 'project-empanada-society', quality: 78, avifQuality: 52 },
  { src: 'src/assets/img/Clouds/cloud1.png', name: 'cloud1', quality: 74, avifQuality: 48 },
  { src: 'src/assets/img/Clouds/cloud7.png', name: 'cloud7', quality: 74, avifQuality: 48 },
  { src: 'src/assets/img/Clouds/cloud8.png', name: 'cloud8', quality: 74, avifQuality: 48 },
];

const animatedImages = [
  {
    src: 'src/assets/img/preload.gif',
    name: 'preload',
    width: 160,
    fps: 12,
    quality: 48,
  },
];

const videoJobs = [
  {
    src: 'src/assets/Videos/leute-tanzen.mp4',
    name: 'leute-tanzen',
    variants: [
      { label: '540', height: 540, crf: 37, maxrate: '420k', bufsize: '840k' },
      { label: 'hq', height: 540, crf: 24, maxrate: '2400k', bufsize: '4800k' },
    ],
    posterAt: '00:00:00.350',
  },
  {
    src: 'src/assets/Videos/timeline5.mp4',
    name: 'timeline5',
    variants: [
      { label: '540', height: 540, crf: 32, maxrate: '820k', bufsize: '1640k' },
      { label: '1080', height: 1080, crf: 30, maxrate: '2100k', bufsize: '4200k' },
    ],
    posterAt: '00:00:00.350',
  },
];

const fileSize = async (file) => {
  const result = await stat(file);
  return result.size;
};

const ensureDir = async (file) => {
  await mkdir(dirname(file), { recursive: true });
};

const uniqueWidthsFor = (sourceWidth) => {
  const widths = targetWidths.filter((width) => width <= sourceWidth);

  if (!widths.includes(sourceWidth) && sourceWidth < targetWidths.at(-1)) {
    widths.push(sourceWidth);
  }

  return widths.slice(0, 3);
};

const optimizeRasterImages = async () => {
  await mkdir(imageOutputDir, { recursive: true });

  for (const image of rasterImages) {
    const metadata = await sharp(image.src, { limitInputPixels: false }).metadata();
    const widths = uniqueWidthsFor(metadata.width);

    for (const width of widths) {
      const webpOutput = join(imageOutputDir, `${image.name}-${width}.webp`);
      const avifOutput = join(imageOutputDir, `${image.name}-${width}.avif`);

      await sharp(image.src, { limitInputPixels: false })
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({
          effort: 5,
          quality: image.quality,
          alphaQuality: image.quality,
          smartSubsample: true,
        })
        .toFile(webpOutput);

      await sharp(image.src, { limitInputPixels: false })
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .avif({
          effort: 5,
          quality: image.avifQuality,
        })
        .toFile(avifOutput);

      const [webpSize, avifSize] = await Promise.all([
        fileSize(webpOutput),
        fileSize(avifOutput),
      ]);

      if (avifSize >= webpSize * 0.94) {
        await rm(avifOutput);
      }
    }
  }
};

const optimizeAnimatedImages = async () => {
  await mkdir(imageOutputDir, { recursive: true });

  for (const image of animatedImages) {
    const output = join(imageOutputDir, `${image.name}-${image.width}.webp`);

    await runFfmpeg([
      '-y',
      '-i', image.src,
      '-vf', `fps=${image.fps},scale=${image.width}:-1:flags=lanczos`,
      '-loop', '0',
      '-an',
      '-c:v', 'libwebp',
      '-lossless', '0',
      '-compression_level', '6',
      '-q:v', String(image.quality),
      output,
    ]);
  }
};

const runFfmpeg = (args) => new Promise((resolve, reject) => {
  const child = spawn(ffmpegPath, args, { stdio: ['ignore', 'inherit', 'inherit'] });

  child.on('error', reject);
  child.on('close', (code) => {
    if (code === 0) {
      resolve();
      return;
    }

    reject(new Error(`ffmpeg failed with exit code ${code}`));
  });
});

const optimizeVideos = async () => {
  await mkdir(videoOutputDir, { recursive: true });

  for (const video of videoJobs) {
    for (const variant of video.variants) {
      const output = join(videoOutputDir, `${video.name}-${variant.label}.mp4`);

      await runFfmpeg([
        '-y',
        '-i', video.src,
        '-an',
        '-vf', `scale=-2:'min(${variant.height},ih)',fps=24`,
        '-c:v', 'libx264',
        '-preset', 'slow',
        '-profile:v', 'main',
        '-level', '4.0',
        '-pix_fmt', 'yuv420p',
        '-crf', String(variant.crf),
        '-maxrate', variant.maxrate,
        '-bufsize', variant.bufsize,
        '-movflags', '+faststart',
        output,
      ]);
    }

    const posterPng = join(videoOutputDir, `${video.name}-poster.png`);
    const posterWebp = join(imageOutputDir, `${video.name}-poster-640.webp`);

    await ensureDir(posterPng);

    await runFfmpeg([
      '-y',
      '-ss', video.posterAt,
      '-i', video.src,
      '-frames:v', '1',
      '-update', '1',
      '-vf', 'scale=640:-2',
      posterPng,
    ]);

    await sharp(posterPng)
      .webp({ quality: 76, effort: 5 })
      .toFile(posterWebp);

    await rm(posterPng);
  }
};

await optimizeRasterImages();
await optimizeAnimatedImages();
await optimizeVideos();

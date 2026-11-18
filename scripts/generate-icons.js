import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Function to generate a solid RGBA PNG buffer with simple shapes
function createPng(width, height, r, g, b, a = 255) {
  const rowSize = width * 4 + 1;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      // Distance from center
      const dx = x - width / 2;
      const dy = y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Outer border circle ring in gold
      if (Math.abs(dist - width * 0.42) < width * 0.02) {
        rawData[pixelOffset] = 229;     // Gold
        rawData[pixelOffset + 1] = 169;
        rawData[pixelOffset + 2] = 59;
        rawData[pixelOffset + 3] = 255;
      } else if (dist < width * 0.22) {
        // Inner circle in mahua gold
        rawData[pixelOffset] = 229;     // Gold
        rawData[pixelOffset + 1] = 169;
        rawData[pixelOffset + 2] = 59;
        rawData[pixelOffset + 3] = 255;
      } else {
        // Background deep forest green
        rawData[pixelOffset] = r;
        rawData[pixelOffset + 1] = g;
        rawData[pixelOffset + 2] = b;
        rawData[pixelOffset + 3] = a;
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // Helper to make PNG chunk with CRC
  function makeChunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii');
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length, 0);

    const toCrc = Buffer.concat([typeBuf, data]);
    const crc = calcCrc(toCrc);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc >>> 0, 0);

    return Buffer.concat([length, toCrc, crcBuf]);
  }

  // CRC32 implementation
  function calcCrc(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Deep Forest Green: #0f281e -> rgb(15, 40, 30)
const png192 = createPng(192, 192, 15, 40, 30);
const png512 = createPng(512, 512, 15, 40, 30);
const apple180 = createPng(180, 180, 15, 40, 30);

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), png512);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), png512);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), apple180);
console.log('Successfully generated PWA and Apple Touch icons!');

const fs = require('fs');
const { createCanvas } = require('canvas');

// Tạo thư mục assets
if (!fs.existsSync('assets')) {
  fs.mkdirSync('assets');
}

// Tạo icon.png (512x512)
const iconSize = 512;
const iconCanvas = createCanvas(iconSize, iconSize);
const iconCtx = iconCanvas.getContext('2d');
iconCtx.fillStyle = '#2196F3'; // Màu xanh
iconCtx.fillRect(0, 0, iconSize, iconSize);
iconCtx.fillStyle = '#FFFFFF';
iconCtx.font = 'bold 200px Arial';
iconCtx.textAlign = 'center';
iconCtx.textBaseline = 'middle';
iconCtx.fillText('FE', iconSize/2, iconSize/2);
fs.writeFileSync('assets/icon.png', iconCanvas.toBuffer('image/png'));

// Tạo adaptive-icon.png (1024x1024)
const adaptiveSize = 1024;
const adaptiveCanvas = createCanvas(adaptiveSize, adaptiveSize);
const adaptiveCtx = adaptiveCanvas.getContext('2d');
adaptiveCtx.fillStyle = '#2196F3';
adaptiveCtx.fillRect(0, 0, adaptiveSize, adaptiveSize);
adaptiveCtx.fillStyle = '#FFFFFF';
adaptiveCtx.font = 'bold 400px Arial';
adaptiveCtx.textAlign = 'center';
adaptiveCtx.textBaseline = 'middle';
adaptiveCtx.fillText('FE', adaptiveSize/2, adaptiveSize/2);
fs.writeFileSync('assets/adaptive-icon.png', adaptiveCanvas.toBuffer('image/png'));

// Tạo favicon.png (32x32)
const faviconSize = 32;
const faviconCanvas = createCanvas(faviconSize, faviconSize);
const faviconCtx = faviconCanvas.getContext('2d');
faviconCtx.fillStyle = '#2196F3';
faviconCtx.fillRect(0, 0, faviconSize, faviconSize);
faviconCtx.fillStyle = '#FFFFFF';
faviconCtx.font = 'bold 16px Arial';
faviconCtx.textAlign = 'center';
faviconCtx.textBaseline = 'middle';
faviconCtx.fillText('FE', faviconSize/2, faviconSize/2);
fs.writeFileSync('assets/favicon.png', faviconCanvas.toBuffer('image/png'));

console.log('✅ Đã tạo xong assets!');
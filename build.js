import { exec } from 'child_process';

console.log('🚀 Starting build process with vite...');

// استخدام npm run لتجاوز مشكلة الصلاحيات
exec('npm exec -- vite build', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Build failed: ${error.message}`);
    process.exit(1);
  }
  if (stderr) {
    console.warn(`⚠️ Warnings:\n${stderr}`);
  }
  console.log(`✅ Build succeeded:\n${stdout}`);
});
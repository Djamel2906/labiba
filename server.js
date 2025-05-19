import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// مثال على نقطة نهاية API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'مرحبا من الخادم!' });
});

// تقديم ملفات dist الثابتة
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

// إعادة توجيه جميع الطلبات إلى index.html (لـ SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
});
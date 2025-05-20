import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// تقديم ملفات dist الثابتة
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

// نقطة نهاية API (مثال)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// إعادة توجيه كل الطلبات إلى index.html (لـ SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
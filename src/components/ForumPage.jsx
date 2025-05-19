import React, { useState } from 'react';

export default function ForumPage() {
  const [posts, setPosts] = useState([
    { id: 1, title: "كيف أطور مهاراتي في التعبير الكتابي؟", author: "لمياء", replies: 5 },
    { id: 2, title: "طلب مساعدة في تمرين حول الفاعل والمفعول", author: "خالد", replies: 3 },
    { id: 3, title: "مراجعة دروس النحو - تلخيص مبسط", author: "أمينة", replies: 7 },
  ]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || author.trim() === '') return;
    const newPost = {
      id: posts.length + 1,
      title,
      author,
      replies: 0,
    };
    setPosts([newPost, ...posts]);
    setTitle('');
    setAuthor('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">منتدى لبيّة</h1>

        {/* نموذج إضافة موضوع */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="عنوان الموضوع"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-blue-300 p-3 rounded"
          />
          <input
            type="text"
            placeholder="اسمك"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-blue-300 p-3 rounded"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
          >
            نشر الموضوع
          </button>
        </form>

        {/* قائمة المواضيع */}
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition"
            >
              <h2 className="text-xl font-semibold text-blue-700">{post.title}</h2>
              <p className="text-sm text-gray-600">
                👤 {post.author} — 💬 {post.replies} ردود
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

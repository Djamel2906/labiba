// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage         from './components/HomePage';
import ChatPage from './components/ChatPage';
import VoiceChatPage from './components/VoiceChatPage';
import ForumPage from './components/ForumPage';
import LessonsPage from './components/LessonsPage';
import GamesPage        from './components/GamesPage';
import ScrambleGame     from './components/games/ScrambleGame';
import FillBlankGame    from './components/games/FillBlankGame';
import MatchSynonymGame from './components/games/MatchSynonymGame';
import WordSearchGame   from './components/games/WordSearchGame';
// … بقية الاستيرادات

export default function App() {
  return (
    <Routes>
      {/* الصفحة الرئيسية */}
        <Route path="/" element={<HomePage />} />
        <Route path="/text-chat" element={<ChatPage />} />
        <Route path="/voice-chat" element={<VoiceChatPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/lessons" element={<LessonsPage />} />

      {/* صفحة قائمة الألعاب */}
      <Route path="/games" element={<GamesPage />} />

      {/* مسارات الألعاب الفردية */}
      <Route path="/games/scramble"      element={<ScrambleGame />} />
      <Route path="/games/fill-blank"    element={<FillBlankGame />} />
      <Route path="/games/match-synonym" element={<MatchSynonymGame />} />
      <Route path="/games/word-search"   element={<WordSearchGame />} />

      {/* … مسارات بقية الأقسام … */}

      {/* أخيراً: صفحة 404 بدلاً من إعادة التوجيه للـ HomePage */}
      <Route path="*" element={<h2 className="p-8 text-center">هذه الصفحة غير موجودة.</h2>} />
    </Routes>
  );
}

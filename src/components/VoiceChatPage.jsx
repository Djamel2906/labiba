import React, { useState, useEffect, useRef } from "react";
export default function VoiceChatPage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [conv, setConv] = useState([]);
  const [err, setErr] = useState(null);
  const recRef = useRef(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setErr("متصفحك لا يدعم التحويل");
      return;
    }
    const r = new SR();
    r.lang = "ar-AR";
    recRef.current = r;
    r.onresult = e => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      send(text);
    };
    r.onend = () => setListening(false);
    r.onerror = () => {
      setErr("لم يتم التعرف على الصوت");
      setListening(false);
    };
  }, []);

  function toggle() {
    if (!recRef.current) return;
    if (!listening) {
      setTranscript(""); setErr(null);
      recRef.current.start(); setListening(true);
    } else {
      recRef.current.stop(); setListening(false);
    }
  }

  async function send(text) {
    setConv(c => [...c, { role:"user", content:text }]);
    try {
      const res = await fetch("/api/voice", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ message:text })
      });
      if (!res.ok) throw new Error();
      const { reply } = await res.json();
      setConv(c => [...c, { role:"assistant", content:reply }]);
      const u = new SpeechSynthesisUtterance(reply);
      u.lang = "ar-AR"; window.speechSynthesis.speak(u);
    } catch {
      setErr("خطأ في الاتصال");
    }
  }

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-3xl mb-4">الدردشة الصوتية</h2>
      <button
        onClick={toggle}
        className={`px-6 py-3 rounded-full mb-4 ${listening?"bg-red-500":"bg-green-500"} text-white`}
      >
        {listening?"🛑 إيقاف":"🎤 اضغط للتحدث"}
      </button>
      {transcript && (
        <div className="bg-blue-100 p-3 rounded mb-2 max-w-xl mx-auto text-right">
          <strong>سمعتك:</strong> {transcript}
        </div>
      )}
      {err && <p className="text-red-600 mb-4">⚠️ {err}</p>}
      <div className="bg-white p-4 rounded shadow max-w-xl mx-auto space-y-2" style={{maxHeight:300, overflow:"auto"}}>
        {conv.map((m,i)=>(
          <div key={i} className={`p-2 rounded ${m.role==="user"?"bg-blue-100 text-right":"bg-gray-200 text-left"}`}>
            {m.content}
          </div>
        ))}
      </div>
    </div>
  );
}

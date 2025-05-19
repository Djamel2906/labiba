import { useState } from "react";
export default function ChatPage() {
  const [msg, setMsg] = useState("");
  const [conv, setConv] = useState([]);
  const [err, setErr] = useState(null);

  const send = async () => {
    if (!msg.trim()) return;
    setConv(c => [...c, { role: "user", content: msg }]);
    setErr(null);
    try {
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ message: msg })
      });
      if (!res.ok) throw new Error(res.status);
      const { reply } = await res.json();
      setConv(c => [...c, { role: "assistant", content: reply }]);
    } catch {
      setErr("حدث خطأ في الاتصال");
    }<div className="min-h-screen p-6"></div>
    setMsg("");
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-3xl mb-4">الدردشة النصية</h2>
      <div className="space-y-2 mb-4 max-w-xl mx-auto">
        {conv.map((m,i) => (
          <div key={i} className={`p-3 rounded ${m.role==="user"?"bg-blue-100 text-right":"bg-gray-200 text-left"}`}>
            {m.content}
          </div>
        ))}
      </div>
      {err && <p className="text-red-600 mb-2">⚠️ {err}</p>}
      <div className="flex max-w-xl mx-auto">
        <input
          className="flex-1 p-2 border rounded-l"
          placeholder="اكتب رسالتك..."
          value={msg}
          onChange={e => setMsg(e.target.value)}
        />
        <button
          onClick={send}
          className="px-4 bg-blue-600 text-white rounded-r"
        >إرسال</button>
      </div>
    </div>
  );
}

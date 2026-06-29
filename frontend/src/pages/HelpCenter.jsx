import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  { q: 'How does the AI create itineraries?', a: 'Lumina utilizes destination meta-data, weather forecasts, and customized filters (like vibe and budget) to craft tailored, hour-by-hour schedules.' },
  { q: 'Can I link my real booking codes?', a: 'Yes! Navigate to Travel Documents, upload your flight or hotel PDF tickets, and our engine automatically parses confirmation keys to plot your calendar.' },
  { q: 'What is the Eco Score rating?', a: 'Lumina assesses your transportation modes (rail, flight, walking) and hotel sustainability certifications to generate an eco-friendly score.' },
];

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [bugDesc, setBugDesc] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'AI Agent', msg: 'Hi there! I am your Lumina Support Assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const submitBug = (e) => {
    e.preventDefault();
    if (!bugDesc) return;
    alert("Bug report received. Thank you! Our dev team is checking the stack trace.");
    setBugDesc('');
  };

  const sendSupportChat = (e) => {
    e.preventDefault();
    if (!chatInput) return;
    const userMsg = { sender: 'You', msg: chatInput };
    setChatLog(prev => [...prev, userMsg]);
    setChatInput('');

    // AI automatic support reply
    setTimeout(() => {
      let reply = "I've logged your request. One of our support managers will reach out to your profile email address within 15 minutes.";
      if (chatInput.toLowerCase().includes('flight') || chatInput.toLowerCase().includes('ticket')) {
        reply = "For flight confirmation updates, check the Booking History page. If details mismatch, try re-uploading the PDF under Travel Documents.";
      }
      setChatLog(prev => [...prev, { sender: 'AI Agent', msg: reply }]);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Lumina Help Center
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Find instant answers to FAQs, test issues with our AI support bot, or submit bug reports.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">quiz</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center font-bold text-slate-900 dark:text-white text-sm cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-slate-400">
                    {openFaq === idx ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-900 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Submit Bug Form */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display">
              Report a Bug / Provide Feedback
            </h3>
            <form onSubmit={submitBug} className="space-y-4">
              <textarea
                placeholder="Help us improve. Describe what went wrong, including page names or buttons clicked."
                rows="4"
                value={bugDesc}
                onChange={e => setBugDesc(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-850 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
              >
                Send Report
              </button>
            </form>
          </div>
        </div>

        {/* Live Chat Box */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[450px] relative">
          <div className="border-b border-slate-100 dark:border-slate-700/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Lumina Support Chat
              </h3>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Average wait: Under 2 mins</p>
          </div>

          {/* Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1 text-xs">
            {chatLog.map((log, index) => (
              <div
                key={index}
                className={`flex flex-col ${log.sender === 'You' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[9px] text-slate-400 font-bold mb-0.5">{log.sender}</span>
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    log.sender === 'You'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-800'
                  }`}
                >
                  {log.msg}
                </div>
              </div>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={sendSupportChat} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask anything..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl w-9 h-9 flex items-center justify-center cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-sm font-bold">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

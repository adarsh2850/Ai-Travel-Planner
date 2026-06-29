import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_DOCUMENTS = [
  {
    id: 1,
    title: 'Passport Copy (Adarsh)',
    type: 'Passport',
    fileName: 'passport_adarsh_2026.pdf',
    date: 'Uploaded Dec 01, 2026',
    icon: 'passport',
    iconColor: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
  },
  {
    id: 2,
    title: 'Goa Indigo Flight E-Ticket',
    type: 'Flight Ticket',
    fileName: 'flight_ticket_del_goi.pdf',
    date: 'Uploaded Dec 05, 2026',
    icon: 'airplane_ticket',
    iconColor: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400',
  },
  {
    id: 3,
    title: 'Windermere Resort Confirmation Voucher',
    type: 'Hotel Voucher',
    fileName: 'hotel_voucher_munnar.pdf',
    date: 'Uploaded Dec 06, 2026',
    icon: 'hotel_class',
    iconColor: 'bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400',
  },
  {
    id: 4,
    title: 'Travel Insurance Certificate',
    type: 'Insurance',
    fileName: 'tata_aig_travel_ins.pdf',
    date: 'Uploaded Dec 02, 2026',
    icon: 'health_and_safety',
    iconColor: 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400',
  },
];

export default function TravelDocuments() {
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState('Passport');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile({ name: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB' });
    }
  };

  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!docTitle || !uploadedFile) return;

    const newDoc = {
      id: Date.now(),
      title: docTitle,
      type: docType,
      fileName: uploadedFile.name,
      date: 'Uploaded Today',
      icon: docType === 'Passport' ? 'passport' :
            docType === 'Flight Ticket' ? 'airplane_ticket' :
            docType === 'Hotel Voucher' ? 'hotel_class' : 'health_and_safety',
      iconColor: docType === 'Passport' ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600' :
                 docType === 'Flight Ticket' ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600' :
                 docType === 'Hotel Voucher' ? 'bg-teal-50 dark:bg-teal-950/30 text-teal-600' : 'bg-rose-50 dark:bg-rose-950/30 text-rose-600',
    };

    setDocuments([newDoc, ...documents]);
    setDocTitle('');
    setUploadedFile(null);
  };

  const handleDelete = (id) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const downloadPdf = (doc) => {
    alert(`Downloading document "${doc.fileName}" in PDF format.`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Travel Documents Vault
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Secure cloud storage for passport copies, visa files, boarding tickets, and insurance receipts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-4">
            Upload Document
          </h3>
          <form onSubmit={handleAddDoc} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Document Label
              </label>
              <input
                type="text"
                placeholder="e.g. Goa Boarding Pass"
                value={docTitle}
                onChange={e => setDocTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Document Type
              </label>
              <select
                value={docType}
                onChange={e => setDocType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
              >
                {['Passport', 'Visa', 'Flight Ticket', 'Hotel Voucher', 'Insurance'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Choose PDF or Image
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center justify-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-4 py-4 rounded-xl border border-dashed border-indigo-200 dark:border-indigo-900/60 text-xs font-bold cursor-pointer transition-all hover:bg-indigo-100/60 text-center">
                  <span className="material-symbols-outlined text-lg">upload_file</span>
                  <span>{uploadedFile ? 'Change File' : 'Click to Upload PDF'}</span>
                  <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} className="hidden" />
                </label>
                {uploadedFile && (
                  <p className="text-[10px] text-slate-400 font-mono mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    Selected: {uploadedFile.name} ({uploadedFile.size})
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Add to Vault
            </button>
          </form>
        </div>

        {/* Documents vault list */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">cloud_done</span>
            My Uploaded Files
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence initial={false}>
              {documents.map(doc => (
                <motion.div
                  layout
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-all duration-200 relative group"
                >
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${doc.iconColor}`}>
                    <span className="material-symbols-outlined text-xl">{doc.icon}</span>
                  </div>

                  {/* Body details */}
                  <div className="flex-1 min-w-0 pr-6">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                      {doc.type}
                    </span>
                    <h4 className="text-xs font-bold text-slate-950 dark:text-white font-display mt-0.5 leading-snug truncate">
                      {doc.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                      {doc.fileName}
                    </p>
                    <div className="flex items-center gap-2 mt-3.5 flex-wrap">
                      <button
                        onClick={() => downloadPdf(doc)}
                        className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs">download</span>
                        Download
                      </button>
                      <span className="text-slate-200 dark:text-slate-700 text-xs">|</span>
                      <span className="text-[9px] text-slate-400">{doc.date}</span>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-slate-350 hover:text-red-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors opacity-0 group-hover:opacity-100 absolute top-3 right-3"
                    title="Delete document"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">close</span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

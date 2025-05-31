import React, { useState, useEffect } from 'react';
import { FaFolder, FaFolderPlus, FaUpload, FaStar, FaEllipsisV } from 'react-icons/fa';
import { useLoading, Oval } from '@agney/react-loading';
import FolderFilesModal from './FolderFilesModal';

const API_BASE = 'https://lawserver-api-1c4073257400.herokuapp.com';

export default function FileManager() {
  const [caseFolders, setCaseFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval width="40" />, 
  });

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/folders`);
        const data = await res.json();
        setCaseFolders(data.folders || []);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch folders", error);
        setLoading(false);
      }
    };
    fetchFolders();
  }, []);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/api/folders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newFolderName.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setCaseFolders([...caseFolders, { id: data.id, name: newFolderName.trim(), size: '0 Mb', files: 0 }]);
        setUploadedFiles({ ...uploadedFiles, [newFolderName.trim()]: [] });
        setNewFolderName('');
      }
    } catch (err) {
      console.error('❌ Create folder failed:', err);
    }
  };

  const handleFileUpload = async (e, folder) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append('case_folder', folder.id);
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('❌ Upload failed with status:', res.status, data);
        alert(data.error || 'Upload failed');
        return;
      }

      if (data.success) {
        setUploadedFiles((prev) => ({
          ...prev,
          [folder.name]: [...(prev[folder.name] || []), { url: data.url, name: data.name }],
        }));

        setCaseFolders((folders) =>
          folders.map((f) =>
            f.id === folder.id ? { ...f, files: (f.files || 0) + 1 } : f
          )
        );
      }
    } catch (err) {
      console.error('❌ File upload exception:', err);
      alert('เกิดข้อผิดพลาดระหว่างอัปโหลด');
    }
  };

  const handleOpenFolder = async (folder) => {
    setActiveFolder(folder);
    setShowModal(true);
  
    try {
      const res = await fetch(`${API_BASE}/api/files?folder_id=${folder.id}`);
      const data = await res.json();
  
      if (data.success) {
        // ✅ เก็บไฟล์ลง state
        setUploadedFiles((prev) => ({
          ...prev,
          [folder.name]: data.files || [],
        }));
  
        // ✅ อัปเดตจำนวนไฟล์ใน state caseFolders
        setCaseFolders((prevFolders) =>
          prevFolders.map((f) =>
            f.id === folder.id ? { ...f, files: data.files.length } : f
          )
        );
      }
    } catch (err) {
      console.error('❌ Failed to fetch files:', err);
    }
  };
  
  

  return (
    <div className="p-6 font-prompt">
      <h1 className="text-2xl font-bold mb-4">จัดการไฟล์คดี</h1>

      <div className="mb-6 flex gap-2 items-center">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="ระบุชื่อโฟลเดอร์ (เช่น คดีที่ 001)"
          className="border rounded px-3 py-2 text-sm w-64"
        />
        <button
          onClick={handleCreateFolder}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <FaFolderPlus /> สร้างโฟลเดอร์
        </button>
      </div>

      {loading ? (
        <div {...containerProps} className="flex justify-center items-center h-40">
          {indicatorEl}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {caseFolders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => handleOpenFolder(folder)}
              className="bg-white p-4 rounded-lg border hover:shadow cursor-pointer transition group"
            >
              <div className="flex justify-between items-start mb-3">
                <FaFolder className="text-yellow-400 text-3xl" />
                <div className="flex gap-2">
                  {folder.starred
                    ? <FaStar className="text-yellow-500" />
                    : <FaStar className="text-gray-300" />}
                  <FaEllipsisV className="text-gray-400 group-hover:text-gray-600" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 mb-1 truncate w-4/5">{folder.name}</h3>
                <label className="text-xs text-blue-500 hover:underline cursor-pointer">
                  <FaUpload className="inline mr-1" />
                  <input
                    type="file"
                    className="hidden"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFileUpload(e, folder)}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">
                {folder.size || '-'} · {folder.files} ไฟล์
              </p>
            </div>
          ))}
        </div>
      )}

      {showModal && activeFolder && (
        <FolderFilesModal
          folderName={activeFolder.name}
          files={uploadedFiles[activeFolder.name] || []}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

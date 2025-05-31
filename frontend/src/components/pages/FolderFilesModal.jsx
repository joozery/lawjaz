import React from 'react';

export default function FolderFilesModal({ folderName, files, onClose }) {
  const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  const isPDF = (url) => /\.pdf$/i.test(url);
  const isWord = (url) => /\.(doc|docx)$/i.test(url);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">ไฟล์ในโฟลเดอร์: {folderName}</h2>

        {files.length > 0 ? (
          <ul className="space-y-4">
            {files.map((file, index) => (
              <li key={index} className="border rounded p-2">
                <div className="mb-2 font-medium text-sm">{file.name}</div>

                {/* 🔍 Preview Section */}
                {isImage(file.url) ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-auto max-h-48 object-contain rounded border"
                  />
                ) : isPDF(file.url) ? (
                  <iframe
                    src={file.url}
                    title={file.name}
                    className="w-full h-48 border rounded"
                  />
                ) : isWord(file.url) ? (
                  <div className="text-blue-700 text-sm italic">📄 ไฟล์เอกสาร Word ไม่สามารถแสดงตัวอย่างได้</div>
                ) : (
                  <div className="text-gray-500 text-sm italic">ไม่รองรับพรีวิวไฟล์นี้</div>
                )}

                {/* 🔗 Link */}
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                >
                  🔗 ดู/ดาวน์โหลดไฟล์
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">ไม่มีไฟล์ในโฟลเดอร์นี้</p>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
        >
          ปิดหน้าต่าง
        </button>
      </div>
    </div>
  );
}

import React, { useState, useRef } from 'react';

export interface NewCharacterData {
  name: string;
  description: string;
  hobby: string;
  imageFile: File;
}

interface AdminPanelProps {
  onAddCharacter: (character: NewCharacterData) => Promise<void>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddCharacter }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hobby, setHobby] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setHobby('');
    setImageFile(null);
    setImagePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !hobby || !imageFile) {
      setError('所有欄位（包含大頭照）皆為必填！');
      return;
    }
    setError('');
    setIsUploading(true);
    try {
        await onAddCharacter({ name, description, hobby, imageFile });
        resetForm();
    } catch (err) {
        setError('新增失敗，請稍後再試。');
        console.error(err);
    } finally {
        setIsUploading(false);
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-inner border border-blue-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">新增人物</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">姓名</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="例如：陳大文"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">描述</label>
                  <textarea
                    id="description"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="一句話形容這個人..."
                  />
                </div>
                <div>
                    <label htmlFor="hobby" className="block text-sm font-medium text-gray-700 dark:text-gray-300">興趣 / 專長</label>
                    <input
                      type="text"
                      id="hobby"
                      value={hobby}
                      onChange={(e) => setHobby(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="例如：打程式、彈吉他"
                    />
                </div>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">大頭照</label>
                 <div className="mt-1 w-full flex justify-center items-center">
                    <div className="w-40 h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-center text-gray-400 p-1">
                        {imagePreview ? (
                            <img src={imagePreview} alt="預覽" className="h-full w-full object-cover rounded-md" />
                        ) : (
                            <span>預覽區域</span>
                        )}
                    </div>
                </div>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-2 w-40 text-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg">
                    選擇圖片
                </button>
            </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:bg-green-400 disabled:cursor-not-allowed"
        >
          {isUploading ? '新增中...' : '新增到班級'}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
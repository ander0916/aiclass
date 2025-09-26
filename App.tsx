
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AdminPanel, { NewCharacterData } from './components/AdminPanel';
import CharacterGrid from './components/CharacterGrid';
import LoginModal from './components/LoginModal';
import { Character } from './types';
import { db, auth, storage } from './firebase';
import { ref, onValue, push, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Listen for database changes
    const charactersRef = ref(db, 'characters/');
    const unsubscribeDb = onValue(charactersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedCharacters = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...(value as Omit<Character, 'id'>),
        }));
        setCharacters(loadedCharacters.reverse()); // Show newest first
      } else {
        setCharacters([]);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDb();
    };
  }, []);

  const handleAuthButtonClick = () => {
    if (user) {
      signOut(auth);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleAddCharacter = async (newCharacterData: NewCharacterData) => {
    const { name, description, hobby, imageFile } = newCharacterData;

    // 1. Upload image to Firebase Storage
    const imageStorageRef = storageRef(storage, `character_images/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(imageStorageRef, imageFile);
    
    // 2. Get the public URL
    const imageUrl = await getDownloadURL(snapshot.ref);

    // 3. Create character object and save to Realtime Database
    const newCharacter: Omit<Character, 'id'> = {
      name,
      description,
      hobby,
      imageUrl,
    };
    const charactersListRef = ref(db, 'characters');
    const newCharacterRef = push(charactersListRef);
    await set(newCharacterRef, newCharacter);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <Header isLoggedIn={!!user} onAuthButtonClick={handleAuthButtonClick} />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />

      <main className="container mx-auto px-6 py-8">
        {user && (
          <div className="mb-8">
            <AdminPanel onAddCharacter={handleAddCharacter} />
          </div>
        )}
        <CharacterGrid characters={characters} />
      </main>
      <footer className="text-center py-4 mt-8 text-gray-500 dark:text-gray-400 text-sm">
        <p className="mb-2">Power By 徐安德</p>
        <div className="flex justify-center space-x-4">
            <a href="https://www.instagram.com/hsu.x1/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Instagram</a>
            <a href="https://www.youtube.com/@7xozx_09/featured" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">YouTube</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
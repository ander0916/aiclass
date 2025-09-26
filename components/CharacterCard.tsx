import React from 'react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
      <div className="relative">
        <img className="w-full h-56 object-cover" src={character.imageUrl} alt={character.name} />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{character.name}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300 h-12">{character.description}</p>
        <div className="mt-4">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">興趣 / 專長：</span>
            <p className="text-gray-800 dark:text-gray-200">{character.hobby}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

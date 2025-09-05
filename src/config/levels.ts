import { LevelConfig } from '@/types/tetris';

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: 'Beginner',
    fallSpeed: 1000, // 1 second between drops
    linesToClear: 10,
    scoreMultiplier: 1,
  },
  {
    id: 2,
    name: 'Easy',
    fallSpeed: 800,
    linesToClear: 15,
    scoreMultiplier: 1.2,
  },
  {
    id: 3,
    name: 'Medium',
    fallSpeed: 600,
    linesToClear: 20,
    scoreMultiplier: 1.5,
  },
  {
    id: 4,
    name: 'Hard',
    fallSpeed: 400,
    linesToClear: 25,
    scoreMultiplier: 2,
  },
  {
    id: 5,
    name: 'Expert',
    fallSpeed: 300,
    linesToClear: 30,
    preFilledRows: 2,
    scoreMultiplier: 2.5,
  },
  {
    id: 6,
    name: 'Insane',
    fallSpeed: 200,
    linesToClear: 35,
    preFilledRows: 4,
    scoreMultiplier: 3,
  },
  {
    id: 7,
    name: 'Nightmare',
    fallSpeed: 150,
    linesToClear: 40,
    preFilledRows: 6,
    scoreMultiplier: 4,
  },
  {
    id: 8,
    name: 'Impossible',
    fallSpeed: 100,
    linesToClear: 50,
    preFilledRows: 8,
    scoreMultiplier: 5,
  },
];

export const getLevelById = (id: number): LevelConfig | undefined => {
  return LEVELS.find(level => level.id === id);
};

export const getNextLevel = (currentLevel: number): LevelConfig | undefined => {
  const currentIndex = LEVELS.findIndex(level => level.id === currentLevel);
  if (currentIndex !== -1 && currentIndex < LEVELS.length - 1) {
    return LEVELS[currentIndex + 1];
  }
  return undefined;
};
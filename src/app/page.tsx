'use client';

import React, { useState } from 'react';
import Welcome from '@/pages/Welcome';
import Settings from '@/pages/Settings';
import Game from '@/pages/Game';
import { NavigationContext } from '@/hooks/use-navigate';

type GameStatus = 'welcome' | 'settings' | 'game';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameStatus>('welcome');

  const navigate = (path: string) => {
    switch (path) {
      case '/':
        setCurrentScreen('welcome');
        break;
      case '/settings':
        setCurrentScreen('settings');
        break;
      case '/game':
        setCurrentScreen('game');
        break;
      default:
        setCurrentScreen('welcome');
    }
  };

  return (
    <NavigationContext.Provider value={navigate}>
      {currentScreen === 'welcome' && <Welcome />}
      {currentScreen === 'settings' && <Settings />}
      {currentScreen === 'game' && <Game />}
    </NavigationContext.Provider>
  );
}
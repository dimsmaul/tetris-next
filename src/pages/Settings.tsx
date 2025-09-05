'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GameSettings, GameTheme } from '@/types/tetris';
import { LEVELS } from '@/config/levels';
import { useNavigate } from '@/hooks/use-navigate';

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<GameSettings>({
    startingLevel: 1,
    theme: 'classic',
    soundEnabled: true,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('tetris-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('tetris-settings', JSON.stringify(settings));
    navigate('/game');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-black border-4 border-cyan-400 p-6 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-6 tracking-wider">
          SETTINGS
        </h1>

        <div className="space-y-6">
          {/* Starting Level */}
          <Card className="bg-gray-900 border-2 border-cyan-600">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-lg">Starting Level</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={settings.startingLevel.toString()}
                onValueChange={(value) => setSettings(prev => ({ ...prev, startingLevel: parseInt(value) }))}
                className="space-y-2"
              >
                {LEVELS.slice(0, 5).map((level) => (
                  <div key={level.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={level.id.toString()}
                      id={`level-${level.id}`}
                      className="border-cyan-400 text-cyan-400"
                    />
                    <Label htmlFor={`level-${level.id}`} className="text-gray-300">
                      Level {level.id} - {level.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Theme Selection */}
          <Card className="bg-gray-900 border-2 border-cyan-600">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-lg">Block Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={settings.theme}
                onValueChange={(value) => setSettings(prev => ({ ...prev, theme: value as GameTheme }))}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="classic"
                    id="theme-classic"
                    className="border-cyan-400 text-cyan-400"
                  />
                  <Label htmlFor="theme-classic" className="text-gray-300">
                    Classic (Original Colors)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="neon"
                    id="theme-neon"
                    className="border-cyan-400 text-cyan-400"
                  />
                  <Label htmlFor="theme-neon" className="text-gray-300">
                    Neon (Bright Colors)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="pastel"
                    id="theme-pastel"
                    className="border-cyan-400 text-cyan-400"
                  />
                  <Label htmlFor="theme-pastel" className="text-gray-300">
                    Pastel (Soft Colors)
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Sound Settings */}
          <Card className="bg-gray-900 border-2 border-cyan-600">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-lg">Sound Effects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="sound-toggle"
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, soundEnabled: checked }))}
                  className="data-[state=checked]:bg-cyan-400"
                />
                <Label htmlFor="sound-toggle" className="text-gray-300">
                  {settings.soundEnabled ? 'Enabled' : 'Disabled'}
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              onClick={handleBack}
              className="flex-1 h-12 bg-gray-600 hover:bg-gray-700 text-white font-bold border-4 border-gray-400 rounded-none"
              style={{ boxShadow: '0 4px 0 #374151' }}
            >
              BACK
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-12 bg-green-500 hover:bg-green-600 text-black font-bold border-4 border-green-300 rounded-none"
              style={{ boxShadow: '0 4px 0 #166534' }}
            >
              SAVE & PLAY
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
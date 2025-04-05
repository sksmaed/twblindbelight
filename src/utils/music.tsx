'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { Howl } from "howler";

interface MusicContextType {
  sound: Howl | null;
  stopMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const bgMusic = new Howl({
      src: ["/background_music.mp3"],
      loop: true,
      volume: 1.0,
    });
    
    setSound(bgMusic);
    bgMusic.play();

    return () => {
      bgMusic.stop();
    };
  }, []);

  const stopMusic = () => {
    if (sound) {
      sound.stop();
    }
  };

  return (
    <MusicContext.Provider value={{ sound, stopMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic 必須在 MusicProvider 內使用");
  }
  return context;
};

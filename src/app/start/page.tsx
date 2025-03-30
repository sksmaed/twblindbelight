'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMusic } from "@/utils/music"; 

import { BackgroundImage } from "@/data/bg_img.js";

const StartPage = () => {
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const router = useRouter();
  useMusic();

  useEffect(() => {
    setIsFadingIn(false);
  }, []);

  const handleStartClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      router.push("/game");
    }, 500);
  };

  return (
    <div 
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center transition-opacity duration-500"
      style={{ backgroundImage: `url(${BackgroundImage["start_page"]})`, fontFamily: "'Noto Serif TC', serif" }}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-500 ${
          isFadingIn ? "opacity-100 pointer-events-auto" : isFadingOut ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } z-50`}
      />

      <button
        onClick={handleStartClick}
        className="absolute bottom-[10%] px-10 py-5 text-white text-2xl font-bold rounded-lg transition-transform w-[50%] max-w-[500px] duration-300 cursor-pointer hover:scale-105"
        style={{ backgroundColor: "#001419" }}
      >
        Start
      </button>
    </div>
  );
};

export default StartPage;

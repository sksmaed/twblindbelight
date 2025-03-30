"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FullscreenNotice = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        router.push("/start");
      }, 2000);
    }, 1000);
  }, [router]);

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center text-white text-center transition-opacity duration-3000 ${
        isFadingOut ? "opacity-100" : "opacity-100"
      }`}
      style={{ 
        fontSize: "clamp(20px, 2vw, 40px)", 
        letterSpacing: "0.1em" 
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <p 
          className={`absolute transition-opacity duration-2000 ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          電腦版使用者建議開啟全螢幕模式以獲得最佳遊戲體驗
        </p>

        <div 
          className={`absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-2000 ${
            isFadingOut ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

export default FullscreenNotice;

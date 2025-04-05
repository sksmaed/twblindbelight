'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMusic } from "@/utils/music"; 

const StartPage = () => {
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const router = useRouter();
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const originalImage = "封面.png";
  useMusic();

  useEffect(() => {
    const updateBackground = () => {
      const width = window.innerWidth;
  
      if (width < 750) {
        setBackgroundImage(`/mobile/${originalImage}`);
      } else {
        setBackgroundImage(`/${originalImage}`);
      }
    };

    window.addEventListener("resize", updateBackground);
    updateBackground();

    setIsFadingIn(false);

    return () => {
      window.removeEventListener("resize", updateBackground);
    };
  }, [backgroundImage]);


  const handleStartClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      router.push("/game");
    }, 1000);
  };

  return (
    <div 
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center transition-opacity duration-1000"
      style={{ backgroundImage: `url(${backgroundImage})`, fontFamily: "'Noto Serif TC', serif" }}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-1000 ${
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

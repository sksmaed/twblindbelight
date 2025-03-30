'use client'
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { EndingDescriptions } from "@/types/descriptions.js";
import { BackgroundImage } from "@/data/bg_img";
import { NextExhibitionURL } from "@/data/routes.js";
import { useMusic } from "@/utils/music";

const EndingPage = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const searchParams = useSearchParams();
  const endingKey = (searchParams?.get("scene") as keyof typeof BackgroundImage) || "";
  const router = useRouter();
  const [backgroundImage, setBackgroundImage] = useState<string>(`/${BackgroundImage[endingKey]}`);
  const { stopMusic } = useMusic();

  useEffect(() => {
    const updateBackground = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setBackgroundImage(`/mobile/${BackgroundImage[endingKey]}`);
      } else {
        setBackgroundImage(`/${BackgroundImage[endingKey]}`);
      }
    };

    window.addEventListener("resize", updateBackground);
    updateBackground();

      return () => {
        window.removeEventListener("resize", updateBackground);
      };
    }, [endingKey]);

  const handleNextExhibit = () => {
    setIsFadingOut(true);
    stopMusic();
    setTimeout(() => {
      router.push(NextExhibitionURL);
    }, 500);
  };

  return (
    <div 
      className="relative w-full min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center p-[2vw] transition-opacity duration-500"
      style={{ 
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <div 
        className={`absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-500 ${isFadingOut ? "opacity-100" : "opacity-0"} z-50`}
      />

      <div 
        className="absolute top-[15vh] text-center max-w-[80%] text-lg"
        style={{ 
          fontSize: "clamp(20px, 2vw, 160px)", 
          lineHeight: "clamp(1.5rem, 3vw, 3.5rem)",
          letterSpacing: "clamp(0.05em, 0.1vw, 0.2em)"
        }}
      >
        {EndingDescriptions[endingKey as keyof typeof EndingDescriptions]}
      </div>

      <button 
        onClick={handleNextExhibit}
        className="absolute bottom-[10vh] right-[5vw] transform w-[50%] max-w-[500px] mt-10 px-10 py-5 text-white text-xl rounded-lg transition-transform duration-300 hover:scale-105"
        style={{ 
            fontSize: "clamp(20px, 2vw, 28px)",
            backgroundColor: "#001419" }}
      >
        前往下個展間
      </button>
    </div>
  );
};

export default EndingPage;

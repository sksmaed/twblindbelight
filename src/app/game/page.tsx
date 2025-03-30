'use client'
import { useState } from "react";
import { ChoiceText, ChoicePosition } from "@/types/choices.js";
import { BackgroundImage } from "@/data/bg_img.js";
import { Descriptions } from "@/types/descriptions.js";
import { useRouter } from "next/navigation";
import { NextExhibitionURL } from "@/data/routes.js";
import { useMusic } from "@/utils/music";

const GamePage = () => {
  const [currentScene, setCurrentScene] = useState<keyof typeof ChoiceText>("scene_1");
  const [isFadingToBlack, setIsFadingToBlack] = useState(false);
  const router = useRouter();
  const { stopMusic } = useMusic();

  
  const handleClick = (nextScene: keyof typeof ChoiceText) => {
    setIsFadingToBlack(true);
      setTimeout(() => {
        if (nextScene.startsWith("ending_")) {
          router.push(`/ending?scene=${nextScene}`);
        } else {
          setCurrentScene(nextScene);
          setIsFadingToBlack(false);  
        }
      }, 500);
    };

  return (
    <div 
      className="relative w-full min-h-screen bg-cover bg-center text-white font-serif p-[2vw] transition-opacity duration-500"
      style={{ 
        backgroundImage: `url(/${BackgroundImage[currentScene]})`, 
        fontFamily: "'Noto Serif TC', serif" 
      }}
    >

      <div 
        className={`absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-500 
          ${isFadingToBlack ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} 
          z-50`}
      />

      <div 
        className="absolute top-[9%] left-[5vw] right-[5vw] p-[2vw] text-lg transition-colors duration-500"
        style={{ 
          fontSize: "clamp(18px, 1.9vw, 140px)", 
          color: isFadingToBlack ? "#000" : "#fff",
          lineHeight: "clamp(1.5rem, 3vw, 3.5rem)",
          letterSpacing: "clamp(0.05em, 0.1vw, 0.2em)",
          wordSpacing: "clamp(0.1em, 0.2vw, 0.4em)"
        }}
      >
        {Descriptions[currentScene]}
      </div>

      <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 flex flex-col items-center w-full max-w-[800px] space-y-[2vh]">
        {Object.entries(ChoiceText[currentScene]).map(([key, text]) => {
          const nextScene = ChoicePosition[currentScene][key as keyof typeof ChoicePosition[typeof currentScene]] as keyof typeof ChoiceText;

          return (
            <button
              key={key}
              onClick={(event) => {
                event.stopPropagation();
                if (isFadingToBlack) return;
                handleClick(nextScene);
              }}
              className="w-[80%] max-w-[800px] min-h-[10vh] py-[1vh] px-[2vw] rounded-lg flex items-center justify-center text-center transition-colors duration-500 cursor-pointer hover:scale-105"
              style={{ 
                fontSize: "clamp(16px, 1.5vw, 24px)", 
                backgroundColor: isFadingToBlack ? "#000" : "#001419", 
                color: isFadingToBlack ? "#000" : "#fff",
                lineHeight: "clamp(1.5rem, 3vw, 2.5rem)",
                letterSpacing: "clamp(0.05em, 0.1vw, 0.2em)"
              }}
            >
              {text}
            </button>
          );
        })}
      </div>

      <a href={NextExhibitionURL}>
        <button 
          className="absolute bottom-[3%] left-[3vw] transform w-[20%] max-w-[250px] h-[7vh] max-h-[6vh] rounded-lg flex items-center justify-center transition-colors duration-500 cursor-pointer hover:scale-105"
          onClick={() => {stopMusic();}}
          style={{ 
            fontSize: "clamp(10px, 1.2vw, 18px)", 
            backgroundColor: isFadingToBlack ? "#000" : "#001419", 
            color: isFadingToBlack ? "#000" : "#fff"
          }}
        >
          直接前往下個展間
        </button>
      </a>
    </div>
  );
};

export default GamePage;

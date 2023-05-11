import { useState, useEffect } from "react";

function getCurrentScreenWidth() {
  return window.innerWidth;
}

export function useResize(): { screenSize: number } {
  const [screenSize, setScreenSize] = useState(getCurrentScreenWidth());

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentScreenWidth());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);
  return { screenSize };
}

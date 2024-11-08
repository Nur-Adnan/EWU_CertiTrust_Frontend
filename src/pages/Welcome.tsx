import { useEffect, useState } from "react";
import "./Welcome.css";

function Welcome({
  title = "Welcome to the Dashboard",
  description = "Access courses, track progress, and stay updated through our student portal.",
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  return (
    <div className="flex flex-col items-center h-screen bg-cover bg-center text-center">
      <div
        className={`transform transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h1 className="mb-2 text-2xl font-bold md:text-4xl tracking-wide flex items-center justify-center">
          {title}
          <span
            className="ml-2 text-3xl md:text-5xl animate-wave mb-4"
            role="img"
            aria-label="waving hand"
          >
            👋
          </span>
        </h1>
        <p className="text-base mb-8 max-w-xl mx-auto drop-shadow-md tracking-wider leading-6">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Welcome;

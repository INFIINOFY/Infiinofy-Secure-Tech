import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollDownAnimation, setShowScrollDownAnimation] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const isFooterInView = footerRect.top < window.innerHeight;
        setShowScrollDownAnimation(!isFooterInView);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/50"
          aria-label="Scroll to top"
        >
          <DotLottieReact
            src="https://lottie.host/a8b2a8cc-3be7-4824-a595-bf85c909f986/SAYYGiBTHq.lottie"
            className="w-20 h-20"
            loop
            autoplay
          />
        </Button>
      )}
    </>
  );
};

export default ScrollToTop;

import React, { useState, useEffect } from 'react';

const ThumbnailCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let intervalId;
    
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentIndex, isAutoPlaying, images.length]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    // Pause auto-play temporarily when manually changing slides
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="space-y-2">
      {/* Main carousel */}
      <div className="relative h-96 overflow-hidden rounded-lg">
        {images.map((image, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out transform ${
              idx === currentIndex
                ? "opacity-100 translate-x-0"
                : idx < currentIndex
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <img
                src={image.src}
                alt={image.alt || `Slide ${idx + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {image.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent px-4 py-3 text-white">
                <h3 className="font-bold text-lg">{image.caption}</h3>
                {image.description && <p className="text-sm">{image.description}</p>}
              </div>
            )}
          </div>
        ))}

        {/* Navigation buttons */}
        <button
          onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Auto-play toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 z-10"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden focus:outline-none ${
              idx === currentIndex
                ? "ring-2 ring-blue-500"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <img
                src={image.src}
                alt={`Thumbnail ${idx + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
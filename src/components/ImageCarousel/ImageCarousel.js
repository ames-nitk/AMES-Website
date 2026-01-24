import React, { useState } from 'react';
import './ImageCarousel.css';
import fishImg from '../../assets/Fish.png';
import autoImg from '../../assets/auto.png';
import gapImg from '../../assets/gap.webp';
import trackImg from '../../assets/track.jpg';
import lakeImg from '../../assets/lake.jpeg';

const cards = [
  {
    title: 'Smart Fish Counting System',
    caption: 'Smart Fish Counting System',
    img: fishImg,
  },
  {
    title: 'Automation of Fish Breeding Systems',
    caption: 'Automation of Fish Breeding Systems',
    img: autoImg,
  },
  {
    title: 'Variable Gap Fish Sorting System',
    caption: 'Variable Gap Fish Sorting System',
    img: gapImg,
  },
  {
    title: 'Vehicle Tracking System',
    caption: 'Vehicle Tracking System',
    img: trackImg,
  },
  {
    title: 'NITK Lake Water Saving System',
    caption: 'NITK Lake Water Saving System',
    img: lakeImg,
  },
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getImageStyle = (index) => {
    const distance = index - currentIndex;
    const absDistance = Math.abs(distance);
    
    // Calculate rotation and scale based on distance from center
    let rotation = 0;
    let scale = 1;
    let translateX = 0;
    let zIndex = cards.length - absDistance;
    let opacity = 1;

    if (distance === 0) {
      // Central image
      scale = 1;
      rotation = 0;
      translateX = 0;
    } else if (distance > 0) {
      // Images to the right
      rotation = 8 * distance;
      scale = 1 - (0.15 * distance);
      translateX = Math.min(120 * distance, 400); // Limit max translation
      opacity = Math.max(0.3, 1 - (0.2 * distance));
    } else {
      // Images to the left
      rotation = 8 * distance;
      scale = 1 - (0.15 * Math.abs(distance));
      translateX = Math.max(120 * distance, -400); // Limit max translation
      opacity = Math.max(0.3, 1 - (0.2 * Math.abs(distance)));
    }

    // Limit the number of visible images on each side
    if (absDistance > 3) {
      opacity = 0;
      scale = 0;
    }

    return {
      transform: `translateX(${translateX}px) rotate(${rotation}deg) scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity,
    };
  };

  return (
    <div className="fanned-carousel-container">
      <div className="fanned-carousel-wrapper">
        <button 
          className="carousel-arrow carousel-arrow-left" 
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div className="fanned-carousel">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`carousel-photo ${index === currentIndex ? 'active' : ''}`}
              style={getImageStyle(index)}
            >
              <div className="photo-border">
                <img src={card.img} alt={card.title} className="photo-image" />
              </div>
              {index === currentIndex && (
                <div className="photo-caption">{card.caption}</div>
              )}
            </div>
          ))}
        </div>

        <button 
          className="carousel-arrow carousel-arrow-right" 
          onClick={goToNext}
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ImageCarousel;

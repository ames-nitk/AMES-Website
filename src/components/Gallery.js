
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Gallery = () => {
    const images = [
        '/img1.jpg',
        '/img2.jpg',
        '/img3.jpg'
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    return (
        <div id="gallery" style={{ padding: '2rem', backgroundColor: '#2a2a2a', color: '#fff' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Gallery</h2>
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index}>
                        <img src={src} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Gallery;

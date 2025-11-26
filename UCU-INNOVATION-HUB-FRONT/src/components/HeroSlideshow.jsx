import { useState, useEffect } from 'react';

const HeroSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        '/images/robotics_project.png',
        '/images/embedded_systems.png',
        '/images/software_development.png',
        '/images/iot_project.png',
        '/images/mobile_app_dev.png',
        '/images/ai_machine_learning.png'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="hero-slideshow">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentSlide ? 'active' : ''} ${index === (currentSlide - 1 + slides.length) % slides.length ? 'previous' : ''
                        }`}
                    style={{ backgroundImage: `url(${slide})` }}
                />
            ))}
        </div>
    );
};

export default HeroSlideshow;

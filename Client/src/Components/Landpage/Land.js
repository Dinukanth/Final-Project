import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Land.css';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
        { image: 'https://i.ibb.co/qCkd9jS/img1.jpg', name: 'Switzerland', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    ];

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
        <div className="container">
            <div className="slide">
                <div className="item" style={{ backgroundImage: `url(${items[currentIndex].image})` }}>
                    <div className="content">
                        <div className="name">{items[currentIndex].name}</div>
                        <div className="des">{items[currentIndex].description}</div>
                        <button>See More</button>
                    </div>
                </div>
            </div>

            <div className="button">
                <button className="prev" onClick={prev}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <button className="next" onClick={next}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </div>
    );
};

export default Slider;

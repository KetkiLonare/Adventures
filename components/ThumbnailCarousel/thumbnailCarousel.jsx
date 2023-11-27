import { NEXT_PUBLIC_APP_ASSET_URL } from '@/src/utlis/envConfig';
import React, { useState } from 'react'
import { Image } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const ThumbnailCarousel = ({ galleryImages }) => {
    const [images, setImages] = useState(galleryImages);
    const [currentImage, setCurrentImage] = useState(0);

    const handlePrevious = () => {
        setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
    };

    const handleNext = () => {
        setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    };


    const renderImages = () => {
        return images.map((image, index) => (
            <Image
                key={index}
                src={`${NEXT_PUBLIC_APP_ASSET_URL}${image?.image_file}`}
                alt={image.image_file}
                className={index === currentImage ? 'active' : ''}
                onClick={() => setCurrentImage(index)}
            />
        ));
    };



    return (
        <>
            <div className="carouselSliderMain">
                <button className="control-btn control-btn-1" onClick={handlePrevious}>
                    <FaAngleLeft />
                </button>
                <div className="main-image-container">
                    <Image src={`${NEXT_PUBLIC_APP_ASSET_URL}${images[currentImage]?.image_file}`} alt={images[currentImage]?.image_file} />
                </div>

                <button className="control-btn control-btn-2" onClick={handleNext}>
                    <FaAngleRight />
                </button>

                {/* <div className="controls">
                   
                </div> */}
            </div>
            <div className="carouselSlider">
                <div className="thumbnail-container">
                    {renderImages()}
                </div>
            </div>
        </>
    )
}

export default ThumbnailCarousel
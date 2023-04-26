import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-image-lightbox/style.css';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import styles from 'styles/JourneySection.module.css';
import "react-image-gallery/styles/css/image-gallery.css";

import 'animate.css';


const GallerySection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)


    const images = [
        {
            src: '/images/gallery/1pr.jpg',
            alt: 'No image',
        },
        {
            src: '/images/gallery/2pr.jpg',
            alt: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            src: '/images/gallery/3pr.jpg',
            alt: 'https://picsum.photos/id/1019/250/150/',
        },
        {
            src: '/images/gallery/4pr.jpg',
            alt: 'https://picsum.photos/id/1019/250/150/',
        },
        {
            src: '/images/gallery/5pr.jpg',
            alt: 'https://picsum.photos/id/1019/250/150/',
        },
        {
            src: '/images/gallery/6pr.jpg',
            alt: 'https://picsum.photos/id/1019/250/150/',
        },
        {
            src: '/images/gallery/7pr.jpg',
            alt: 'https://picsum.photos/id/1019/250/150/',
        }

    ];
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    const handleImageClick = (index) => {
        setSelectedImage(index);
        setLightboxOpen(true);
    };

    const settings = {

        centerMode: true,
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 400,
        padding: 50,
        centerPadding: "10px",
        swipeToSlide: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Box id="gallery" className={styles.section_bg}>
            <Box className={`px-5 mx-auto animate__animated animate__fadeInUp animate__delay-1s`}>
                <Box className={styles.section_header}>
                    <Typography variant='h2'>Gallery</Typography>
                    <Typography>Check our gallery from the recent Retreat</Typography>
                </Box>

                <Box>
                    <Slider
                        {...settings}
                        beforeChange={(oldIndex, newIndex) => {
                            setCurrentSlide(newIndex);
                        }}
                        customPaging={(index) => {
                            return (
                                <button className={
                                        index === currentSlide ? styles.bullet_active : styles.bullet
                                    }>
                                </button>
                            )
                        }
                        }

                    >

                        {images.map((image, index) => (

                            <Box key={index} sx={{ paddingTop: '2rem', paddingBottom: '2rem', paddingLeft: '12px', paddingRight:'12px' }}>
                                <img className={index === currentSlide ? styles.current_slide : ""} style={{ width:'100%' }} key={index} src={image.src} alt={image.alt} onClick={() => handleImageClick(index)} />
                            </Box>

                        ))}

                    </Slider>

                    {lightboxOpen && (
                        <Lightbox
                            mainSrc={images[selectedImage].src}
                            nextSrc={images[(selectedImage + 1) % images.length].src}
                            prevSrc={images[(selectedImage + images.length - 1) % images.length].src}
                            onCloseRequest={() => setLightboxOpen(false)}
                            onMovePrevRequest={() => setSelectedImage((selectedImage + images.length - 1) % images.length)}
                            onMoveNextRequest={() => setSelectedImage((selectedImage + 1) % images.length)}
                           
                            enableZoom= {false}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
}
GallerySection.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default GallerySection;
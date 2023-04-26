import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import styles from 'styles/HomeSection.module.css';
import 'animate.css';

const HomeSection = () => {

    return (
        <Box id="home" className={styles.hero}>
            <Box className={`${styles.hero_container} animate__animated animate__zoomIn animate__delay-1s`}>
                <Typography variant='h1' className="mb-4 pb-0">Ayahuasca Retreat Puerto Vallarta</Typography>
                <a href="#about" className={styles.about_btn }>About The Ayahuasca Retreat</a>
            </Box>
        </Box>
    );
}
HomeSection.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default HomeSection;
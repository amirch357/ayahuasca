import React from 'react';
import Header from './pages/header';
import { Box} from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import HomeSection from './pages/homeSection';
import ScheduleSection from './pages/scheduleSection';
import Footer from './pages/footer';
import ContactSection from './pages/contactSection';
import JourneySection from './pages/journeySection';
import GallerySection from './pages/gallerySection';
import HotelsSection from './pages/hotelsSection';


const HomePage = () => {
    return (
        
        <Box sx={{overflowY: 'auto'}}>
            <Header />
            <HomeSection />
            <ScheduleSection />
            <GallerySection />
            <HotelsSection />
            <JourneySection />
            <ContactSection />
            <Footer />
        </Box>
    );
}
HomePage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default HomePage;
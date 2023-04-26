import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import styles from 'styles/HotelsSection.module.css';
import { styled } from '@mui/material/styles'
import 'animate.css';
import { GoogleMap, useJsApiLoader, MarkerF, InfoBox, LoadScript, Marker, InfoWindowF } from "@react-google-maps/api";


const HotelsSection = () => {

    const [open, setOpen] = useState(false);

    const containerStyle = {
        
        height: "708px",
        width: "100%",
    };

    const center = {
        lat: 25.6356334,  // Latitude of the location you want to center the map on
        lng: -102.4194, // Longitude of the location you want to center the map on
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBy2l4KGGTm4cTqoSl6h8UAOAob87sHBsA"
    })

    const handleMarkerMouseOver = () => {
        setOpen(true)
    };


    return (
        <Box id="experience" className={styles.sect_bg}>
            <Box className={styles.sectionheader}>
                <Typography variant='h2'>ayahuasca Retreat Venue</Typography>
                <Typography>Retreat venue location info and gallery</Typography>
            </Box>
            <Box className={`px-2 mx-auto animate__animated animate__fadeInUp animate__delay-1s`}>
                <Grid container py={0.5} px={1}>
                    <Grid item lg={4}>
                        {!isLoaded ? <div>Loading</div> :
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                            >
                                <Marker position={{ lat: 20.6356334, lng: -105.2645979 }} onMouseOver={handleMarkerMouseOver} onMouseOut={() => setOpen(false)}  >
                                    {open === true ?
                                        <InfoBox position={{ lat: 20.6356334, lng: -105.2645979}} zIndex={-1}>
                                            <Box sx={{ backgroundColor: '#fff', padding: '5px' }}>
                                                <Typography sx={{ fontSize: 16, fontColor: `#08233B` }}>
                                                The ayahuasca ceremonies at this retreat
                                                </Typography>
                                            </Box>
                                        </InfoBox>
                                        : ""}
                                </Marker>

                            </GoogleMap>
                        }
                    </Grid>
                    <Grid item lg={8}>
                        <Box className={styles.venueinfo}>
                            <Grid container spacing={3} className='justify-content-center'>
                                <Grid item lg={8} xs={11} className='position-relative'>
                                    <Typography variant='h3' mb={5}>
                                        Ayahuasca Retreat; Without Breaking the Bank
                                    </Typography>
                                    <Typography>
                                        Looking for a transformative and life-changing experience without breaking the bank? Look no further than our low-cost ayahuasca retreat in beautiful Puerto Vallarta, Mexico. For just $559, participants can enjoy a 3-day, 2-night all-inclusive experience that includes accommodations, meals, two ayahuasca ceremonies, and ground transportation to and from Puerto Vallarta airport. Ayahuasca, a powerful and ancient plant medicine used by indigenous tribes in the Amazon Basin for centuries, has recently gained popularity as a tool for spiritual and personal growth.
                                    </Typography>
                                    <Typography>
                                        The ayahuasca ceremonies at this retreat are led by experienced and knowledgeable shamans who will guide participants through the experience with care and compassion. Beyond the transformative experience of the ayahuasca ceremonies, participants can also enjoy the natural beauty of Puerto Vallarta, with its stunning beaches and lush tropical vegetation. Whether seeking a deeper connection with oneself, exploring one's spirituality, or simply seeking a break from the stresses of everyday life, the low-cost ayahuasca retreat in Puerto Vallarta provides a powerful and accessible option for all. If you're ready to embark on a journey of self-discovery and transformation, book your spot at the low-cost ayahuasca retreat in Puerto Vallarta today. Your soul will thank you.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={0.3} px={1}>
                    <Grid item lg={3} sm={6} xs={12}>
                        <Card className={styles.customized_card}>
                            <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia className={styles.cards_image} image='/images/gallery/7pr.jpg' title="Well-Known Comedian" />
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12}>
                        <Card className={styles.customized_card}>
                            <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia className={styles.cards_image} image='/images/gallery/6pr.jpg' title="Unfamiliar with Ayahuasca" />
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12}>
                        <Card className={styles.customized_card}>
                            <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia className={styles.cards_image} image='/images/gallery/5pr.jpg' title="Experience with Ayahuasca" />
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12}>
                        <Card className={styles.customized_card}>
                            <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia className={styles.cards_image} image='/images/gallery/4pr.jpg' title="Ayahuasca Report Feeling " />
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
}
HotelsSection.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default HotelsSection;
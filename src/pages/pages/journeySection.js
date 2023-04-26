import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import styles from 'styles/JourneySection.module.css';
import { styled } from '@mui/material/styles'

import 'animate.css';

const SideImage = styled('img')({
});

const RoundImage = styled('img')({

});

const JourneySection = () => {
    const img1Src = '../../../images/pages/pv-schedule.jpg'
    const img2Src = '../../../images/pages/retreat1.jpg'


    return (
        <Box id="journey" className={styles.section_bg}>
            <Box className={`px-5 mx-auto animate__animated animate__fadeInUp animate__delay-1s`}>
                <Box className={styles.section_header}>
                    <Typography variant='h2'> Joe Rogan / Ron White Interview</Typography>
                    <Typography>A Powerful Journey of Self-Discovery</Typography>
                </Box>

                <Grid container spacing={5}>
                    <Grid item lg={4} sm={6} xs={12}>
                        <Card className={styles.card_custom}>
                            <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia className={styles.card_image} image='/images/journey/1.jpg' title="Well-Known Comedian" />
                            </Box>
                            <CardContent>
                                <Typography variant='h3'>Well-Known Comedian</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Ron White is a well-known comedian and actor who has performed for sold-out
                                    crowds across the United States. In a recent interview with Joe Rogan, Ron
                                    White opened up about his experience with Ayahuasca, a powerful plant medicine
                                    that has been used for centuries in indigenous cultures for healing and
                                    spiritual purposes. White's experience with Ayahuasca was nothing short of
                                    transformative, as he gained new insights into his life and his purpose in the
                                    world.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <Card className={styles.card_custom}>
                            <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia className={styles.card_image} image='/images/journey/2.jpg' title="Unfamiliar with Ayahuasca" />
                            </Box>
                            <CardContent>
                                <Typography variant='h3'>Unfamiliar with Ayahuasca</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    For those who are unfamiliar with Ayahuasca, it is a brew made from the Banisteriopsis
                                    caapi vine and other plant ingredients that are native to the Amazon region.
                                    The drink has been used for centuries by indigenous tribes for spiritual and healing
                                    purposes, and it is becoming increasingly popular in the Western world as a tool for
                                    self-discovery and personal growth.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <Card className={styles.card_custom}>
                            <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia className={styles.card_image} image='/images/journey/3.jpg' title="Experience with Ayahuasca" />
                            </Box>
                            <CardContent>
                                <Typography variant='h3'>Experience with Ayahuasca</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    White explained to Rogan that his experience with Ayahuasca was one of the most powerful experiences of his life. He described feeling as if he was "plugged into the universe," and that he was able to gain a new perspective on his life and his place in the world. He also explained that the experience was not easy, as he had to face some of his deepest fears and insecurities in order to move forward.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <Card className={styles.card_custom}>
                            <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia className={styles.card_image} image='/images/journey/4.jpg' title="Ayahuasca Report Feeling " />
                            </Box>
                            <CardContent>
                                <Typography variant='h3'>Ayahuasca Report Feeling </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    White's experience is not unique. Many people who have tried Ayahuasca report feeling a deep sense of connection to the world around them, as well as a heightened sense of self-awareness. Some even report having mystical or spiritual experiences that can be life-changing.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <Card className={styles.card_custom}>
                            <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia className={styles.card_image} image='/images/journey/5.jpg' title="Trained Shaman or Facilitator" />
                            </Box>
                            <CardContent>
                                <Typography variant='h3'>Trained Shaman or Facilitator</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    However, it's important to note that Ayahuasca is not a cure-all, and it should not be taken lightly. The experience can be intense and even overwhelming for some people, and it should only be taken under the guidance of a trained shaman or facilitator. It's also important to do your research and make sure that you are taking Ayahuasca in a safe and responsible setting.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <Card className={styles.card_custom}>
                            <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia className={styles.card_image} image='/images/journey/6.jpg' title="Power of Plant Medicine" />
                            </Box>
                            <CardContent>
                                <Typography variant='h3'>Power of Plant Medicine</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Overall, Ron White's experience with Ayahuasca is a testament to the power of plant medicine and its ability to help people connect with their inner selves and the world around them. If you are interested in trying Ayahuasca for yourself, make sure to do your research and find a reputable and experienced shaman or facilitator who can guide you through the experience safely and responsibly.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    );
}
JourneySection.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default JourneySection;
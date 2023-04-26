import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import styles from 'styles/ScheduleSection.module.css';
import { styled } from '@mui/material/styles'
import moment from 'moment';
import 'animate.css';
import { useRouter } from 'next/router';


const SideImage = styled('img')({

});

const RoundImage = styled('img')({

});

const ScheduleSection = () => {

    const router = useRouter();

    const img1Src = '../../../images/pages/pv-schedule.jpg'
    const img2Src = '../../../images/pages/retreat1.jpg'

    const host = "http://localhost:3007";
    const [retreatdata, setRetreatData] = useState([]);
    
    const GetRetreats = async (e) => {
        await fetch(host + '/get_retreats', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }).then(
            response => response.json()
        ).then(res => {
            const result = res.allretreats;
            setRetreatData(result);
        })
    };
    useEffect(() => {
        GetRetreats()
    }, []);

    const HandleBooking = (id, title) => {
        router.push({
            pathname: "/pages/booking",
            query: { id: id, title: title, amount: '50' },
        })
    }
  
    return (
        <Box id="upcoming_retreats" className={styles.section_bg}>
            
            <Box className={`px-5 mx-auto animate__animated animate__fadeInUp animate__delay-1s`}>
                <Box className={styles.section_header}>
                    <Typography variant='h2'> Upcoming Retreats</Typography>
                    <Typography>Here are our upcoming retreats</Typography>
                </Box>

                <Grid container spacing={3} className="tab-content justify-content-center animate__animated animate__fadeInUp animate__delay-2s" >

                    <Grid item lg={8} md={12} className="tab-pane fade show active" id="Month-1">
                        {
                            retreatdata.map((retreat, k) => (

                                <Grid key={k} spacing={1} container className={styles.schedule_item}>
                                    <Grid item md={3}>
                                        <span>
                                            {
                                                moment(retreat.createdAt).format("ddd, MMM DD YYYY")
                                            }
                                        </span>
                                    </Grid>
                                    <Grid item md={9}>
                                        <Box className={styles.speaker}>
                                            <RoundImage src={img2Src} alt="Brenden Legros" />
                                        </Box>
                                        <Typography variant='h4'>{retreat.title}
                                            <span>&nbsp;.Cole Emmerich</span>
                                        </Typography>
                                        <Typography className={styles.body1}>{retreat.interested} interested - {retreat.going} Going</Typography>
                                        <Box sx={{ textAlign: { md: 'start', xs: 'center' } }} className={`${styles.button_style} mt-4 `}>
                                            <Button onClick={() => HandleBooking(retreat._id, retreat.title)}>
                                                Book Now
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))
                        }

                    </Grid>

                    <Grid item lg={4} md={12} className='text-center'>
                        <SideImage src={img1Src} className="img-fluid" alt="" />
                    </Grid>

                </Grid>
                <Box className={`text-center ${styles.readmorebtn} `}>
                    <a href="#">See All Events</a>
                </Box>
            </Box>
        </Box>
    );
}
ScheduleSection.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ScheduleSection;
import React, { useState } from 'react';

import Header from './header';
import { Box, Button, Grid, Typography } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import Footer from './footer';

import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'animate.css';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

const BookingImage = styled('img')({
})

import StripeCheckout from 'react-stripe-checkout';

const BookingPage = () => {
    const router = useRouter();
    const id = router.query.id;
    const title = router.query.title;
    const RealAmount = router.query.amount;

    const [amount, setAmount] = useState(0);
    const [token, setToken] = useState(null);


    const [fullname, setFullName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [description, setDescription] = React.useState(RealAmount)
    const [bookfordate, setBookForDate] = React.useState("")

    const HandleFullName = (e) => setFullName(e.target.value)
    const HandleEmail = (e) => setEmail(e.target.value)
    const HandlePhone = (e) => setPhone(e.target.value)
    const HandleDescription = (e) => setDescription(e.target.value)
    const HandleBookForDate = (e) => setBookForDate(e.target.value)
    const HandleAmount = (e) => setAmount(e.target.value)



    const handleToken = async (token) => {
        setToken(token);
        const totalAmount = amount * 100
        await fetch('http://localhost:3007/payment/create_charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                retreat_id: id,
                retreat_title: title,
                totalAmount: totalAmount,
                token: token,
                fullname: fullname,
                email: email,
                phone: phone,
                bookfordate, bookfordate,
                description: description
            }),
        }).then(
            response => response.json()
        ).then(res => {
            if (res.msg == 'success') {
                setTimeout(() => {
                    router.push('/#upcoming_retreats')
                }, 2500);

                return toast.success(res.response, {

                    position: toast.POSITION.TOP_RIGHT
                });

            } else {
                return toast.error(res.response, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        });
    };

    const img1Src = '../../../images/pages/booknow2.gif'

    return (
        <Box>
            <Box>
                <Header />
                <Box id="about" className="mt-5 about-me">
                    <Box component="div" className='booking_bg' >
                        <Box className='d-flex justify-content-center'>
                            <BookingImage src={img1Src} className='heading1' />
                        </Box>
                        <Typography  variant='h2' className={`heading2 text-center`}>Welcome to <span className={` span animate__animated animate__flipInX animate__delay-1s`}>Ayahuasca</span>- book your retreat</Typography>
                    </Box>
                    <Container>
                        <Grid container className={`d-flex justify-content-center`}>
                            <Grid item lg={10} className={` formPart my-5`}>
                                <Box component="div" className='form' >
                                    <Grid container spacing={6} mb={5}>
                                        <Grid item xs={12} className='text-center'>
                                            <Typography className='title'  variant='h4'>{title}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        <Grid item md={2} sm={2} xs={12} 
                                            sx={{
                                                display: 'flex', alignItems: 'center',
                                                justifyContent: { xs: "flex-start", md: 'flex-start', lg: "flex-end" }
                                            }}>
                                            <label>Full Name</label>
                                        </Grid>
                                        <Grid item md={4} sm={4} xs={12}>
                                            <input
                                                type="text"
                                                name="fullname"
                                                className='form-control'
                                                id="fullname"
                                                placeholder="Your Full Name"
                                                onChange={HandleFullName}
                                                required />
                                        </Grid>

                                        <Grid item md={2} sm={2} xs={12} sx={{
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: { xs: "flex-start", md: 'flex-start', lg: "flex-end" }
                                        }}>
                                            <label>Email</label>
                                        </Grid>
                                        <Grid item md={4} sm={4} xs={12}>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className='form-control'
                                                placeholder="Your Email"
                                                onChange={HandleEmail}
                                                required />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3} mt={1}>
                                        <Grid item md={2} sm={2} xs={12} sx={{
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: { xs: "flex-start", md: 'flex-start', lg: "flex-end" }
                                        }}>
                                            <label>Phone</label>
                                        </Grid>
                                        <Grid item md={4} sm={4} xs={12}>
                                            <input
                                                type="phone"
                                                name="phone"
                                                id="phone"
                                                placeholder='+923000011222'
                                                className='form-control'
                                                onChange={HandlePhone}
                                                required />
                                        </Grid>

                                        <Grid item md={2} sm={2} xs={12} sx={{
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: { xs: "flex-start", md: 'flex-start', lg: "flex-end" }
                                        }}>
                                            <label>Booking Amount</label>
                                        </Grid>
                                        <Grid item md={4} sm={4} xs={12}>
                                            <input
                                                type="number"
                                                name="amount"
                                                id="amount"
                                                defaultValue={50}
                                                placeholder='1'
                                                className='form-control'
                                                onChange={HandleAmount}
                                                required />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3} mt={1}>
                                        <Grid item md={2} sm={2} xs={12} sx={{
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: { xs: "flex-start", md: 'flex-start', lg: "flex-end" }
                                        }}>
                                            <label>Booked for Date</label>
                                        </Grid>
                                        <Grid item md={4} sm={4} xs={12}>
                                            <input
                                                type="date"
                                                name="bookfordate"
                                                id="bookfordate"
                                                onChange={HandleBookForDate}
                                                className='form-control'
                                                required />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3} mt={1}>
                                        <Grid item md={2} xs={3} sx={{
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: { xs: "flex-start", md: 'flex-start', lg: "flex-end" }
                                        }}>
                                            <label>Description</label>
                                        </Grid>
                                        <Grid item md={10} xs={9}>
                                            <textarea
                                                name="description"
                                                id="description"
                                                className='form-control'
                                                placeholder="Description"
                                                onChange={HandleDescription}
                                                required />
                                        </Grid>
                                    </Grid>

                                    <Grid container className={`mt-3 justify-content-center custom `}>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <Box className="text-center pt-3">
                                                <StripeCheckout
                                                    token={handleToken}
                                                    stripeKey={'pk_test_51LgbR6LNnAduS9ocQtChZmJuRvRMBr2NfKHG7i70tAyAJsCgFNlOEV5gBXZUxlWXGKvQjEQVklw3nCUFCbJaY6HC00PInGiWRP'}
                                                    amount={amount * 100}
                                                    email={email}
                                                    currency="USD"
                                                    name={fullname}
                                                    label='Book Now'
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Footer />
            </Box >
        </Box >
    );
}
BookingPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default BookingPage;
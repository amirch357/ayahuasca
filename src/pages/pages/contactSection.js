import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import styles from 'styles/ContactSection.module.css';
import 'animate.css';
import { Container } from 'react-bootstrap';

const ContactSection = () => {

    return (
        <Box id="contact" className={`${styles.contact} section-bg`}>
            <Container>
                <Box className={`${styles.section_header} animate__animated animate__fadeInUp animate__delay-1s`}>
                    <Typography variant='h2'>Contact Us</Typography>
                    <Typography>Nihil officia ut sint molestiae tenetur.</Typography>
                </Box>

                <Grid container spacing={5} className={`${styles.contact_info} animate__animated animate__fadeInUp animate__delay-1s`}>

                    <Grid item md={4} xs={12}>
                        <Box className={styles.contact_address}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                            <Typography variant='h3'>Address</Typography>
                            <address>Av Adamar Puerto Vallarta</address>
                        </Box>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <Box className={styles.contact_phone}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            </svg>
                            <Typography variant='h3'>Phone Number</Typography>
                            <Typography>
                                <a href="tel:+52 3330161277">+52 3330161277</a>
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <Box className={styles.contact_email}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                            </svg>
                            <Typography variant='h3'>Email</Typography>
                            <Typography>
                                <a href="mailto:mike@ayahuascapuertovallarta.com">mike@ayahuascapuertovallarta.com</a>
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>

                <Box className="form animate__animated animate__fadeInUp animate__delay-1s">
                    <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                        <Grid container spacing={6}>
                            <Grid item md={6} sm={6} xs={12}>
                                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                            </Grid>
                            <Grid item md={6} sm={6} xs={12}>
                                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                            </Grid>
                        </Grid>
                        <Grid container className="mt-3">
                            <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                        </Grid>
                        <Grid container className="mt-3">
                            <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                        </Grid>

                        <Box className="text-center pt-3">
                            <Button className={styles.btn_msg} type="submit">Send Message</Button>
                        </Box>
                    </form>
                </Box>

            </Container>
        </Box >
    );
}
ContactSection.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ContactSection;
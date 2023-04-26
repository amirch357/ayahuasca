import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import styles from 'styles/Footer.module.css';
import 'animate.css';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { styled } from '@mui/material/styles';
import { Container } from 'react-bootstrap';

const LogoImage = styled('img')({
})

const Footer = () => {
  return (
    <Box id="footer" className={styles.footer}>
      <Box className={styles.footer_top}>
        <Container>
          <Grid container spacing={6}>

            <Grid item lg={4} md={6} sm={12} xs={12} className={styles.footer_info}>
              <Link href="/" >
                <LogoImage className={styles.footer_logo} src={`/images/logos/ft-logo-w.png`} />
              </Link>

              <Typography>
                I am passionate about Ayahuasca and have several ideas on how these
                ceremonies can be beneficial to more people. Through my research,
                working with my experienced associate Pablo Saldivar, I have found
                that Ayahuasca can be a powerful tool for personal growth, self-awareness,
                and healing. I am committed to sharing my knowledge and experiences with
                others who are interested in this transformative practice.
              </Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12} className={styles.footer_links}>
              <Typography variant='h4'>Useful Links</Typography>
              <ul>
                <li>
                  <ChevronRightIcon />
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <ChevronRightIcon />
                  <a href="./about-me.html">About Me</a>
                </li>
                <li>
                  <ChevronRightIcon />
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <ChevronRightIcon />
                  <a href="#schedule">Book Now</a>
                </li>
              </ul>
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12} className={styles.footer_contact}>
              <Typography variant='h4'>Contact Us</Typography>
              <Typography>
                <strong>Address:</strong> Av Adamar Puerto Vallarta<br />
                <strong>Phone:</strong> <a href="tel:+52 3330161277">+52 3330161277</a><br />
                <strong>US Phone:</strong> <a href="tel:281-249-5125">281-249-5125</a><br />
                <strong>Email:</strong> <a href="mailto:mike@ayahuascapuertovallarta.com">mike@ayahuascapuertovallarta.com</a><br />
              </Typography>

              <Box className={styles.social_links}>
                <a href="#" className="twitter"><TwitterIcon /></a>
                <a href="#" className="facebook"><FacebookIcon /></a>
                <a href="#" className="instagram"><InstagramIcon /></a>
                <a href="#" className="linkedin"><LinkedInIcon /></a>
              </Box>

            </Grid>

          </Grid>
        </Container>
      </Box>

      <Container>
        <Box className={styles.copyright}>
        Copyright &copy; <strong><a href="http://localhost:3000/" title="Ayahuasca" style={{color:'#563062'}}>Ayahuasca</a></strong> {new Date().getFullYear()}. All Rights Reserved
        </Box>
        <Box className={styles.credits}>
          Designed by - <a href="https://explorelogics.com/">Explore Logics</a>
        </Box>
      </Container>
    </Box>
  );
}
Footer.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Footer;
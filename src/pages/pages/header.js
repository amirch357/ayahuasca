import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from 'styles/Navbar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router';

const LogoImage = styled('img')({
});

import Scrollspy from 'react-scrollspy';
import { Box, Button, Grid, Modal } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';


const Header = () => {
    const router = useRouter();

    const HandleBookNow = () =>{
        router.push('/#upcoming_retreats')
    };
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    
  }, []);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <Navbar collapseOnSelect expand="lg" className={`${styles.navbar} ${isScrolled ? styles.shrink : ""} `} >
            <Container className={styles.navcontainer}>
                <Grid container className={`alignItems: 'center'`} >
                    <Grid item lg={3} md={3} sm={3} xs={3} sx={{display: 'flex', alignItems: 'center'}} >
                        <Navbar.Brand className={styles.brandlogo} style={{display: 'flex', alignItems: 'center'}} href="/">
                            <LogoImage className={styles.logo} src={`/images/logos/logo2(2).png`} />
                        </Navbar.Brand>
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={9} sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                            <Scrollspy
                                className={`navbar-nav pt-2 ${styles.togglemenu}`}
                                items={[
                                    'home',
                                    'upcoming_retreats',
                                    'gallery',
                                    'experience',
                                    'journey',
                                    'consciousness',
                                    'about_me',
                                    'contact'
                                ]}
                                currentClassName={`${styles.active}`}>
                                <li><Nav.Link href="/#home" className={`${styles.navlink}`}>Home</Nav.Link></li>
                                <li><Nav.Link href="/#upcoming_retreats" className={styles.navlink}>Upcoming Retreats</Nav.Link></li>
                                <li><Nav.Link href="/#gallery" className={styles.navlink}>Gallery</Nav.Link></li>
                                <li><Nav.Link href="/#experience" className={styles.navlink}>Experience</Nav.Link></li>
                                <li><Nav.Link href="/#journey" className={styles.navlink}>Journey</Nav.Link></li>
                                <li><Nav.Link href="/#consciousness" className={styles.navlink}>Consciousness</Nav.Link></li>
                                <li><Nav.Link href="/#about_me" className={styles.navlink}>About Me</Nav.Link></li>
                                <li><Nav.Link href="/#contact" className={styles.navlink}>Contact</Nav.Link></li>
                            </Scrollspy>

                            <Button className={styles.read_more_btn} onClick={HandleBookNow}>Book Now </Button>
                            <Button className={`${styles.togbtn}`} onClick={handleOpen}><DehazeIcon className={styles.closecon} /></Button>
                        </Box>
                        <Modal
                            sx={{ background: '#081306' }}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '20%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '95% !important',
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 24,
                                pt: 2,
                                px: 4,
                                pb: 3,
                            }}>
                                <CloseIcon
                                    sx={{
                                        position: 'absolute',
                                        top: '-15px',
                                        left: '98%',
                                        color: '#fff',
                                        transform: 'translate(-50%, -50%)',
                                        width: '5% !important',
                                        bgcolor: 'transparent',
                                        boxShadow: 24,
                                        cursor: 'pointer'
                                    }} onClick={handleClose}
                                />

                                <Scrollspy
                                    className={`navbar-nav ms-auto pt-2 `}
                                    items={[
                                        'home',
                                        'upcoming_retreats',
                                        'gallery',
                                        'experience',
                                        'journey',
                                        'consciousness',
                                        'about_me',
                                        'contact'
                                    ]}
                                    currentClassName={`${styles.active}`}>
                                    <li><Nav.Link href="/#home" className={`${styles.navlink}`}>Home</Nav.Link></li>
                                    <li><Nav.Link href="/#upcoming_retreats" className={styles.navlink}>Upcomming Retreats</Nav.Link></li>
                                    <li><Nav.Link href="/#gallery" className={styles.navlink}>Gallery</Nav.Link></li>
                                    <li><Nav.Link href="/#experience" className={styles.navlink}>Experience</Nav.Link></li>
                                    <li><Nav.Link href="/#journey" className={styles.navlink}>Journey</Nav.Link></li>
                                    <li><Nav.Link href="/#consciousness" className={styles.navlink}>Consciousness</Nav.Link></li>
                                    <li><Nav.Link href="/#about_me" className={styles.navlink}>About Me</Nav.Link></li>
                                    <li><Nav.Link href="/#contact" className={styles.navlink}>Contact</Nav.Link></li>
                                </Scrollspy>
                            </Box>
                        </Modal>

                    </Grid>
                </Grid>
            </Container>
        </Navbar >
    );
}
Header.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Header

import {useEffect} from 'react';
import { NavLink, Link } from "react-router-dom";
import './Footer.css';

import { BiLogoTelegram } from 'react-icons/bi';
import { BiLogoFacebook } from 'react-icons/bi';
import { BiLogoTwitter } from 'react-icons/bi';
import { BiLogoWhatsapp } from 'react-icons/bi';

import AOS from "aos";
import "aos/dist/aos.css";
import { FaCarSide } from 'react-icons/fa';

const Footer = () => {

    useEffect(() => {
        AOS.init({
            easing: 'ease',
            once: false
          });
        AOS.refresh();
      }, []);

  return (
    <footer className="footer">
        <div className="footerContent grid !mb-6">
            <Link to={''} className="logo flex">
                <FaCarSide />
                <span>SEWANOU CAR</span>
            </Link>

            <ul className='flex lists'>
                <NavLink to='/' className='link before'> <li>Accueil</li> </NavLink>
                <NavLink to="/chaines" className='link before'> <li>Voitures</li> </NavLink>
                <NavLink to="/contacts" className='link before'> <li>Contacts</li> </NavLink>
            </ul>

            <div className="icons flex">
                <span data-aos="fade-up" data-aos-duration="500" ><BiLogoTelegram className="icon" /></span>
                <span data-aos="fade-up" data-aos-duration="1000"><BiLogoFacebook className="icon" /></span>
                <span data-aos="fade-up" data-aos-duration="1500"><BiLogoWhatsapp className="icon" /></span>
                <span data-aos="fade-up" data-aos-duration="2000"><BiLogoTwitter className="icon" /></span>
            </div>
        </div>

        <div className="  flex items-center justify-between xs:block ">
            <p>Build with love <span className='text-red-700 text-[17px] mx-1'>&hearts;</span> by <Link to="mailto:adandappolinaire229@gmail.com"> Appolinaire </Link> </p> <br /> 
            <p>Copyright © {(new Date()).getFullYear()}. All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer;
import { Link } from 'react-router-dom';
import './Contact.css';

import {BiMailSend, BiLogoFacebook} from 'react-icons/bi';
import {BsWhatsapp, BsTelephoneOutbound, BsInstagram, BsBuildings} from 'react-icons/bs';
import {GoClock} from 'react-icons/go';

const Contact = () => {
  return (
    <section className="contact">


        <div className="contactInfos transform-none top-0 !relative !w-full !right-0 ">
            
            <div className="contactElements relative before !top-1/2 transform-none m-auto left-auto right-0 max-w-[500px] xs:!mt-[20%]">
                <h2>Informations</h2>
                <div className="contactInfo flex">
                    <BiMailSend className="icon" />
                    <Link to="mailto:">info@getmoremovie @gmail.com</Link>
                </div>

                <div className="contactInfo flex">
                    <BsTelephoneOutbound className="icon" />
                    <Link to="tel:">+229 56 77 89 90</Link>
                </div>

                <div className="contactInfo flex">
                    <BsBuildings className='icon' />
                    <Link>Carrefour Saint Louis</Link>
                </div>

                <div className="contactInfo flex">
                    <GoClock className='icon' />
                    <Link>Disponible pour vous 24H / 24</Link>
                </div>
            </div>
        </div>

    </section>
  )
} 
    
export default Contact;

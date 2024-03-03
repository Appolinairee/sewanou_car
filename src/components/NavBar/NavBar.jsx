import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";

import { BsSearch } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { GoLocation } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";
import { BiLogoTelegram } from "react-icons/bi";
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoWhatsapp } from "react-icons/bi";
import { BiCross } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";

const Navbar = () => {
  const Links = [
    {
      name: "Accueil",
      link: "/",
    },

    {
      name: "Voitures",
      link: "/voitures",
    },

    {
      name: "Contacts",
      link: "/contacts",
    },
  ];

  const [barState, setBarState] = useState(0);

  const handleBar = () => {
    setBarState(barState ? 0 : 1);
  };

  const barStyle = {
    transform: barState ? "translate(0px)" : "translateX(130%)",
  };

  const barStyle2 = {
    transform: barState ? "translate(0px, -50%)" : "translate(130%, -50%)",
  };

  return (
    <nav>
      <div className="nav flex justify-between">

        <div className="navbar flex">
          <Link to={''} className="logo flex">
            <FaCarSide />
            <span>SEWANOU CAR</span>
          </Link>

          <ul className="bar flex">
            {Links.map((link, index) => (
              <NavLink key={index} to={link.link} className="link before">
                <li className="flex">
                  <p> {link.name}</p>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="navbarContent flex">
          <div className="search hover:!w-[250px] duration-75">
            <input type="search" className="!rounded-[40px]" placeholder="Search..." />

            <div className="absolute right-1 top-[8.5%] rounded-[20px] h-[80%] w-[20%] flex text-white bg-primary">
                <BsSearch className=" m-auto"  />
            </div>
          </div>

          <CgMenuRight
            fill="white"
            className="icon menuBtn cursor-pointer"
            onClick={handleBar}
          />
        </div>
      </div>

      <div className="menu flex" style={barStyle}>
        <div className="menuOverlay" onClick={handleBar}></div>

        <div className="menuContent" style={barStyle2}>
          <Link to={''} className="logo flex">
            <FaCarSide />
            <span>SEWANOU CAR</span>
          </Link>

          <div className="menuReduceScreen">
            <ul className="bar flex">
              {Links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.link}
                  className="link before"
                  onClick={handleBar}
                >
                  <li className="flex">
                    <p> {link.name}</p>
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>

          <p className="description mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel
            risus imperdiet, gravida justo eu.{" "}
          </p>

          <div className="ulMenu ulMenuContact">
            <h3>Our Location</h3>

            <ul className="bar">
              <li className="flex">
                <GoLocation className="!w-[200px]" />
                <p>Jalan Raya Uluwatu,Kec. Kuta, Kab. Badung, Bali</p>
              </li>

              <Link to="/parc">
                <li className="flex">
                  <BsTelephone className="icon" />
                  <p>+(62) 800-567-8990</p>
                </li>
              </Link>

              <Link to="/parcglobal">
                <li className="flex">
                  <BiMailSend className="icon" />
                  <p>Cinomy@mail.com</p>
                </li>
              </Link>
            </ul>
          </div>

          <div className="ulMenu socialMedia">
            <h3>Médias Sociaux</h3>

            <div className="bar flex gap-3">
              <BiLogoTelegram className="icon cursor-pointer" />
              <BiLogoFacebook className="icon cursor-pointer" />
              <BiLogoWhatsapp className="icon cursor-pointer" />
              <BiLogoTwitter className="icon cursor-pointer" />
            </div>
          </div>

          <BiCross className="icon displaybar cursor-pointer" onClick={handleBar} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

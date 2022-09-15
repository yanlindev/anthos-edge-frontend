import React from 'react';
import { Link } from "react-router-dom";
import './styles.scss';
import cloudLogo from '../../assets/images/cloud-logo.svg';

const Header = () => {

  return (
    <div className='header'>
      <img className='header__logo' src={cloudLogo} />
      <Link to='/'>Google Cloud</Link>
    </div>
  )
}

export default Header;
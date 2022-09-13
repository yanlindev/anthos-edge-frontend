import React from 'react';
import './styles.scss';
import cloudLogo from '../../assets/images/cloud-logo.svg';

const Header = () => {

  return (
    <div className='header'>
      <img className='header__logo' src={cloudLogo} />
      <div>Google Cloud</div>
    </div>
  )
}

export default Header;
import React, { useState } from 'react';
import './styles.scss';
import close_button from '../../assets/images/button-close.svg';

const ToggleButton = props => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`button toggle-button ${clicked ? 'toggle-button--clicked' : ''}`}
      onClick={() => setClicked(!clicked)}
    >
      <div className='inner'>
        <div>{props.text}</div>
        <img src={close_button} />  
      </div>
    </div>
  )
}

export default ToggleButton;
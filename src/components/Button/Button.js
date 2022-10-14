import React from 'react';
import './styles.scss';

const Button = props => {
  return (
    <div
      className={`button ${props.class} ${props.isActive ? '' : 'button--disable'}`}
      onClick={props.handleClick ? props.handleClick : null}
    >
      {props.text}  
    </div>
  )
}

export default Button;
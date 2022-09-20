import React from 'react';
import './styles.scss';

const Button = props => {
  return (
    <div
      className={`button ${props.class}`}
    >
      {props.text}  
    </div>
  )
}

export default Button;
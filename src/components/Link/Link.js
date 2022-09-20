import React from 'react';
import './styles.scss';

const Link = props => {
  return (
    <a
      className='link'
      href={props.url}
    >
      {props.text}  
    </a>
  )
}

export default Link;
import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import map_svg from '../../assets/images/map.svg';
import Button from '../Button/Button';
import './styles.scss';

const Map = props => {
  const handleClick = () => {
    console.log('pp')
  }
  return (
    <div className='map'>
      {
        props.buttons ?
        props.buttons.map(data =>
        <div key={data.name} onClick={props.handleButtonClick}>
          <Button
            text={data.name}
          />
        </div>
        ) :
        null
      }
      <LazyLoadImage
        effect="blur"
        src={map_svg}
      />
    </div>
  )
}

export default Map;
import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import map_svg from '../../assets/images/map.svg';
import './styles.scss';

const Map = () => {
  return (
    <div className='map'>
      <LazyLoadImage
        // alt={image.alt}
        // height={image.height}
        effect="blur"
        src={map_svg} // use normal <img> attributes as props
      />
    </div>
  )
}

export default Map;
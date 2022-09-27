import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import map_cursor from '../../assets/images/map_cursor.svg';
import map_svg from '../../assets/images/map.svg';
import Button from '../Button/Button';
import './styles.scss';

const Map = props => {
  return (
    <div className='map'>
      {
        props.label ?
        <div className='map__label'>
          <img className='map__label__icon' src={map_cursor} />
          <div className='map__label__text'>click store to view details</div>
        </div> :
        null
      }

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
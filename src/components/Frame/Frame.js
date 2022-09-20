import React from 'react';
import './styles.scss';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';

const Frame = props => {
  return (
    <div className='frame'>
      <div className='frame__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>{props.title}</div>
      </div>
    </div>
  )
}

export default Frame;
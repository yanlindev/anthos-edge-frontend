import React from 'react';
import './styles.scss';
import Button from '../Button/Button';
import Link from '../Link/Link';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';

const ACM = () => {
  return (
    <div className='acm'>
      <div className='acm__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>ACM Fleet Management</div>
      </div>
      <div className='acm__subtitle'>Upgrade/Downgrade application version</div>

      <div className='acm__confirm'>
        <a className='acm__confirm__link' href='https://www.github.com' target='_blank'>View Repository</a>
        <Button
          class='acm__confirm__button'
          text='Apply'
        />
      </div>
    </div>
  )
}

export default ACM;
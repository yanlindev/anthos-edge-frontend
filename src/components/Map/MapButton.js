import React, {useState} from 'react';
import './styles.scss';
import shop_icon from '../../assets/images/shop--blue.svg';

const MapButton = props => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`map-button ${loaded ? 'map-button--loaded' : ''}`}>
      <img
        src={shop_icon}
        onLoad={() => setLoaded(true)}
      />
      <div>{props.text}</div>
    </div>
  )
}

export default MapButton;
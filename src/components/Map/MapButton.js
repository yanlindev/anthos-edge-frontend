import React, {useState} from 'react';
import './styles.scss';
import shop_icon from '../../assets/images/shop--blue.svg';

const MapButton = props => {
  const data = props.data;
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`map-button`}>
    </div>
  )
}

export default MapButton;
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './styles.scss';
import Button from '../Button/Button';
import ToggleButton from '../Button/ToggleButton';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';
import acm_arrow_icon from '../../assets/images/acm-arrow.svg';
import axios from 'axios';

const VMManagement = () => {
  const [images, setImages] = useState([]);
  const [stores, setStores] = useState({});

  useEffect(() => {
    // get image list
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/v1/virtual-machine/image_list')
    .then(function (response) {
      let version_list = [];
      response.data.forEach(data => {
        version_list.push({
          value: data.name,
          label: data.name
        });
      })
      setImages(version_list);
    })
    .catch(function (error) {
      console.log(error);
    })

    // get store list
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/')
    .then(function (response) {
      let store_list = [];
      response.data.forEach(data => {
        store_list.push({
          value: data.name,
          label: data.name
        });
      })
      setStores(store_list);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  return (
    <div className='vm'>
      <div className='vm__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>Deploy VM</div>
      </div>
      <div className='vm__subtitle'>Run VM at Edge in Kubernetes</div>

      <div className='vm__inner'>
        <div className='vm__inner__image'>
          <div className='image-title'>
              <div className='image-title__line'></div>
              <div>Select VM to Run on Edge in Kubernetes :</div>
          </div>
          <div className='image-select'>
            <Select options={images} />
          </div>
        </div>
        <div className='vm__inner__store'>
          <div className='store-title'>
              <div className='store-title__line'></div>
              <div>Select s Store to Apply :</div>
          </div>
          <div className='store-select'>
            <Select options={stores} />
          </div>
        </div>
      </div>

      <div className='vm__confirm'>
        <a className='vm__confirm__link' href='https://www.github.com' target='_blank'>View Repository</a>
        <Button
          class='vm__confirm__button'
          text='Apply'
        />
      </div>
    </div>
  )
}

export default VMManagement;

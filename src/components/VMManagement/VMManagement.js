import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedTags } from '../../redux/clusterSlice';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import './styles.scss';
import Button from '../Button/Button';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';
import axios from 'axios';

const VMManagement = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState({});
  const [stores, setStores] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedParameterName, setSelectedParameterName] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitOnClick, setSubmitOnClick] = useState(false);
  const [parameterSetNameList, setParameterSetNameList] = useState({});

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
    });

    // get store list
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/v1/abm/')
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
    });

    // get vm parameter set name list
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/v1/virtual-machine/parameter_list')
    .then(function (response) {
      let parameter_set_name_list = [];
      response.data.forEach(data => {
        if(!parameter_set_name_list.includes(data.values.name)) {
          parameter_set_name_list.push({
            value: data.values.name,
            label: data.values.name,
          });
        }
      })
      setParameterSetNameList(parameter_set_name_list);
    })
    .catch(function (error) {
      console.log(error);
    });

    return () => {
      dispatch(updateSelectedTags([]));
    }
  }, []);

  useEffect(() => {
    if(selectedImage && selectedStore && selectedParameterName) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [selectedImage, selectedStore, selectedParameterName]);

  useEffect(() => {
    if(selectedStore) {
      dispatch(updateSelectedTags([selectedStore.slice(4)]));
    }
  }, [selectedStore]);

  const handleImageChange = selectedOption => {
    setSelectedImage(selectedOption.value);
  }

  const handleStoreChange = selectedOption => {
    setSelectedStore(selectedOption.value);
  }

  const handleParameterNameChange = selectedOption => {
    setSelectedParameterName(selectedOption.value);
  }

  const handleSubmit = () => {
    setSubmitOnClick(true);

    axios({
      method: 'post',
      url: `https://edge-demo-fljjthbteq-uw.a.run.app/v1/virtual-machine/create-vm?vm_image_name=${selectedImage}&cluster_name=${selectedStore}&vm_parameterset_name=${selectedParameterName}`,
    })
    .then(response => {
      if(response.status === 200) {
        setSubmitSuccess(true);
        setButtonActive(false);
        setSubmitOnClick(false);
        setTimeout(() => {
          setSubmitSuccess(false);
          setButtonActive(true);
          window.location.reload(false);
        }, 3000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
            <Select
              options={images}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className='vm__inner__store'>
          <div className='store-title'>
              <div className='store-title__line'></div>
              <div>Select s Store to Apply :</div>
          </div>
          <div className='store-select'>
            <Select
              options={stores}
              onChange={handleStoreChange}
            />
          </div>
        </div>
        <div className='vm__inner__name'>
          <div className='name-title'>
              <div className='name-title__line'></div>
              <div>Select VM Parameter Set Name :</div>
          </div>
          <div className='name-select'>
            <Select
              options={parameterSetNameList}
              onChange={handleParameterNameChange}
            />
          </div>
        </div>
      </div>

      <div className='vm__confirm'>
        <div style={{visibility: submitOnClick ? 'visible' : 'hidden'}}>
          <CircularProgress />
        </div>

        <Alert severity="success" className={`vm__success ${submitSuccess ? 'is-visible' : ''}`}>
          <AlertTitle>Success</AlertTitle>
          <strong>VM</strong> has been deployed successfully!
        </Alert>

        <div style={{display: 'flex', alignItems: 'center'}}>
          {/* <a
            className='acm__confirm__link'
            href='https://www.github.com'
            target='_blank'
          >View Repository<span><img src={arrowOutwardIcon} /></span></a> */}
          <div style={{visibility: submitOnClick ? 'hidden' : 'visible'}}>
            <Button
              class='vm__confirm__button'
              text='Apply'
              isActive={buttonActive}
              handleClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VMManagement;

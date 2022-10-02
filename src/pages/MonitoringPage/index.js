import React, {useState, useEffect} from 'react';
import './styles.scss';
import FleetList from '../../components/FleetList';
import FleetMetrics from '../../components/FleetMetrics';
import Map from '../../components/Map';
import Modal from '../../components/Modal';
import axios from 'axios';

const MonitoringPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setDate] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/')
    .then(function (response) {
      // handle success
      setDate(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])

  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const handleActiveIndex = index => {
    setActiveIndex(index);
  }

  return (
    <div className='monitoring-page'>
      <Map
        data={data}
        handleButtonClick={handleOpenModal}
        activeIndex={activeIndex}
      />
      <div className='monitoring-page__panel'>
        <FleetList
          data={data}
          setActiveIndex={handleActiveIndex}
        />
        <FleetMetrics />
      </div>
      {
        modalOpen ?
        <Modal handleClose={handleCloseModal} /> :
        null
      }
    </div>
  )
}

export default MonitoringPage;
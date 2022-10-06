import React, {useState, useEffect} from 'react';
import './styles.scss';
import FleetList from '../../components/FleetList';
import FleetMetrics from '../../components/FleetMetrics';
import Map from '../../components/Map';
import Modal from '../../components/Modal';
import axios from 'axios';

const MonitoringPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [fleetData, setFleetData] = useState([]);

  useEffect(() => {
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/')
    .then(function (response) {
      // handle success
      setData(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])

  const handleOpenModal = index => {
    setActiveIndex(index);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setActiveIndex(null);
    setModalOpen(false);
  }

  const handleHoverIndex = index => {
    setHoverIndex(index);
  }

  // get fleet data
  useEffect(() => {
    let fleetData = data.map(data => {
      const {name, node_count, version} = data;
      return {name, node_count, version};
    });
    setFleetData(fleetData);
  }, [data])

  return (
    <div className='monitoring-page'>
      <Map
        data={data}
        handleButtonClick={handleOpenModal}
        hoverIndex={hoverIndex}
      />
      <div className='monitoring-page__panel'>
        <FleetList
          data={fleetData}
          handleHoverIndex={handleHoverIndex}
          handleButtonClick={handleOpenModal}
        />
        <FleetMetrics />
      </div>
      {
        modalOpen ?
        <Modal
          data={data[activeIndex]}
          handleClose={handleCloseModal}
        /> :
        null
      }
    </div>
  )
}

export default MonitoringPage;
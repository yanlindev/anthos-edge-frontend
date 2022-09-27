import React, {useState} from 'react';
import './styles.scss';
import FleetList from '../../components/FleetList';
import FleetMetrics from '../../components/FleetMetrics';
import Map from '../../components/Map';
import Modal from '../../components/Modal';

const fleetData = [
  {
    name: 'Store 01'
  }
]

const MonitoringPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  return (
    <div className='monitoring-page'>
      <Map
        label='true'
        buttons={fleetData}
        handleButtonClick={handleOpenModal}
      />
      <div className='monitoring-page__panel'>
        <FleetList />
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
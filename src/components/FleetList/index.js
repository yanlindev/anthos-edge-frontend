import React, { useState, useEffect } from 'react';
import fleetInfoIcon from '../../assets/images/fleetInfo.svg';
import './styles.scss';
import axios from 'axios';
import $ from "jquery";

const FleetList = () => {
  useEffect(() => {
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/v1/abm/')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    // $.ajax({
    //   url: "https://edge-demo-fljjthbteq-uw.a.run.app/v1/abm/",
    //   type: 'GET',
    //   success: function(res) {
    //       console.log(res);
    //       alert(res);
    //   }
  // });
  }, [])

  return (
    <div className='fleet-list'>
      <div className='fleet-list__title'>
        <img className='icon' src={fleetInfoIcon} />
        <div className='text'>Fleet Information</div>
      </div>

      <div className='fleet-list__subtitle'>
        <div className='text'>Name</div>
        <div className='text'>Cluster</div>
        <div className='text'>Version</div>
      </div>
    </div>
  )
}

export default FleetList;
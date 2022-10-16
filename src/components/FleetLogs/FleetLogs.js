import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './styles.scss';
import Button from '../Button/Button';
import ToggleButton from '../Button/ToggleButton';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';
import acm_arrow_icon from '../../assets/images/acm-arrow.svg';
import axios from 'axios';

const FleetLogs = () => {
  const [appVersions, setAppVersions] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [tags, setTags] = useState({});

  useEffect(() => {
    // get app version list
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/v1/acm/application-list')
    .then(function (response) {
      let version_list = [];
      response.data.forEach(data => {
        version_list.push({
          value: data,
          label: data
        });
      })
      setAppVersions(version_list);
    })
    .catch(function (error) {
      console.log(error);
    })

    // get policy list
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/v1/acm/policy_list')
    .then(function (response) {
      let policy_list = [];
      response.data.forEach(data => {
        policy_list.push({
          value: data.name,
          label: data.name
        });
      })
      setPolicies(policy_list);
    })
    .catch(function (error) {
      console.log(error);
    })

    // get tag list
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/')
    .then(function (response) {
      const data = response.data;
      let tags = {};
      for (let [key, value] of Object.entries(JSON.parse(JSON.stringify(data[0].labels)))) {
        tags[key] = [];
      }
      data.forEach(cluster => {
        for (const key in cluster.labels) {
          for (const tagKey in tags) {
            if(key == tagKey && !tags[tagKey].includes(cluster.labels[key])) {
              tags[tagKey].push(cluster.labels[key])
            }
          }
        }
      })
      setTags(tags);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  return (
    <div className='acm'>
      <div className='acm__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>Fleet Real-Time Logs</div>
      </div>

      <div className='acm__inner'>
        
      </div>

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

export default FleetLogs;

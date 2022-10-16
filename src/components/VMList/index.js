import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVisibleClusters, updateClusterOnHover } from '../../redux/clusterSlice';
import fleetInfoIcon from '../../assets/images/fleetInfo.svg';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.scss';
import axios from 'axios';

const VMList = props => {
  const { visibleClusters } = useSelector((state) => state.cluster);
  const [VMList, setVMList] = useState([]);

  useEffect(() => {
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/virtual-machine/vm_list')
    .then(function (response) {
      // handle success
      setVMList(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

    const vm_list_interval = setInterval(() => {
      axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/virtual-machine/vm_list')
      .then(function (response) {
        // handle success
        setVMList(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }, 4000);

    return () => {
      clearInterval(vm_list_interval);
    }
  }, [])

  return (
    <div className='vm-list'>
      <div className='vm-list__title'>
        <div>
          <img className='icon' src={fleetInfoIcon} />
          <div className='text'>Virtual Machine List</div>
          <div className='label'>{visibleClusters.length}</div>
        </div>
      </div>

      <div className='table-wrapper'>
      <table className='vm-list__inner'>
        <thead>
          <tr>
            <th>ClusterName</th>
            <th>VM Name</th>
            <th>VM IP</th>
            <th>VM Status</th>
            <th>VM Image Name</th>
            <th>VM Parameter Set Name</th>
          </tr>
        </thead>
        {
          VMList.length > 0 ?
          VMList.map((data, index) => (
            <tbody>
              <tr>
                <td>{data.cluster_name}</td>
                <td>{data.vm_name}</td>
                <td>{data.vm_ip}</td>
                <td><span className={`vm-status ${data.vm_status === 'Running' ? 'is-running' : data.vm_status === 'Stopped' ? 'is-stopped' : data.vm_status === 'Provisioning' ? 'is-provisioning' : data.vm_status === 'Removing' ? 'is-removing' : ''}`}>{data.vm_status}</span></td>
                <td>{data.vm_image_name}</td>
                <td>{data.vm_parameter_set_name}</td>
              </tr>
            </tbody>
          )) :
          <SkeletonTheme>
            <td><Skeleton count={8} height={30} /></td>
            <td><Skeleton count={8} height={30} /></td>
            <td><Skeleton count={8} height={30} /></td>
            <td><Skeleton count={8} height={30} /></td>
            <td><Skeleton count={8} height={30} /></td>
          </SkeletonTheme>
        }
      </table>
      </div>
    </div>
  )
}

export default VMList;
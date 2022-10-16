import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVisibleClusters, updateClusterOnHover } from '../../redux/clusterSlice';
import fleetInfoIcon from '../../assets/images/fleetInfo.svg';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.scss';
import axios from 'axios';

const LongFleetList = props => {
  const dispatch = useDispatch();
  const [allData, setAllData] = useState([]);
  const { visibleClusters } = useSelector((state) => state.cluster);

  useEffect(() => {
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/v1/abm/')
    .then(function (response) {
      // handle success
      setAllData(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

    const fleet_list_interval = setInterval(() => {
      axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/v1/abm/')
      .then(function (response) {
        // handle success
        setAllData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }, 4000);

    return () => {
      clearInterval(fleet_list_interval);
    }
  }, [])

  useEffect(() => {
    return () => {
      dispatch(updateVisibleClusters(allData))
    };
  }, []);

  return (
    <div className='fleet-list'>
      <div className='fleet-list__title'>
        <div>
          <img className='icon' src={fleetInfoIcon} />
          <div className='text'>Fleet Information</div>
          <div className='label'>{visibleClusters.length}</div>
        </div>
      </div>

      <div className='table-wrapper'>
      <table className='fleet-list__inner'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cluster</th>
            <th>Version</th>
            <th>ACM Status</th>
            <th>Tags</th>
          </tr>
        </thead>
        {
          visibleClusters.length > 0 ?
          visibleClusters.map((data, index) => (
            <tbody
              onMouseEnter={() => dispatch(updateClusterOnHover(data.name))}
              onMouseLeave={() => dispatch(updateClusterOnHover(''))}
            >
              <tr>
                <td>{data.name}</td>
                <td>{data.node_count}</td>
                <td>{data.version}</td>
                <td>{data.acm_status}</td>
                {Object.values(data.labels).map(label => <span className='tag'>{label}</span>)}
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

export default LongFleetList;
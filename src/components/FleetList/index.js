import React from 'react';
import fleetInfoIcon from '../../assets/images/fleetInfo.svg';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.scss';

const FleetList = props => {
  return (
    <div className='fleet-list'>
      <div className='fleet-list__title'>
        <img className='icon' src={fleetInfoIcon} />
        <div className='text'>Fleet Information</div>
        <div className='label'>{props.data.length}</div>
      </div>

      <div className='table-wrapper'>
      <table className='fleet-list__inner'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cluster</th>
            <th>Version</th>
          </tr>
        </thead>
        {
          props.data.length > 0 ?
          props.data.map(data => (
            <tbody>
              <tr>
                <td>{data.location}</td>
                <td>{data.node_count}</td>
                <td>{data.version}</td>
              </tr>
            </tbody>
          )) :
          <SkeletonTheme>
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

export default FleetList;
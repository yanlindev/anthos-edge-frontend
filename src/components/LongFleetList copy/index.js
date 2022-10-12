import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVisibleClusters } from '../../redux/clusterSlice';
import fleetInfoIcon from '../../assets/images/fleetInfo.svg';
import filterIcon from '../../assets/images/filter_icon.svg';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.scss';
import axios from 'axios';

const LongFleetList = props => {
  const [filterList, setFilterList] = useState([]);
  const [visibleClusters, setVisibleClusters] = useState(useSelector((state) => state.visibleClusters));
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    let arr = ['all'];
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/')
    .then(function (response) {
      // handle success
      response.data.forEach(cluster => {
        if(!arr.includes(cluster.labels.continent)) {
          arr.push(cluster.labels.continent);
        }
      });
      setFilterList(arr);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])

  const handleSelectFilter = item => {
    console.log(props.data)
    const filteredData = props.data.filter(cluster => cluster.continent == item)
    setVisibleClusters(filteredData);
  }

  return (
    <div className='fleet-list'>
      <div className='fleet-list__title'>
        <div>
          <img className='icon' src={fleetInfoIcon} />
          <div className='text'>Fleet Information</div>
          <div className='label'>{props.data.length}</div>
        </div>
        <div className='btn' onClick={() => {setIsFilterVisible(!isFilterVisible)}}>
          <img src={filterIcon}/>
          <div>filter</div>
          <div className={`filter-menu ${isFilterVisible ? 'filter-menu--visible' : ''}`}>
            {
              filterList.map(item => (
                <div
                  className='filter-menu__item'
                  onClick={() => handleSelectFilter(item)}
                >{item}</div>
              ))
            }
          </div>
        </div>
      </div>

      <div className='table-wrapper'>
      <table className='fleet-list__inner'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cluster</th>
            <th>Version</th>
            {
              props.data[0] && props.data[0].acm_status ?
              <th>ACM Status</th> :
              null
            }
            {
              props.data[0] && props.data[0].labels ?
              <th>Tags</th> :
              null
            }
          </tr>
        </thead>
        {
          props.data.length > 0 ?
          props.data.map((data, index) => (
            <tbody
              onMouseEnter={props.handleHoverIndex ? () => props.handleHoverIndex(index) : null}
              onMouseLeave={props.handleHoverIndex ? () => props.handleHoverIndex(null) : null}
              onClick={props.handleButtonClick ? () => props.handleButtonClick(index) : null}
            >
              <tr>
                <td>{data.name}</td>
                <td>{data.node_count}</td>
                <td>{data.version}</td>
                {
                  data.acm_status ?
                  <td>{data.acm_status}</td> :
                  null
                }
                {
                  data.labels ?
                  <td>
                    {Object.values(data.labels).map(label => <span className='tag'>{label}</span>)}
                  </td> :
                  null
                }
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

export default LongFleetList;
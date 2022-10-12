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
  const dispatch = useDispatch();
  const [allData, setAllData] = useState([]);
  const { visibleClusters } = useSelector((state) => state.cluster);
  // console.log(visibleClusters)
  const [filterList, setFilterList] = useState([]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    let arr = ['all'];
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/')
    .then(function (response) {
      setAllData(response.data);
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

  useEffect(() => {
    return () => {
      dispatch(updateVisibleClusters(allData))
    };
  }, []);

  const handleSelectFilter = (item, index) => {
    setSelectedFilterIndex(index);
    if(item === 'all') {
      dispatch(updateVisibleClusters(allData))
    } else {
      const filteredData = allData.filter(cluster => cluster.labels.continent == item)
      dispatch(updateVisibleClusters(filteredData))
    }
  }

  return (
    <div className='fleet-list'>
      <div className='fleet-list__title'>
        <div>
          <img className='icon' src={fleetInfoIcon} />
          <div className='text'>Fleet Information</div>
          <div className='label'>{visibleClusters.length}</div>
        </div>
        <div className='btn' onClick={() => {setIsFilterVisible(!isFilterVisible)}}>
          <img src={filterIcon}/>
          <div>filter</div>
          <div className={`filter-menu ${isFilterVisible ? 'filter-menu--visible' : ''}`}>
            {
              filterList.map((item, index) => (
                <div
                  className={`filter-menu__item ${index === selectedFilterIndex ? 'filter-menu__item--selected' : ''}`}
                  onClick={() => handleSelectFilter(item, index)}
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
            <th>ACM Status</th>
            <th>Tags</th>
          </tr>
        </thead>
        {
          visibleClusters.length > 0 ?
          visibleClusters.map((data, index) => (
            <tbody
              onMouseEnter={props.handleHoverIndex ? () => props.handleHoverIndex(index) : null}
              onMouseLeave={props.handleHoverIndex ? () => props.handleHoverIndex(null) : null}
              onClick={props.handleButtonClick ? () => props.handleButtonClick(index) : null}
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
          </SkeletonTheme>
        }
      </table>
      </div>
    </div>
  )
}

export default LongFleetList;
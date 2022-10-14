import React, { Fragment, useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { updateVisibleClusters } from '../../redux/clusterSlice';
import fleetInfoIcon from '../../assets/images/fleetInfo.svg';
import filterIcon from '../../assets/images/filter_icon.svg';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.scss';
import axios from 'axios';

const ShortFleetList = props => {
  const dispatch = useDispatch();
  const [allData, setAllData] = useState([]);
  const {visibleClusters} = useSelector((state) => state.cluster);
  const [filterList, setFilterList] = useState([]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isGrouped, setIsGrouped] = useState(true);
  const [activeGroupSelector, setActiveGroupSelector] = useState(0);
  const [continentList, setContinentList] = useState([]);
  const [canaryList, setCanaryList] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [filterButtonVisible, setFilterButtonVisible] = useState(true);

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

      // get continent list and canary list
      let continents = [];
      response.data.forEach(cluster => {
        if(!continents.includes(cluster.labels.continent)) {
          continents.push(cluster.labels.continent);
        }
      });
      setContinentList(continents);
      // get canary list and canary list
      let canaryList = [];
      response.data.forEach(cluster => {
        if(!canaryList.includes(cluster.labels.canary)) {
          canaryList.push(cluster.labels.canary);
        }
      });
      setCanaryList(canaryList);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])

  // useEffect(() => {
  //   let continentGroup = {};
  //   continentList.forEach(continent => {
  //     continentGroup[continent] = allData.filter(el => el.labels.continent == continent);
  //   })
  //   setAllDataByContinent({...continentGroup});
  // }, [allData, continentList])

  useEffect(() => {
    if(isGrouped) {
      if(activeGroupSelector === 0) {
      // if group by continent
      let continentGroup = {};
      continentList.forEach(continent => {
        continentGroup[continent] = allData.filter(el => el.labels.continent == continent);
      })
      setGroupedData({...continentGroup});
      } else if(activeGroupSelector === 1) {
      // if group by canary
      let canaryGroup = {};
      canaryList.forEach(canary => {
        canaryGroup[canary] = allData.filter(el => el.labels.canary == canary);
      })
      setGroupedData({...canaryGroup});
      }
    }
  }, [activeGroupSelector, isGrouped, allData]);

  useEffect(() => {
    if(isGrouped) {
      setFilterButtonVisible(false);
      dispatch(updateVisibleClusters(allData));
    } else {
      setFilterButtonVisible(true);
    }
  }, [isGrouped]);

  useEffect(() => {
    return () => {
      dispatch(updateVisibleClusters(allData))
    };
  }, []);

  const handleSelectFilter = (item, index) => {
    setSelectedFilterIndex(index);
    if(item === 'all') {
      dispatch(updateVisibleClusters(allData));
    } else {
      const filteredData = allData.filter(cluster => cluster.labels.continent == item)
      dispatch(updateVisibleClusters(filteredData));
    }
  }

  const handleIfGroup = event => {
    if(event.target.checked) {
      setIsGrouped(true);
    } else {
      setIsGrouped(false);
    }
  }

  return (
    <div className='short-fleet-list'>
      <div className='short-fleet-list__title'>
        <div className='short-fleet-list__title-main'>
          <img className='icon' src={fleetInfoIcon} />
          <div className='text'>Fleet Information</div>
          <div className='label'>{visibleClusters.length}</div>
        </div>
        <div className={`btn ${filterButtonVisible ? '' : 'is-disabled'}`} onClick={() => {setIsFilterVisible(!isFilterVisible)}}>
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

      <div className={`short-fleet-list__group-selectors ${isGrouped ? 'is-active' : ''}`}>
        <FormControlLabel
          control={
            <Checkbox defaultChecked onChange={handleIfGroup}/>
          }
          label="Group by:"
        />
        <div className={`short-fleet-list__group-selector ${activeGroupSelector === 0 ? 'is-selected' : ''}`} onClick={() => setActiveGroupSelector(0)}>continent</div>
        <div className={`short-fleet-list__group-selector ${activeGroupSelector === 1 ? 'is-selected' : ''}`} onClick={() => setActiveGroupSelector(1)}>canary</div>
      </div>

      <div className='table-wrapper'>
      <table className='short-fleet-list__inner'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cluster</th>
            <th>Version</th>
          </tr>
        </thead>
        {
          isGrouped ? 
          Object.keys(groupedData).map((key, index) => (
            <GroupedClusters groupedData={groupedData} groupLabel={key} />
          )) :
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

const GroupedClusters = props => {
  const [expanded, setExpanded] = useState(false);
  const {groupedData, groupLabel} = props;

  return (
    <Fragment>
      <tr className={`group-label ${expanded ? '' : 'is-hidden'}`} onClick={() => {setExpanded(!expanded)}}>
        <td>{groupLabel.charAt(0).toUpperCase() + groupLabel.slice(1)}<span className='group-label__quantity'>{groupedData[groupLabel].length}</span></td>
        <td></td>
        <td></td>
      </tr>
      {
        <Fragment>
          {
            groupedData[groupLabel].map((data, index) => (
              <tbody
                className={`group-label__content ${expanded ? '' : 'is-hidden'}`}
                onMouseEnter={props.handleHoverIndex ? () => props.handleHoverIndex(index) : null}
                onMouseLeave={props.handleHoverIndex ? () => props.handleHoverIndex(null) : null}
                onClick={props.handleButtonClick ? () => props.handleButtonClick(index) : null}
              >
                <tr>
                  <td>{data.name}</td>
                  <td>{data.node_count}</td>
                  <td>{data.version}</td>
                </tr>
              </tbody>
            ))
          }
        </Fragment>
      }
    </Fragment>
  )
}

export default ShortFleetList;
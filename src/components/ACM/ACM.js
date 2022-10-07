import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import './styles.scss';
import Button from '../Button/Button';
import ToggleButton from '../Button/ToggleButton';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';
import acm_arrow_icon from '../../assets/images/acm-arrow.svg';
import axios from 'axios';
import { updateSelectedTags } from '../../redux/clusterSlice';

const ACM = props => {
  const [appVersions, setAppVersions] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [tags, setTags] = useState({});

  // const { selectedTags } = useSelector((state) => state.cluster);
  const dispatch = useDispatch();

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

  const handleSelectedTags = selectedTags => {
    console.log(selectedTags)
    // flatten array, get tag list
    let tags = [];
    for (const key in selectedTags) {
      selectedTags[key].forEach(el => tags.push(el))
    }
    dispatch(updateSelectedTags(tags))
  }

  return (
    <div className='acm'>
      <div className='acm__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>ACM Fleet Management</div>
      </div>
      <div className='acm__subtitle'>Upgrade/Downgrade application version</div>

      <div className='acm__inner'>
        <div className='acm__inner__version'>
          <div className='version-title'>
              <div className='version-title__line'></div>
              <div>Select App Version :</div>
          </div>
          <div className='version-select'>
            <Select options={appVersions} />
          </div>
        </div>
        <div className='acm__inner__policies'>
          <div className='policy-title'>
            <span>Select Policies :</span>
          </div>
          <div className='policy-policies'>
            <Select options={policies} />
          </div>
        </div>
        <div className='acm__inner__tags'>
          <div className='tag-title'>
            <span>Select Stores by Tag :</span>
          </div>
          <div className='tag-tags'>
            <div className='tag-tags__wrapper'>
              <div className='tag-tags__block'>
                {
                  Object.keys(tags).map((key, index) => {
                    return (
                      <TagBlock
                        tags={tags}
                        tagskey={key}
                        index={index}
                        handleSelectedTags={handleSelectedTags}
                      />
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
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

export default ACM;

const TagBlock = props => {
  const {tags, tagskey, index, handleSelectedTags} = props;
  const [expanded, setExpanded] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedTags, setSelectedTags] = useState(tags);

  useEffect(() => {
    for (let [key, value] of Object.entries(JSON.parse(JSON.stringify(tags)))) {
      selectedTags[key] = [];
    }
  }, [])

  const handleTagClick = (tagskey, el) => {
    if(Object.keys(selectedTags).find(key => key === tagskey)) {
      // remove tag if already added
      if(selectedTags[tagskey].includes(el)) {
        const index = selectedTags[tagskey].indexOf(el);
        if (index > -1) {
          selectedTags[tagskey].splice(index, 1);
        }
      } else {
        // add tag if not included
        selectedTags[tagskey].push(el);
      }
    }
    handleSelectedTags(selectedTags);
  }

  return (
    <div className={`tag-tags__block ${expanded ? 'is-expanded' : ''}`}>
      <div
        className={`tag-tags__block__title ${index === 0 ? 'tag-tags__block__title--first' : ''}`}
        onClick={() => setExpanded(!expanded)}
      >
        <div>{tagskey}</div>
        <img src={acm_arrow_icon} />
      </div>
      <div className='tag-tags__block__tags'>
        {
          tags[tagskey].map((el, index) => (
            <div className='tag-tags__block__tag'>
              <div
                onClick={() => handleTagClick(tagskey, el)}
              >
                <ToggleButton text={el} />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
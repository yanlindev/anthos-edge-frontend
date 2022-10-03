import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './styles.scss';
import Button from '../Button/Button';
import ToggleButton from '../Button/ToggleButton';
import acm_icon from '../../assets/images/acm.svg';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';

const options = [
  { value: 'win9', label: 'Windows 9' },
  { value: 'win10', label: 'Windows 10' },
  { value: 'win11', label: 'Windows 11' }
]

const policies = [
  { value: 'win9', label: 'Disable SSH' },
  { value: 'win10', label: 'Require Limits' },
  { value: 'win11', label: 'Limit to GCP Repos' },
  { value: 'win12', label: 'Restrict External IPs' },
  { value: 'win13', label: 'Create Custom Namespace' },
]

const tags = [
  { value: 'win9', label: 'west' },
  { value: 'win10', label: 'north' },
  { value: 'win11', label: 'south' },
  { value: 'win12', label: 'east' },
]

const animatedComponents = makeAnimated();

const ACM = () => {
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
            <span>Select App Version :</span>
          </div>
          <div className='version-select'>
            <Select options={options} />
          </div>
        </div>
        <div className='acm__inner__policies'>
          <div className='policy-title'>
            <span>Select Policies :</span>
          </div>
          <div className='policy-policies'>
            {
              policies.map(policy => <ToggleButton text={policy.label} />)
            }
            {/* <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={[policies[0]]}
              isMulti
              options={policies}
            /> */}
          </div>
        </div>
        <div className='acm__inner__tags'>
          <div className='tag-title'>
            <span>Select Stores by Tag :</span>
          </div>
          <div className='tag-tags'>
            {
              tags.map(tag => <ToggleButton text={tag.label} />)
            }
            {/* <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={tags}
            /> */}
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
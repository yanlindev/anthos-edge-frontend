import React, { useState, useEffect } from 'react';
import './styles.scss';
import arrow_down from '../../assets/images/arrow-down.svg';
import close_icon from '../../assets/images/close.svg';
import shop_icon from '../../assets/images/shop.svg';
import axios from 'axios';

const Modal = props => {
  const {data} = props;
  const [nodes, setNodes] = useState([]);
  const [logs, setLogs] = useState([]);
  const [dashboard, setDashboard] = useState('');
  const [POS, setPOS] = useState('');
  
  useEffect(() => {
    fetchNodeData();
    getLogs(data.name);
    getDashboard(data.name);
  }, [])

  const fetchNodeData = () => {
    axios.get(`https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/nodes/?cluster_name=${data.name}&location=${data.location}`)
    .then(function (response) {
      // handle success
      console.log(response.data)
      setNodes(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  const handleTerminateNode = index => {
    axios.post(`https://edge-demo-fljjthbteq-uw.a.run.app/testing/chaos/stopnode/`, null, { params: {
      node_zone: nodes[index].name,
      node_name: nodes[index].zone
    }})
    .then(response => {
      if(response.status === 200) {
        fetchNodeData();
      }
    })
    .catch(err => console.log(err));
  }

  const getDashboard = name => {
    axios.get(`https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/urls/?cluster_name=${name}`)
    .then(response => {
      setPOS(response.data.pages[0]);
      setDashboard(response.data.pages[1]);
    })
    .catch(err => console.log(err));
  }

  const getLogs = name => {
    axios.get(`https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/logs/?cluster_name=${name}&row_count=30`)
    .then(response => {
      console.log(response.data)
      setLogs(response.data);
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='modal'>
      <div className='modal__inner'>
        <div className='modal__inner__header'>
          <div className='title'>
            <img src={shop_icon} />
            <span>{data.name}</span>
          </div>
          <img
            className='modal__inner__close'
            src={close_icon}
            onClick={props.handleClose}
          />
        </div>

        <div className='modal__inner__content'>
          <div className='modal__inner__content__nodes'>
            <div className='modal__inner__content__nodes__header'>Nodes</div>
            {
              nodes.map((node, index) => (
                <NodeRow
                  data={node}
                  index={index}
                  handleTerminateNode={handleTerminateNode}
                />
              ))
            }
          </div>
          <div className='modal__inner__content__dashboard'>
            <div className='modal__inner__content__dashboard__header'>In-Store Dashboard</div>
            <iframe src={dashboard} frameborder="0"></iframe>
          </div>

          <div className='modal__inner__content__pos'>
            <div className='modal__inner__content__pos__header'>POS</div>
            <iframe src={POS} frameborder="0"></iframe>
          </div>

          <div className='modal__inner__content__logs'>
            <div className='modal__inner__content__logs__header'>Real-time Application Logs</div>
            <div className='modal__inner__content__logs__inner'>
              {
                logs.map(row => (
                  <LogRow data={row} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NodeRow = props => {
  const {data, index, handleTerminateNode} = props;

  return (
    <div className={`modal__inner__content__nodes__row`} key={index}>
      <div>{data.name}</div>
      <div>{data.ip}</div>
      <div>{data.instance_type}</div>
      <div
        className={`row-button ${data.status === 'RUNNING' ? 'row-button--running' : 'row-button--stopped'}`}
        onClick={() => handleTerminateNode(index)}
      >{data.status === 'RUNNING' ? 'Stop' : 'Start'}</div>
    </div>
  )
}

const LogRow = props => {
  const {data} = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`modal__inner__content__logs__log ${expanded ? 'is-expanded' : ''}`}>
      <div className='modal__inner__content__logs__log__title' onClick={() => {setExpanded(!expanded)}}>
        <div className='severity'>{data.severity}</div>
        <div className='timestamp'>{data.timestamp}</div>
        <img className='icon' src={arrow_down} />
      </div>
      <div className={`modal__inner__content__logs__log__data`}>{data.data}</div>
    </div>
  )
}

export default Modal;
import React, { useState, useEffect } from 'react';
import './styles.scss';
import close_icon from '../../assets/images/close.svg';
import shop_icon from '../../assets/images/shop.svg';
import axios from 'axios';

const Modal = props => {
  const {data} = props;
  const [nodes, setNodes] = useState([]);
  
  useEffect(() => {
    fetchNodeData();
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
            <div className='modal__inner__content__nodes__header'>In-Store Dashboard</div>
            <iframe src="https://google.com/" frameborder="0"></iframe>
          </div>
          <div className='modal__inner__content__logs'>
            <div className='modal__inner__content__logs__header'>Real-time Application Logs</div>
            <iframe src="https://google.com/" frameborder="0"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

const NodeRow = props => {
  const {data, index, handleTerminateNode} = props;
  console.log(data)

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

export default Modal;
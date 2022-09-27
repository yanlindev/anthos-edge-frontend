import React from 'react';
import './styles.scss';
import close_icon from '../../assets/images/close.svg';
import shop_icon from '../../assets/images/shop.svg';

const Modal = props => {
  return (
    <div className='modal'>
      <div className='modal__inner'>
        <div className='modal__inner__header'>
          <div className='title'>
            <img src={shop_icon} />
            <span>Store - hardcoded</span>
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
            <div className='modal__inner__content__nodes__row'>
              <div>Node-1</div>
              <div>ip: 10.1.2.1</div>
              <div className='row-status'>active</div>
              <div className='row-button'>Terminate</div>
            </div>
            <div className='modal__inner__content__nodes__row'>
              <div>Node-1</div>
              <div>ip: 10.1.2.1</div>
              <div className='row-status'>active</div>
              <div className='row-button'>Terminate</div>
            </div>
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

export default Modal;
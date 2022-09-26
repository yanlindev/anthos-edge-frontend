import React from 'react';
import './styles.scss';
import close_icon from '../../assets/images/close.svg';

const Modal = props => {
  return (
    <div className='modal'>
      <div className='modal__inner'>
        <img
          src={close_icon}
          onClick={props.handleClose}
        />
      </div>
    </div>
  )
}

export default Modal;
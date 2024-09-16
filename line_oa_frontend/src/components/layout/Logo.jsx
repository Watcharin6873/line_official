import React from 'react'
import { FireFilled } from '@ant-design/icons'
import img_logo from '../../assets/icon-web2-02.png'

function Logo() {
  return (
    <div className='logo' >
        <div className='logo-icon'>
            <img src={img_logo} alt='logo' style={{width: '80px', marginTop: '0px'}} />
        </div>
    </div>
  )
}

export default Logo
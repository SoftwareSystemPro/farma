import React from 'react'
import s from './index.module.scss'
import Logo from '../logo.png'
import { SearchOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import ShoppingIcon from '../shopping-bag.svg'
import { Button } from 'antd';

interface HeaderProps {
  headerProp: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}


export const Header: React.FC<HeaderProps> = ({headerProp}) => {
  const {setOpen} = headerProp
  return (
    <div className={s.header_section}>
      <div className={s.header_container}>
        <div className={s.header_wrapper}>
          <div className={s.header_logo}>
            <img src={Logo} alt="" />
          </div>
          <div className={s.search_block}>
            <div className={s.search_input_block}>
              <input placeholder='Qidiruv' type="search" />
              <div className={s.icon_block}>
                <i className='bx bx-search' style={{color: "#fff"}}></i>
              </div>
            </div>
          </div>
          <div className={s.btn_wrapper}>
            <NavLink className={s.cart_link} to={"#"}>
              <img src={ShoppingIcon} className={s.cart_icon} />
            </NavLink>
            {/* <button className={s.history_btn}>History</button> */}
            <Button onClick={() => setOpen(true)} className={s.history_btn}>Buyurtmalar tarixi</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


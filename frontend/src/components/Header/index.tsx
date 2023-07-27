import React, { FC } from 'react'
import { observer } from 'mobx-react-lite';
import { LogoutOutlined } from '@ant-design/icons';
import { useStore } from '@store/provider';
import Menu from '../Menu';
import styles from './style.less'

interface IHeader {
  collapsed: boolean,
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<IHeader> = observer(({
  collapsed,
  setCollapsed,
}) => {
  const {
    isAuth,
    user,
    setUser,
  } = useStore()

  const logout = () => {
    setUser(null)
  }

  return (
    <div className={styles.header}>
      {isAuth && (
        <>
          <Menu
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <div className={styles.email}>{user?.login}</div>
          <LogoutOutlined
            onClick={logout}
            style={{ color: 'white', fontSize: 16, cursor: 'pointer' }}
          />
        </>
      )}
    </div>
  )
})

export default Header

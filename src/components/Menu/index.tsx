import { Button, Menu as AntMenu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React, {
  Dispatch, FC, useLayoutEffect, useState,
} from 'react'
import { observer } from 'mobx-react-lite'
import styles from './style.less'
import { useStore } from '../../store/provider'
import api from '../../api';
import { ILeague } from '../../types';

interface IMenu {
  collapsed: boolean,
  setCollapsed: Dispatch<boolean>
}

const Menu : FC<IMenu> = observer(({
  collapsed,
  setCollapsed,
}) => {
  const { setActiveLeagueId } = useStore()

  const [leagues, setLeagues] = useState<ILeague[]>([])

  useLayoutEffect(() => {
    if (!leagues.length) {
      api.getLeagues().then(setLeagues)
    }
  }, [])

  const onSelect = item => {
    setActiveLeagueId(item.key)
    setCollapsed(true)
  }

  return (
    <div style={{ width: 256 }} className={styles.menu}>
      <Button
        type="ghost"
        className={styles.collapseButton}
        onClick={() => setCollapsed(!collapsed)}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      />
      <AntMenu
        defaultSelectedKeys={[leagues[0]?.name]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onSelect={onSelect}
      >
        {leagues.map(({ name, logo, id }) => (
          <AntMenu.Item key={id}>
            <img
              alt={name}
              style={{
                width: 24,
                height: 24,
                marginRight: 8,
              }}
              src={logo}
            />
            {' '}
            {name}
          </AntMenu.Item>
        ))}
      </AntMenu>
    </div>
  )
})

export default Menu

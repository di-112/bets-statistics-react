import React, {
  Dispatch, FC, useLayoutEffect, useState,
} from 'react'
import { Button, Menu as AntMenu } from 'antd'
import { observer } from 'mobx-react-lite'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import api from '@api';
import { LEAGUES } from '@enums';
import { useStore } from '@store/provider'
import { ILeague } from '@types';
import styles from './style.less'

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
    <div
      style={{ width: 256 }}
      className={styles.menu}
    >
      <Button
        type="ghost"
        className={styles.collapseButton}
        onClick={() => setCollapsed(!collapsed)}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      />
      <AntMenu
        defaultSelectedKeys={[LEAGUES[1].toString()]}
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

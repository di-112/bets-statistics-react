import { Button, Menu as AntMenu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React, { Dispatch, FC } from 'react'
import { observer } from 'mobx-react-lite'
import styles from './style.less'
import { LEAGUES } from '../../enums'
import { useStore } from '../../store/provider'

const LEAGUES_NAMES = Object.keys(LEAGUES)

interface IMenu {
  collapsed: boolean,
  setCollapsed: Dispatch<boolean>
}

const Menu : FC<IMenu> = observer(({
  collapsed,
  setCollapsed,
}) => {
  const { setActiveLeagueId } = useStore()

  const onSelect = item => {
    setActiveLeagueId(LEAGUES[item.key])
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
        defaultSelectedKeys={[LEAGUES_NAMES[0]]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onSelect={onSelect}
      >
        {LEAGUES_NAMES.map(league => (
          <AntMenu.Item key={league}>
            {league}
          </AntMenu.Item>
        ))}
      </AntMenu>
    </div>
  )
})

export default Menu

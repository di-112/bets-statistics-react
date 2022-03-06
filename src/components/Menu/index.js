import { Button, Menu as AntMenu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React from 'react'
import { observer } from 'mobx-react-lite'
import styles from './style.less'
import { LEAGUES } from '../../enums'
import store from '../../store/store'

const LEAGUES_NAMES = Object.keys(LEAGUES)

const Menu = observer(({
  collapsed,
  setCollapsed,
}) => (
  <div style={{ width: 256 }} className={styles.menu}>
    <Button
      type="ghost"
      className={styles.collapseButton}
      onClick={() => setCollapsed(old => !old)}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
    </Button>
    <AntMenu
      defaultSelectedKeys={[LEAGUES_NAMES[0]]}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      onSelect={item => {
        store.setActiveLeagueId(LEAGUES[item.key])
        setCollapsed(true)
      }}
    >
      {LEAGUES_NAMES.map(league => (
        <AntMenu.Item key={league}>
          {league}
        </AntMenu.Item>
      ))}
    </AntMenu>
  </div>
))

export default Menu

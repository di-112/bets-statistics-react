import { Button, Menu as AntMenu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React from 'react'
import styles from './style.less'

const Menu = ({
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
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
    >
      <AntMenu.Item key="1">
        Option 1
      </AntMenu.Item>
      <AntMenu.Item key="2">
        Option 2
      </AntMenu.Item>
      <AntMenu.Item key="3">
        Option 3
      </AntMenu.Item>
    </AntMenu>
  </div>
)

export default Menu

import React from 'react'
import { Spin } from 'antd'
import classnames from 'classnames/bind'
import { observer } from 'mobx-react-lite'
import { LoadingOutlined } from '@ant-design/icons'
import Toolbar from './components/Toolbar'
import Table from './components/Table'
import store from '../../store/store'
import styles from './style.less'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const cn = classnames.bind(styles)

const MainContent = observer(({ isOpenMenu }) => (
  <Spin indicator={antIcon} spinning={false}>
    <div className={cn('main', { blur: isOpenMenu })}>
      <div className={styles.wrapper}>
        <Toolbar />
        <Table dataSource={store.bets} />
      </div>
    </div>
  </Spin>
))

export default MainContent

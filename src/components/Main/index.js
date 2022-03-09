import React from 'react'
import classnames from 'classnames/bind'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Table from './components/Table'
import styles from './style.less'
import Toolbar from './components/Toolbar'
import store from '../../store/store'

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

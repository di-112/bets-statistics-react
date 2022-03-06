import React from 'react'
import classnames from 'classnames/bind'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import Table from './components/Table'
import styles from './style.less'
import Toolbar from './components/Toolbar'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const cn = classnames.bind(styles)

const bets = [{
  key: 10,
  home: 'Манчестер Юнайтед',
  visit: 'Уотфорд',
  bet: 'П2',
  sum: 100,
  result: 'Выиграш',
}]

const MainContent = ({ isOpenMenu }) => (
  <Spin indicator={antIcon} spinning={false}>
    <div className={cn('main', { blur: isOpenMenu })}>
      <div className={styles.wrapper}>
        <Toolbar />
        <Table dataSource={new Array(50).fill('').map(() => bets[0])} />
      </div>
    </div>
  </Spin>
)

export default MainContent

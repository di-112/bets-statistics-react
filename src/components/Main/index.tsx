import React, { FC, useState } from 'react'
import { Spin } from 'antd'
import classnames from 'classnames/bind'
import { observer } from 'mobx-react-lite'
import { LoadingOutlined } from '@ant-design/icons'
import Toolbar from './components/Toolbar'
import Table from './components/Table'
import styles from './style.less'
import Statistic from './components/Statistic'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const cn = classnames.bind(styles)

interface IMainContent {
  isOpenMenu: boolean
}

const MainContent: FC<IMainContent> = observer(({ isOpenMenu }) => {
  const [selected, setSelected] = useState<number[]>([])

  return (
  // @ts-ignore
    <Spin indicator={antIcon} spinning={false}>
      <div className={cn('main', { blur: isOpenMenu })}>
        <div className={styles.wrapper}>
          <Toolbar selected={selected} />
          <Table setSelected={setSelected} />
          <Statistic />
        </div>
      </div>
    </Spin>
  )
})

export default MainContent

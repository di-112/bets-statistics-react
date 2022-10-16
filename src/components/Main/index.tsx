import React, { FC, useState } from 'react'
import { Spin } from 'antd'
import classnames from 'classnames/bind'
import { observer } from 'mobx-react-lite'
import { LoadingOutlined } from '@ant-design/icons'
import { useStore } from '@store/provider';
import Statistic from './components/Statistic'
import Table from './components/Table'
import Toolbar from './components/Toolbar'
import styles from './style.less'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const cn = classnames.bind(styles)

interface IMainContent {
  isOpenMenu: boolean
}

const MainContent: FC<IMainContent> = observer(({ isOpenMenu }) => {
  const [selected, setSelected] = useState<number[]>([])

  const { isLoading } = useStore()

  return (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    <Spin indicator={antIcon} spinning={isLoading}>
      <div className={cn('main', { blur: isOpenMenu })}>
        <div className={styles.wrapper}>
          <Toolbar
            selected={selected}
            setSelected={setSelected}
          />
          <Table setSelected={setSelected} />
          <Statistic />
        </div>
      </div>
    </Spin>
  )
})

export default MainContent

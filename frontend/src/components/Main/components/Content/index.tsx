import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@store/provider';
import { IBet } from '@types'
import Statistic from '../Statistic';
import Table from '../Table';
import Toolbar from '../Toolbar';
import styles from './style.less'

interface IContent {
  selected: IBet[],
  setSelected: React.Dispatch<React.SetStateAction<IBet[]>>,
}

const Content: FC<IContent> = observer(({
  selected = [],
  setSelected = () => {
  },
}) => {
  const navigate = useNavigate();

  const { isAuth } = useStore()

  useEffect(() => {
    console.log({ isAuth })
    if (!isAuth) {
      navigate('/auth')
    }
  }, [isAuth])

  return (
    <div className={styles.wrapper}>
      <Toolbar
        selected={selected}
        setSelected={setSelected}
      />
      <Table
        selected={selected}
        setSelected={setSelected}
      />
      <Statistic />
    </div>
  )
})

export default Content

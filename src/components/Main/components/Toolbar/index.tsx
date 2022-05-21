import React, { FC } from 'react'
import { Button, DatePicker } from 'antd'
import {
  CloseCircleOutlined, DeleteOutlined, PlusOutlined, SaveOutlined,
} from '@ant-design/icons'
import { observer } from 'mobx-react-lite'

import moment, { Moment } from 'moment'
import { useStore } from '../../../../store/provider'
import styles from './style.less'
import { checkBets, openNotification } from '../../../../utils'
import localStorageService from '../../../../localStorage/localStorageService'

interface IToolbar {
  selected: number[]
}

const Toolbar: FC<IToolbar> = observer(({ selected }) => {
  const {
    activeLeagueId,
    setBets,
    addBet,
    onSave,
    deleteBets,
    unsavedBets,
  } = useStore()

  const onSaveValidate = () => {
    if (checkBets(unsavedBets)) {
      onSave()
      return
    }
    openNotification({
      message: 'Ошибка',
      description: 'Не заполнены обязательные поля',
      icon: <CloseCircleOutlined style={{ color: 'red' }} />,
    })
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.date}>
        Месяц:
        <DatePicker.MonthPicker
          allowClear={false}
          className={styles.picker}
          defaultValue={moment()}
          onChange={(month : Moment) => { setBets(localStorageService.get(activeLeagueId, month)) }}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          type="primary"
          onClick={addBet}
          icon={<PlusOutlined style={{ fontSize: 11 }} />}
        />
        <Button
          type="ghost"
          icon={(<DeleteOutlined style={{ fontSize: 13 }} />)}
          disabled={!selected.length}
          onClick={() => deleteBets(selected)}
        />
        <Button
          type="primary"
          onClick={onSaveValidate}
          disabled={!unsavedBets.length}
          icon={<SaveOutlined style={{ fontSize: 13 }} />}
        />
      </div>
    </div>
  )
})

export default Toolbar

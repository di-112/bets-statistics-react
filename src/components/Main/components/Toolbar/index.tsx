import React, { FC } from 'react'
import { Button, DatePicker } from 'antd'
import {
  CloseCircleOutlined, DeleteOutlined, PlusOutlined, SaveOutlined,
} from '@ant-design/icons'
import { observer } from 'mobx-react-lite'

import moment, { Moment } from 'moment'
import { useStore } from '../../../../store/provider'
import styles from './style.less'
import { getErrorsBets, openNotification } from '../../../../utils'
import api from '../../../../api';
import { DATE_FORMAT } from '../../../../enums';

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
    setErrorField,
  } = useStore()

  const onSaveValidate = async () => {
    const errors = getErrorsBets(unsavedBets)

    if (!errors.length) {
      setErrorField([])
      await onSave()
      return
    }
    setErrorField(errors)
    openNotification({
      message: 'Ошибка',
      description: 'Ставка указана неверно',
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
          onChange={async (month : Moment) => {
            const bets = await api.getBets(activeLeagueId, month.format(DATE_FORMAT))

            setBets(bets)
          }}
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

import React, { FC, useEffect } from 'react'
import { Button, DatePicker, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import {
  CloseCircleOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined, SaveOutlined,
} from '@ant-design/icons'
import api from '@api';
import { DATE_FORMAT } from '@enums';
import { useStore } from '@store/provider'
import { IBet } from '@types';
import { getErrorsBets, openNotification } from '@utils'
import styles from './style.less'

interface IToolbar {
  selected: IBet[],
  setSelected: (rows: IBet[]) => void
}

const Toolbar: FC<IToolbar> = observer(({
  selected,
  setSelected,
}) => {
  const {
    isAuth,
    activeLeagueId,
    setBets,
    addBet,
    onSave,
    date,
    setDate,
    setAnalytics,
    deleteBets,
    unsavedBets,
    refreshBets,
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

  useEffect(() => {
    if (!isAuth) {
      return
    }
    api.getBets(activeLeagueId, date?.format(DATE_FORMAT))
      .then(({ bets, analytics }) => {
        setAnalytics(analytics)
        setBets(bets)
      })
  }, [date, isAuth])

  return (
    <div className={styles.toolbar}>
      <div className={styles.date}>
        Месяц:
        <DatePicker.MonthPicker
          allowClear={false}
          className={styles.picker}
          placeholder="Выберите месяц"
          value={date}
          onChange={setDate}
        />
        <Button
          className={styles.showAllButton}
          disabled={!date}
          type="primary"
          onClick={() => {
            setDate(null)
          }}
        >
          Показать все
        </Button>
      </div>
      <div className={styles.buttons}>
        <Tooltip title="Обновить">
          <Button
            type="primary"
            onClick={refreshBets}
            icon={<ReloadOutlined style={{ fontSize: 12 }} />}
          />
        </Tooltip>
        <Tooltip title="Добавить ставку">
          <Button
            type="primary"
            onClick={addBet}
            icon={<PlusOutlined style={{ fontSize: 11 }} />}
          />
        </Tooltip>
        <Tooltip title="Удалить ставки">
          <Button
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            type="danger"
            icon={(<DeleteOutlined style={{ fontSize: 13 }} />)}
            disabled={!selected.length}
            onClick={() => {
              deleteBets(selected)
              setSelected([])
            }}
          />
        </Tooltip>
        <Tooltip title="Сохранить">
          <Button
            type="primary"
            onClick={onSaveValidate}
            disabled={!unsavedBets.length}
            icon={<SaveOutlined style={{ fontSize: 13 }} />}
          />
        </Tooltip>
      </div>
    </div>
  )
})

export default Toolbar

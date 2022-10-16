import React, { FC, useEffect } from 'react'
import { Button, DatePicker, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import api from '@api';
import { DATE_FORMAT } from '@enums';
import { useStore } from '@store/provider'
import { getErrorsBets, openNotification } from '@utils'

interface IToolbar {
  selected: number[],
  setSelected: (numbers: number[]) => void
}

const DateContainer = styled.div``
const ButtonContainer = styled.div``

const StyledToolbar = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${DateContainer} {
    display: flex;
    align-items: center;
    font-weight: 700;

    .ant-picker {
      height: 24px;
      margin: 0 10px;
    }

    button {
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  ${ButtonContainer} {
    button {
      height: 24px;
      width: 24px;
      margin-right: 8px;

      &:last-child {
        margin-left: 0;
      }
    }
  }
`

const Toolbar: FC<IToolbar> = observer(({
  selected,
  setSelected,
}) => {
  const {
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
    api.getBets(activeLeagueId, date?.format(DATE_FORMAT))
      .then(({ bets, analytics }) => {
        setAnalytics(analytics)
        setBets(bets)
      })
  }, [date])

  return (
    <StyledToolbar>
      <DateContainer>
        Месяц:
        <DatePicker.MonthPicker
          allowClear={false}
          placeholder="Выберите месяц"
          value={date}
          onChange={setDate}
        />
        <Button
          disabled={!date}
          type="primary"
          onClick={() => {
            setDate(null)
          }}
        >
          Показать все
        </Button>
      </DateContainer>
      <ButtonContainer>
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
      </ButtonContainer>
    </StyledToolbar>
  )
})

export default Toolbar

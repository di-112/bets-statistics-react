import React, { FC } from 'react'
import { Button } from 'antd'
import {
  PlusOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined,
} from '@ant-design/icons'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../../../store/provider'
import styles from './style.less'
import { checkBet, checkBets, openNotification } from '../../../../utils'

interface IToolbar {
  selected: number[]
}

const Toolbar: FC<IToolbar> = observer(({ selected }) => {
  const {
    addBet,
    onSave,
    deleteBets,
    unsavedBets,
  } = useStore()

  const onSaveValidate = () => {
    console.log('unsavedBets: ', unsavedBets)

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
  )
})

export default Toolbar

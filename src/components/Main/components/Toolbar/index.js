import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../store/provider'
import styles from './style.less'

const Toolbar = observer(({ selected }) => {
  const {
    addBet, onSave, deleteBets, isUnsaved,
  } = useStore()

  return (
    <div className={styles.toolbar}>
      <Button
        type="primary "
        onClick={addBet}
        icon={<PlusOutlined style={{ fontSize: 11 }} />}
      />
      <Button
        type="danger"
        icon={(<DeleteOutlined style={{ fontSize: 13 }} />)}
        disabled={!selected.length}
        onClick={() => deleteBets(selected)}
      />
      <Button
        type="primary "
        onClick={onSave}
        disabled={!isUnsaved}
        icon={<SaveOutlined style={{ fontSize: 13 }} />}
      />
    </div>
  )
})

export default Toolbar

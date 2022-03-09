import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import styles from './style.less'
import store from '../../../../store/store'

const Toolbar = observer(() => (
  <div className={styles.toolbar}>
    <Button onClick={store.addBet} type="primary " icon={<PlusOutlined style={{ fontSize: 11 }} />} />
    <Button type="danger" icon={<DeleteOutlined style={{ fontSize: 13 }} />} />
    <Button onClick={store.onSave} disabled={store.isDisableSaveButton} type="primary " icon={<SaveOutlined style={{ fontSize: 13 }} />} />
  </div>
))

export default Toolbar

import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './style.less'

const Toolbar = () => (
  <div className={styles.toolbar}>
    <Button type="primary " icon={<PlusOutlined style={{ fontSize: 11 }} />} />
    <Button type="danger" icon={<DeleteOutlined style={{ fontSize: 13 }} />} />
  </div>
)

export default Toolbar

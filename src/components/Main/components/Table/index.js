import React from 'react'
import { Select, Table as AntTable } from 'antd'
import styles from './style.less'

const { Option } = Select

const columns = [
  {
    title: 'Матч',
    dataIndex: 'home',
    colSpan: 2,
    width: '20%',
    align: 'center',
    render: () => (
      <Select defaultValue="lucy" style={{ width: '100%' }} allowClear>
        <Option value="lucy">Lucy</Option>
      </Select>
    ),
  },
  {
    title: 'Матч',
    dataIndex: 'visit',
    width: '20%',
    colSpan: 0,
    align: 'center',
    render: () => (
      <Select defaultValue="lucy" style={{ width: '100%' }} allowClear>
        <Option value="lucy">Lucy</Option>
      </Select>
    ),
  },
  {
    title: 'Ставка',
    dataIndex: 'bet',
    align: 'center',
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    align: 'center',
  },
  {
    title: 'Исход',
    dataIndex: 'result',
    align: 'center',
  },
]

const Table = ({ dataSource }) => (
  <AntTable
    className={styles.table}
    dataSource={dataSource}
    columns={columns}
    size="small"
    bordered
    footer={() => <div className={styles.tableFooter} />}
    onRow={(record, rowIndex) => ({
      onClick: event => console.log('click row', event), // click row
      onDoubleClick: event => console.log('double click row', event), // double click row
      onContextMenu: event => console.log('right button click row', event), // right button click row
      onMouseEnter: event => console.log('mouse enter row', event), // mouse enter row
      onMouseLeave: event => console.log('mouse leave row', event), // mouse leave row
    })}
  />
)

export default Table

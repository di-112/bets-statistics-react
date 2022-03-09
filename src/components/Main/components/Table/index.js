import React from 'react'
import { DatePicker, Table as AntTable } from 'antd'
import { observer } from 'mobx-react-lite'
import store from '../../../../store/store'
import styles from './style.less'
import { BETS, DATE_FORMAT, RESULTS } from '../../../../enums'
import Select from '../Select'

const Table = observer(({ dataSource }) => {
  const columns = [
    {
      title: 'Дата',
      dataIndex: 'date',
      align: 'center',
      width: '20%',
      render: (text, record) => (record.isNew
        ? <DatePicker format={DATE_FORMAT} />
        : text),
    },
    {
      title: 'Матч',
      dataIndex: 'home',
      colSpan: 2,
      width: '20%',
      align: 'center',
      render: (text, record) => (record.isNew
        ? <Select options={store.teams} />
        : text),
    },
    {
      title: 'Матч',
      dataIndex: 'visit',
      width: '20%',
      colSpan: 0,
      align: 'center',
      render: (text, record) => (record.isNew
        ? <Select options={store.teams} />
        : text),
    },
    {
      title: 'Ставка',
      dataIndex: 'bet',
      width: '10%',
      align: 'center',
      render: (text, record) => (record.isNew
        ? <Select options={BETS} />
        : text),
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      width: '15%',
      align: 'center',
    },
    {
      title: 'Исход',
      dataIndex: 'result',
      align: 'center',
      render: (text, record) => (record.isNew
        ? <Select options={Object.values(RESULTS)} />
        : text),
    },
  ]

  return (
    <AntTable
      className={styles.table}
      dataSource={dataSource}
      columns={columns}
      size="small"
      bordered
      footer={() => <div className={styles.tableFooter} />}
      onRow={(record, rowIndex) => ({
        /* onClick: event => console.log('click row', event), // click row
            onDoubleClick: event => console.log('double click row', event), // double click row
            onContextMenu: event => console.log('right button click row', event), // right button click row
            onMouseEnter: event => console.log('mouse enter row', event), // mouse enter row
            onMouseLeave: event => console.log('mouse leave row', event), // mouse leave row */
      })}
    />
  )
})

export default Table

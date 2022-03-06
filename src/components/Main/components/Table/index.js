import React from 'react'
import { Select, Table as AntTable } from 'antd'
import { observer } from 'mobx-react-lite'
import store from '../../../../store/store'
import styles from './style.less'
import { BETS } from '../../../../enums'

const { Option } = Select

const Table = observer(({ dataSource }) => {
  console.log('store.teams: ', store.teams)

  const columns = [
    {
      title: 'Матч',
      dataIndex: 'home',
      colSpan: 2,
      width: '20%',
      align: 'center',
      render: () => (
        <Select style={{ width: '100%' }} allowClear>
          {store.teams.map(({ team }) => (
            <Option value={team.name}>
              <img src={team.logo} alt={team.name} style={{ width: 20, height: 20 }} />
              {' '}
              {team.name}
            </Option>
          ))}
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
        <Select style={{ width: '100%' }} allowClear>
          {store.teams.map(({ team }) => (
            <Option value={team.name}>
              <img src={team.logo} alt={team.name} style={{ width: 20, height: 20 }} />
              {' '}
              {team.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Ставка',
      dataIndex: 'bet',
      align: 'center',
      render: () => (
        <Select style={{ width: '100%' }} allowClear>
          {BETS.map(bet => (
            <Option value={bet}>
              {bet}
            </Option>
          ))}
        </Select>
      ),
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

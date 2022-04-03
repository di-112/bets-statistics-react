import React, { useMemo } from 'react'
import { Table as AntTable } from 'antd'
import { observer } from 'mobx-react-lite'
import styles from './style.less'

import { getColumns } from './getColumns'
import { useStore } from '../../../../store/provider'

const Table = observer(({ setSelected }) => {
  const { bets, teams, changeBet } = useStore()

  const columns = useMemo(() => getColumns(teams, changeBet), [teams, changeBet])

  const rowSelection = {
    onChange: setSelected,
  }

  return (
    <AntTable
      className={styles.table}
      rowSelection={rowSelection}
      dataSource={bets}
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

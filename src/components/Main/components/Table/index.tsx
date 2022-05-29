import React, { Dispatch, FC, useMemo } from 'react'
import { Table as AntTable } from 'antd'
import { observer } from 'mobx-react-lite'
import { ColumnsType } from 'antd/es/table'
import styles from './style.less'

import { getColumns } from './getColumns'
import { useStore } from '../../../../store/provider'
import { IBet } from '../../../../types'

interface ITable {
  setSelected: Dispatch<number[]>
}

const Table: FC<ITable> = observer(({ setSelected }) => {
  const {
    bets, teams, changeBet, errorFields,
  } = useStore()

  console.log('errorFields: ', errorFields)

  const columns = useMemo<ColumnsType<IBet>>(
    () => getColumns(teams, changeBet, errorFields),
    [teams, changeBet, errorFields],
  )

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
    />
  )
})

export default Table

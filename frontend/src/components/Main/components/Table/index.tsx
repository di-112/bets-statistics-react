import React, { Dispatch, FC, useMemo } from 'react'
import { Table as AntTable } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { observer } from 'mobx-react-lite'
import { useStore } from '@store/provider'
import { IBet } from '@types';
import { getColumns } from './getColumns'
import styles from './style.less'

interface ITable {
  selected: IBet[],
  setSelected: Dispatch<IBet[]>
}

const Table: FC<ITable> = observer(({ setSelected, selected }) => {
  const {
    bets,
    teams,
    changeBet,
    errorFields,
  } = useStore()

  const columns = useMemo<ColumnsType<IBet>>(
    () => getColumns(teams, changeBet, errorFields),
    [teams, changeBet, errorFields],
  )

  const rowSelection = {
    onChange: (selectedKeys, selectedData) => {
      setSelected(selectedData)
    },
    selectedRowKeys: selected.map(({ key }) => key),
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

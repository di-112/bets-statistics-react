import React, { Dispatch, FC } from 'react'
import { Table as AntTable } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '@store/provider'
import { IBet } from '../../../../types';
import { columns } from './resources/columns'
import styles from './style.less'

interface TableProps {
    selected: IBet[],
    setSelected: Dispatch<IBet[]>
}

const Table: FC<TableProps> = observer(({ setSelected, selected }) => {
    const {
        bets,
    } = useStore()

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

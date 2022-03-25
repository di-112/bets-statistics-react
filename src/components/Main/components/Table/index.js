import React from 'react'
import { Table as AntTable } from 'antd'
import { observer } from 'mobx-react-lite'
import styles from './style.less'
import { getColumns } from './helpers'

const Table = observer(({ dataSource }) => (
  <AntTable
    className={styles.table}
    dataSource={dataSource}
    columns={getColumns()}
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
))

export default Table

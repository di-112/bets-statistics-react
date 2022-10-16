import React, { Dispatch, FC, useMemo } from 'react'
import { Table as AntTable } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components';
import { useStore } from '@store/provider'
import { IBet } from '@types';
import TableFooter from './Footer';
import { getColumns } from './getColumns'

const StyledTable = styled(AntTable)`
  height: ${props => css`calc(100% - 36px - ${props.theme.statisticHeight})`};
  margin: 0 auto;
  position: relative;

  .ant-pagination {
    margin: 8px 0;

    li {
      height: 16px;
      min-height: 16px;
      width: 16px;
    }
  }

  .ant-spin-nested-loading {
    height: 100%
  }

  .error {
    border-color: red;
    >div {
      border-color: red !important;
    }
  }

  .ant-spin-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .ant-table {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;

      &.ant-table-empty table {
        height: 100%;
      }

      tr td:last-child {
        border-right: none !important;
      }

      .ant-table-container {
        flex: 1 1 auto;
        border-right: 1px solid #f0f0f0;

        .ant-table-content {
          height: 100%
        }
      }
    } 
  }`

interface ITable {
  setSelected: Dispatch<number[]>
}

const Table: FC<ITable> = observer(({ setSelected }) => {
  const {
    bets, teams, changeBet, checkCellError, errorFields,
  } = useStore()

  const columns = useMemo<ColumnsType<IBet>>(
    () => getColumns(teams, changeBet, checkCellError),
    [teams, changeBet, errorFields],
  )

  const rowSelection = {
    onChange: setSelected,
  }

  return (
    <StyledTable
      rowSelection={rowSelection}
      dataSource={bets}
      columns={columns}
      size="small"
      bordered
      footer={() => <TableFooter />}
    />
  )
})

export default Table

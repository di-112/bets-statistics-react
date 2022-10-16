import React from 'react'
import { DatePicker, InputNumber } from 'antd'
import { ColumnsType } from 'antd/es/table'
import cn from 'classnames';
import { Moment } from 'moment'
import {
  BETS, COLUMNS, DATE_FORMAT, RESULTS,
} from '@enums'
import { IBet, ITeam } from '@types'
import Select from '../Select'
import ResultCell from './components/ResultCell'
import TeamCell from './components/TeamCell'

export const getColumns = (
  teams: ITeam[],
  changeBet: (key: number | string, field: string, data: any) => void,
  checkCellError: (record: IBet, field: string) => boolean,
) : ColumnsType<IBet> => [
  {
    title: 'Дата',
    dataIndex: COLUMNS.date,
    align: 'center',
    width: '15%',
    render: (date, record) => (record.isNew
      ? (
        <DatePicker
          className={cn({ error: checkCellError(record, COLUMNS.date) })}
          onChange={(value: Moment) => changeBet(record.key, COLUMNS.date, value.format(DATE_FORMAT))}
          format={DATE_FORMAT}
        />
      )
      : date),
  },
  {
    title: 'Матч',
    dataIndex: COLUMNS.home,
    colSpan: 2,
    width: '20%',
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <Select
          className={cn({ error: checkCellError(record, COLUMNS.home) })}
          options={teams}
          onChange={value => changeBet(record.key, COLUMNS.home, teams.find(team => team.name === value))}
        />
      )
      : (
        record.home && <TeamCell team={record.home} />)),
  },
  {
    title: 'Матч',
    dataIndex: COLUMNS.visit,
    width: '20%',
    colSpan: 0,
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <Select
          className={cn({ error: checkCellError(record, COLUMNS.visit) })}
          onChange={value => changeBet(
            record.key,
            COLUMNS.visit,
            teams.find(team => team.name === value),
          )}
          options={teams}
        />
      )
      : record.visit && <TeamCell team={record.visit} />),
  },
  {
    title: 'Ставка',
    dataIndex: COLUMNS.bet,
    width: '10%',
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <Select
          className={cn({ error: checkCellError(record, COLUMNS.bet) })}
          options={BETS}
          onChange={value => changeBet(
            record.key,
            COLUMNS.bet,
            value,
          )}
        />
      )
      : record.bet),
  },
  {
    title: 'Коэф-т',
    dataIndex: COLUMNS.quotient,
    width: '10%',
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <InputNumber
          className={cn({ error: checkCellError(record, COLUMNS.quotient) })}
          min={1}
          step={0.25}
          defaultValue={record.quotient}
          style={{ textAlign: 'center' }}
          onChange={value => {
            changeBet(
              record.key,
              COLUMNS.quotient,
              value,
            )
          }}
        />
      )
      : text),
  },
  {
    title: 'Сумма',
    dataIndex: COLUMNS.sum,
    width: '10%',
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <InputNumber
          className={cn({ error: checkCellError(record, COLUMNS.sum) })}
          step={100}
          min={0}
          defaultValue={record.sum}
          onChange={value => {
            changeBet(
              record.key,
              COLUMNS.sum,
              value,
            )
          }}
        />
      )
      : text),
  },
  {
    title: 'Исход',
    dataIndex: COLUMNS.result,
    align: 'center',
    render: (text: string, record: IBet) => (record.isNew
      ? (
        <Select
          className={cn({ error: checkCellError(record, COLUMNS.result) })}
          options={Object.values(RESULTS)}
          onChange={value => changeBet(
            record.key,
            COLUMNS.result,
            value,
          )}
        />
      )
      : <ResultCell result={record.result} />),
  },
]

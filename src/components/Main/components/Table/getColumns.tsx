import { DatePicker, Input } from 'antd'
import { Moment } from 'moment'
import React from 'react'
import { ColumnsType } from 'antd/es/table'
import { BETS, DATE_FORMAT, RESULTS } from '../../../../enums'
import Select from '../Select'
import TeamCell from './components/TeamCell'
import ResultCell from './components/ResultCell'
import { IBet, ITeam, TeamStatus } from '../../../../types'
import { useStore } from '../../../../store/provider';

export const getColumns = (
  teams: ITeam[],
  changeBet: (key: number, field: string, data: any) => void,
) : ColumnsType<IBet> => [
  {
    title: 'Дата',
    dataIndex: 'date',
    align: 'center',
    width: '20%',
    render: (date, record) => (record.isNew
      ? (
        <DatePicker
          onChange={(value: Moment) => changeBet(record.key, 'date', value.format(DATE_FORMAT))}
          format={DATE_FORMAT}
        />
      )
      : date),
  },
  {
    title: 'Матч',
    dataIndex: TeamStatus.home,
    colSpan: 2,
    width: '20%',
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <Select
          options={teams}
          onChange={value => changeBet(record.key, TeamStatus.home, teams.find(team => team.name === value))}
        />
      )
      : (
        record.home && <TeamCell team={record.home} />)),
  },
  {
    title: 'Матч',
    dataIndex: TeamStatus.visit,
    width: '20%',
    colSpan: 0,
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <Select
          onChange={value => changeBet(
            record.key,
            TeamStatus.visit,
            teams.find(team => team.name === value),
          )}
          options={teams}
        />
      )
      : record.visit && <TeamCell team={record.visit} />),
  },
  {
    title: 'Ставка',
    dataIndex: 'bet',
    width: '10%',
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <Select
          options={BETS}
          onChange={value => changeBet(
            record.key,
            'bet',
            value,
          )}
        />
      )
      : record.bet),
  },
  {
    title: 'Коэф-т',
    dataIndex: 'quotient',
    width: '5%',
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <Input
          defaultValue={record.quotient}
          style={{ textAlign: 'center' }}
          onChange={event => {
            changeBet(
              record.key,
              'quotient',
              event.target.value,
            )
          }}
        />
      )
      : text),
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    width: '10%',
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <Input
          defaultValue={record.sum}
          style={{ textAlign: 'center' }}
          onChange={event => {
            changeBet(
              record.key,
              'sum',
              event.target.value,
            )
          }}
        />
      )
      : text),
  },
  {
    title: 'Исход',
    dataIndex: 'result',
    align: 'center',
    render: (text: string, record: IBet) => (record.isNew
      ? (
        <Select
          options={Object.values(RESULTS)}
          onChange={value => changeBet(
            record.key,
            'result',
            value,
          )}
        />
      )
      : <ResultCell result={record.result} />),
  },
]

import { DatePicker, Input } from 'antd'
import { Moment } from 'moment'
import React from 'react'
import { ColumnsType } from 'antd/es/table'
import classnames from 'classnames/bind';
import { BETS, DATE_FORMAT, RESULTS } from '../../../../enums'
import Select from '../Select'
import TeamCell from './components/TeamCell'
import ResultCell from './components/ResultCell'
import { IBet, ITeam, TeamStatus } from '../../../../types'
import styles from './style.less'

const cn = classnames.bind(styles)

export const getColumns = (
  teams: ITeam[],
  changeBet: (key: number, field: string, data: any) => void,
  errors: any,
) : ColumnsType<IBet> => [
  {
    title: 'Дата',
    dataIndex: 'date',
    align: 'center',
    width: '20%',
    render: (date, record) => (record.isNew
      ? (
        <DatePicker
          className={cn({
            error: errors.find(item => item.key === record.key)?.errors.includes('date'),
          })}
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
          className={cn({
            error: errors.find(item => item.key === record.key)?.errors.includes(TeamStatus.home),
          })}
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
          className={cn({
            error: errors.find(item => item.key === record.key)?.errors.includes(TeamStatus.visit),
          })}
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
          className={cn({
            error: errors.find(item => item.key === record.key)?.errors.includes('bet'),
          })}
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
          className={cn({
            error: errors.find(item => item.key === record.key)?.errors.includes('quotient'),
          })}
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
          className={cn({
            error: errors.find(item => item.key === record.key)?.errors.includes('sum'),
          })}
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
          className={cn({
            error: errors.find(item => item.key === record.key)?.errors.includes('result'),
          })}
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

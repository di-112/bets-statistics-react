import { DatePicker, Input } from 'antd'
import React from 'react'
import { BETS, DATE_FORMAT, RESULTS } from '../../../../enums'
import Select from '../Select'
import TeamCell from './components/TeamCell'
import ResultCell from './components/ResultCell'

export const getColumns = (teams, changeBet) => [
  {
    title: 'Дата',
    dataIndex: 'date',
    align: 'center',
    width: '20%',
    render: (date, record) => (record.isNew
      ? <DatePicker onChange={value => changeBet(record.key, 'date', value.format(DATE_FORMAT))} format={DATE_FORMAT} />
      : date),
  },
  {
    title: 'Матч',
    dataIndex: 'home',
    colSpan: 2,
    width: '20%',
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <Select
          options={teams}
          onChange={value => changeBet(record.key, 'home', teams.find(team => team.name === value))}
        />
      )
      : (
        record.home && <TeamCell record={record} field="home" />)),
  },
  {
    title: 'Матч',
    dataIndex: 'visit',
    width: '20%',
    colSpan: 0,
    align: 'center',
    render: (text, record) => (record.isNew
      ? (
        <Select
          onChange={value => changeBet(
            record.key,
            'visit',
            teams.find(team => team.name === value),
          )}
          options={teams}
        />
      )
      : record.visit && <TeamCell record={record} field="visit" />),
  },
  {
    title: 'Ставка',
    dataIndex: 'bet',
    width: '10%',
    align: 'center',
    render: (text, record) => {
      console.log('test: ', text)
      console.log('bet: ', record)
      return (record.isNew
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
        : record.bet)
    },
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    width: '15%',
    align: 'center',
    render: (text, record) => (record.isNew ? <Input defaultValue={text} /> : text),
  },
  {
    title: 'Исход',
    dataIndex: 'result',
    align: 'center',
    render: (text, record) => (record.isNew
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

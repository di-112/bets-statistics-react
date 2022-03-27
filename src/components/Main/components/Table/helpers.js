import { DatePicker } from 'antd'
import React from 'react'
import store from '../../../../store/store'
import { BETS, DATE_FORMAT, RESULTS } from '../../../../enums'
import Select from '../Select'
import TeamCell from './components/TeamCell'

export const getColumns = () => [
  {
    title: 'Дата',
    dataIndex: 'date',
    align: 'center',
    width: '20%',
    render: (date, record) => (record.isNew
      ? <DatePicker onChange={value => store.changeBet(record.key, 'date', value.format(DATE_FORMAT))} format={DATE_FORMAT} />
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
          options={store.teams}
          onChange={value => store.changeBet(record.key, 'home', store.teams.find(team => team.name === value))}
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
          onChange={value => store
            .changeBet(
              record.key,
              'visit',
              store.teams.find(team => team.name === value),
            )}
          options={store.teams}
        />
      )
      : record.visit && <TeamCell record={record} field="visit" />),
  },
  {
    title: 'Ставка',
    dataIndex: 'bet',
    width: '10%',
    align: 'center',
    render: (text, record) => (record.isNew
      ? <Select options={BETS} />
      : text),
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    width: '15%',
    align: 'center',
  },
  {
    title: 'Исход',
    dataIndex: 'result',
    align: 'center',
    render: (text, record) => (record.isNew
      ? <Select options={Object.values(RESULTS)} />
      : text),
  },
]

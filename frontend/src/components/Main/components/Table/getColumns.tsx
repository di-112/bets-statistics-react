import React from 'react'
import { DatePicker, InputNumber } from 'antd'
import { ColumnsType } from 'antd/es/table'
import classnames from 'classnames/bind';
import { Moment } from 'moment'
import { BETS, DATE_FORMAT, RESULTS } from '@enums'
import { IBet, ITeam, TeamStatus } from '@types'
import Select from '../Select'
import ResultCell from './components/ResultCell'
import TeamCell from './components/TeamCell'
import styles from './style.less'

const cn = classnames.bind(styles)

export const getColumns = (
    teams: ITeam[],
    changeBet: (key: number | string, field: string, data: any) => void,
    errors: any,
): ColumnsType<IBet> => [
    {
        title: 'Дата',
        dataIndex: 'date',
        align: 'center',
        width: '15%',
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
        width: '10%',
        align: 'center',
        render: (text, record) => (record.isNew
            ? (
                <InputNumber
                    className={cn({
                        error: errors.find(item => item.key === record.key)?.errors.includes('quotient'),
                    })}
                    min={1}
                    step={0.25}
                    defaultValue={record.quotient}
                    style={{ textAlign: 'center' }}
                    onChange={value => {
                        changeBet(
                            record.key,
                            'quotient',
                            value,
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
                <InputNumber
                    className={cn({
                        error: errors.find(item => item.key === record.key)?.errors.includes('sum'),
                    })}
                    step={100}
                    min={0}
                    defaultValue={record.sum}
                    onChange={value => {
                        changeBet(
                            record.key,
                            'sum',
                            value,
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

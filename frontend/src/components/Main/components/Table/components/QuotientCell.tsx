import React, { FC } from 'react'
import { InputNumber } from 'antd';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from '@store/provider';
import { CellProps } from '../types';

const QuotientEditCell: FC<CellProps> = observer(({
    record,
}) => {
    const {
        changeBet,
        checkErrorCell,
    } = useStore()

    return (
        <InputNumber
            className={cn({ error: checkErrorCell(record.key, 'quotient') })}
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
})

export const renderQuotientCell = ({ record }: CellProps) => (record.isNew
    ? <QuotientEditCell record={record} />
    : record.quotient
)

import React, { FC } from 'react'
import { InputNumber } from 'antd';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from '@store/provider';
import { CellProps } from '../types';

const SummaryEditCell: FC<CellProps> = observer(({
    record,
}) => {
    const {
        changeBet,
        checkErrorCell,
    } = useStore()

    return (
        <InputNumber
            className={cn({ error: checkErrorCell(record.key, 'sum') })}
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
})

export const renderSummaryCell = ({
    record,
}: CellProps) => (record.isNew ? <SummaryEditCell record={record} /> : record.sum)

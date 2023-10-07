import React, { FC } from 'react'
import { DatePicker } from 'antd';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Moment } from 'moment/moment';
import { DATE_FORMAT } from '@enums'
import { useStore } from '@store/provider';
import { CellProps } from '../types';

const DateEditCell: FC<CellProps> = observer(({
    record,
}) => {
    const {
        changeBet,
        checkErrorCell,
    } = useStore()

    return (
        <DatePicker
            className={cn({ error: checkErrorCell(record.key, 'date') })}
            onChange={(value: Moment) => changeBet(record.key, 'date', value)}
            format={DATE_FORMAT}
        />
    )
})

export const renderDateCell = ({
    record,
}: CellProps) => (record.isNew ? <DateEditCell record={record} /> : record.date)

import React, { FC } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite';
import { BETS } from '@enums';
import { useStore } from '@store/provider';
import Select from '../../../../../common/ui/Select';
import { CellProps } from '../types';

const BetEditCell: FC<CellProps> = observer(({
    record,
}) => {
    const {
        checkErrorCell,
        changeBet,
    } = useStore()

    return (
        <Select
            className={cn({ error: checkErrorCell(record.key, 'bet') })}
            options={BETS}
            onChange={value => changeBet(
                record.key,
                'bet',
                value,
            )}
        />
    )
})

export const renderBetCell = ({ record }: CellProps) => (record.isNew
    ? <BetEditCell record={record} />
    : record.bet)

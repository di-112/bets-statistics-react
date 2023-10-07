import React, { FC } from 'react'
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { RESULTS } from '@enums'
import { useStore } from '@store/provider';
import Select from '../../../../../common/ui/Select';
import { CellProps } from '../types';

const ResultStaticCell: FC<CellProps> = ({ record }) => (
    <div>
        {record.result === RESULTS.win
            ? <CheckCircleOutlined style={{ color: 'green' }} />
            : <CloseCircleOutlined style={{ color: 'red' }} />}
    </div>
)

const ResultEditCell: FC<CellProps> = observer(({
    record,
}) => {
    const {
        changeBet,
        checkErrorCell,
    } = useStore()

    return (
        <Select
            className={cn({ error: checkErrorCell(record.key, 'result') })}
            options={Object.values(RESULTS)}
            onChange={(value: RESULTS) => changeBet(
                record.key,
                'result',
                value,
            )}
        />
    )
})

export const renderResultCell = ({ record }: CellProps) => (record.isNew
    ? <ResultEditCell record={record} />
    : <ResultStaticCell record={record} />)

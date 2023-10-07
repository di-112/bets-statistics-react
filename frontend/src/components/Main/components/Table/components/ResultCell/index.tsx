import React, { FC } from 'react'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { RESULTS } from '@enums'
import { IBet, TypeChangeBet } from '@types';
import Select from '../../../Select';

interface IResultStaticCell {
    result: RESULTS
}

const ResultStaticCell: FC<IResultStaticCell> = ({ result }) => (
    <div>
        {
            result === RESULTS.win
                ? <CheckCircleOutlined style={{ color: 'green' }} />
                : <CloseCircleOutlined style={{ color: 'red' }} />
        }
    </div>
)

interface IResultEditCell {
    record: IBet,
    onChange: TypeChangeBet,
    className: string
}

const ResultEditCell: FC<IResultEditCell> = ({
    record, className, onChange,
}) => (
    <Select
        className={className}
        options={Object.values(RESULTS)}
        onChange={(value: RESULTS) => onChange(
            record.key,
            'result',
            value,
        )}
    />
)

export const renderResultCell = (record: IBet, onChange: TypeChangeBet, className?: string) => (record.isNew
    ? (
        <ResultEditCell
            record={record}
            className={className}
            onChange={onChange}
        />
    )
    : <ResultStaticCell result={record.result} />)

import React from 'react'
import { Select as AntSelect } from 'antd'
import { isTeam } from '../../../types';

const { Option } = AntSelect

type SelectProps<T = string[]> = {
    options: T[],
    onChange: (value?: string) => void,
    className: string
}

const Select = <T, >({
    options = [],
    onChange = () => {
    },
    className,
}: SelectProps<T>) => (
    <AntSelect
        className={className}
        onChange={onChange}
        style={{ width: '100%' }}
        showSearch
        allowClear
    >
        {options.map((option, index) => {
            if (isTeam(option)) {
                return (
                    <Option
                        value={option.name}
                        key={option.name}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {option?.logo && (
                                <img
                                    src={option.logo}
                                    alt={option.name}
                                    style={{ width: 20, height: 20, marginRight: 10 }}
                                />
                            )}
                            {option.name}
                        </div>
                    </Option>
                )
            }

            if (typeof option === 'string') {
                return (
                    <Option
                        value={option}
                        key={option}
                    >
                        {option}
                    </Option>
                )
            }

            return <Option>{index}</Option>
        })}
    </AntSelect>
)

export default Select

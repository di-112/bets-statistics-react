import React, { FC } from 'react'
import { Select as AntSelect } from 'antd'
import { ITeam } from '../../../../types'

const { Option } = AntSelect

interface ISelect {
  options: ITeam[] | string[],
  onChange: (value?: string) => void
}

const Select: FC<ISelect> = ({ options = [], onChange = () => {} }) => (
  <AntSelect onChange={onChange} style={{ width: '100%' }} showSearch allowClear>
    {options.map(option => (
      typeof option === 'string'
        ? (
          <Option value={option} key={option}>
            {option}
          </Option>
        )
        : (
          <Option value={option.name} key={option.name}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {option?.logo && (
              <img
                src={option.logo}
                alt={option.name}
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              ) }
              {option.name}
            </div>
          </Option>
        )
    ))}
  </AntSelect>
)

export default Select

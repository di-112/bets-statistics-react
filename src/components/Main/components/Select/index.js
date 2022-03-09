import React from 'react'
import { Select as AntSelect } from 'antd'

const { Option } = AntSelect

const Select = ({ options = [] }) => {
  console.log('options: ', options)

  return (
    <AntSelect style={{ width: '100%' }} showSearch allowClear>
      {options.map(option => (
        typeof option === 'string'
          ? (
            <Option value={option} key={option}>
              {option}
            </Option>
          )
          : (
            <Option value={option?.name} key={option?.name}>
              {option?.logo && <img src={option?.logo} alt={option.name} style={{ width: 20, height: 20 }} /> }
              {option?.name || ''}
            </Option>
          )
      ))}
    </AntSelect>
  )
}

export default Select

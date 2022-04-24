import React, { FC } from 'react'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { RESULTS } from '../../../../../../enums'

interface IResultCell {
  result: RESULTS
}

const ResultCell: FC<IResultCell> = ({ result }) => (
  <div>
    {
        result === RESULTS.win
          ? <CheckCircleOutlined style={{ color: 'green' }} />
          : <CloseCircleOutlined style={{ color: 'red' }} />
    }
  </div>
)

export default ResultCell

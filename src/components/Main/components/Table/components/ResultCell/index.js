import React from 'react'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { RESULTS } from '../../../../../../enums'

const ResultCell = ({ result }) => (
  <div>
    {
        result === RESULTS.win
          ? <CheckCircleOutlined style={{ color: 'green' }} />
          : <CloseCircleOutlined style={{ color: 'red' }} />
    }
  </div>
)

ResultCell.propTypes = {
  result: PropTypes.string,
}

export default ResultCell

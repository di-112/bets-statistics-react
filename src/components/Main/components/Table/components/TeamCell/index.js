import React from 'react'
import PropTypes from 'prop-types'
import style from './style.less'

const TeamCell = ({ record, field }) => (
  <div className={style.cell}>
    <img
      className={style.logo}
      src={record[field].logo}
      alt={record[field].name}
    />
    {record[field].name}
  </div>
)

TeamCell.propTypes = {
  record: PropTypes.object,
  field: PropTypes.string,
}

export default TeamCell

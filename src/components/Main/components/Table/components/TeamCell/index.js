import React from 'react'
import style from './style.less'

const TeamCell = ({ record, field }) => (
  <div className={style.cell}>
    <img
      src={record[field].logo}
      alt={record[field].name}
      style={{
        width: 20, height: 20, marginRight: 10, padding: '0 11px',
      }}
    />
    {record.visit.name}
  </div>
)

export default TeamCell

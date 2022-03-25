import React from 'react'

const TeamCell = ({ record, field }) => (
  <div style={{
    height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}
  >
    <img src={record[field].logo} alt={record[field].name} style={{ width: 20, height: 20 }} />
    {record.visit.name}
  </div>
)

export default TeamCell

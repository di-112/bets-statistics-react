import React, { FC } from 'react'
import { ITeam } from '@types'
import style from './style.less'

interface ITeamCell {
  team: ITeam,
}

const TeamCell: FC<ITeamCell> = ({ team }) => (
  <div className={style.cell}>
    <img
      className={style.logo}
      src={team.logo}
      alt={team.name}
    />
    {team.name}
  </div>
)

export default TeamCell

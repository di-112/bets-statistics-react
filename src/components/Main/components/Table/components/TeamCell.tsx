import React, { FC } from 'react'
import styled from 'styled-components';
import { ITeam } from '@types'

const StyledTeamCell = styled.div`
  height: 30px;
  padding: 0 11px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`

interface ITeamCell {
  team: ITeam,
}

const TeamCell: FC<ITeamCell> = ({ team }) => (
  <StyledTeamCell>
    <img
      src={team.logo}
      alt={team.name}
    />
    {team.name}
  </StyledTeamCell>
)

export default TeamCell

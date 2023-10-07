import React, { FC } from 'react'
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from '@store/provider';
import Select from '../../../../../../common/ui/Select';
import { TeamStatus } from '../../../../../../types'
import { CellProps } from '../../types';
import style from './style.less'

type TeamCellProps = { teamStatus: TeamStatus } & CellProps

const TeamStaticCell: FC<TeamCellProps> = ({ record, teamStatus }) => {
    const team = record[teamStatus]

    return (
        <div className={style.cell}>
            <img
                className={style.logo}
                src={team.logo}
                alt={team.name}
            />
            {team.name}
        </div>
    )
}

const TeamEditCell: FC<TeamCellProps> = observer(({
    record,
    teamStatus,
}) => {
    const {
        teams,
        changeBet,
        checkErrorCell,
    } = useStore()

    return (
        <Select
            className={cn({ error: checkErrorCell(record.key, teamStatus) })}
            options={teams}
            onChange={value => changeBet(
                record.key,
                teamStatus,
                teams.find(team => team.name === value),
            )}
        />
    )
})

export const renderTeamCell = ({
    record,
    teamStatus,
}: TeamCellProps) => (record.isNew
    ? (
        <TeamEditCell
            record={record}
            teamStatus={teamStatus}
        />
    )
    : (
        <TeamStaticCell
            record={record}
            teamStatus={teamStatus}
        />
    ))

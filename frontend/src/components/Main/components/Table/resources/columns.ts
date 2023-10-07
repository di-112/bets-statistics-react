import { ColumnsType } from 'antd/lib/table';
import { IBet, TeamStatus } from '../../../../../types'
import { renderBetCell } from '../components/BetCell';
import { renderDateCell } from '../components/DateCell';
import { renderQuotientCell } from '../components/QuotientCell';
import { renderResultCell } from '../components/ResultCell'
import { renderSummaryCell } from '../components/SummaryCell';
import { renderTeamCell } from '../components/TeamCell'

export const columns = [
    {
        title: 'Дата',
        dataIndex: 'date',
        align: 'center',
        width: '15%',
        render: (_, record) => renderDateCell({ record }),
    },
    {
        title: 'Матч',
        dataIndex: TeamStatus.home,
        colSpan: 2,
        width: '20%',
        align: 'center',
        render: (_, record) => renderTeamCell({
            record,
            teamStatus: TeamStatus.home,
        }),
    },
    {
        title: 'Матч',
        dataIndex: TeamStatus.visit,
        width: '20%',
        colSpan: 0,
        align: 'center',
        render: (text, record) => renderTeamCell({
            record,
            teamStatus: TeamStatus.visit,
        }),
    },
    {
        title: 'Ставка',
        dataIndex: 'bet',
        width: '10%',
        align: 'center',
        render: (text, record) => renderBetCell({ record }),
    },
    {
        title: 'Коэф-т',
        dataIndex: 'quotient',
        width: '10%',
        align: 'center',
        render: (text, record) => renderQuotientCell({ record }),
    },
    {
        title: 'Сумма',
        dataIndex: 'sum',
        width: '10%',
        align: 'center',
        render: (text, record) => renderSummaryCell({ record }),
    },
    {
        title: 'Исход',
        dataIndex: 'result',
        align: 'center',
        render: (_, record) => renderResultCell({ record }),
    },
] as ColumnsType<IBet>

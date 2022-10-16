import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import { useStore } from '@store/provider'

const Item = styled.div``

const Value = styled.span``

const StyledStatistic = styled.div`
  background:${props => props.theme.colors.gray}; ;
  height: ${props => props.theme.statisticHeight};
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${Item} {
    margin: 20px;
    font-weight: 700;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    ${Value} {
      padding: 0 12px;
      font-size: 22px;
      font-style: italic;
      color: ${props => (props.profit > 0 ? 'green' : 'red')};
    }
  }
`

const Statistic: FC = observer(() => {
  const {
    analytics: {
      profit,
      bestBets,
      maxQuotient,
    },
  } = useStore()

  return (
    <StyledStatistic profit={profit}>
      <Item>
        Доход:
        <Value>
          {profit > 0 && '+'}
          {profit < 0 && '-'}
          {profit}
        </Value>
      </Item>
      <Item>
        Максимальный коэф-т:
        <Value>
          {maxQuotient}
        </Value>
      </Item>
      <Item>
        Лучшая ставка:
        <Value>{bestBets.length ? bestBets.join(', ') : 'Нет'}</Value>
      </Item>
    </StyledStatistic>
  )
})

export default Statistic

import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import classnames from 'classnames/bind'
import styles from './style.less'
import { useStore } from '../../../../store/provider'

const cn = classnames.bind(styles)

const Statistic: FC = observer(() => {
  const {
    analytics: {
      profit,
      bestBet,
    },
  } = useStore()

  return (
    <div className={styles.statistic}>
      <div className={styles.item}>
        Доход:
        <span className={cn('value', {
          plus: profit > 0,
          minus: profit < 0,
        })}
        >
          {profit > 0 && '+'}
          {profit < 0 && '-'}
          {profit}
        </span>
      </div>
      <div className={styles.item}>
        Лучшая ставка:
        <span className={styles.value}>{bestBet.length ? bestBet.map(bet => <div>{bet}</div>) : 'Нет'}</span>
      </div>
    </div>
  )
})

export default Statistic

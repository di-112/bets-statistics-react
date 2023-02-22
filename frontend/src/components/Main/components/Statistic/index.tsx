import React, { FC } from 'react'
import classnames from 'classnames/bind'
import { observer } from 'mobx-react-lite'
import { useStore } from '@store/provider'
import styles from './style.less'

const cn = classnames.bind(styles)

const Statistic: FC = observer(() => {
  const {
    analytics: {
      profit,
      bestBets,
      maxQuotient,
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
        Максимальный коэф-т:
        <span className={cn('value')}>
          {maxQuotient}
        </span>
      </div>
      <div className={styles.item}>
        Лучшая ставка:
        <span className={styles.value}>{bestBets.length ? bestBets.join(', ') : 'Нет'}</span>
      </div>
    </div>
  )
})

export default Statistic

import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../store/provider'

const Statistic: FC = observer(() => {
  const {
    analytics: {
      profit,
    },
  } = useStore()

  return (
    <div>
      Прибыль:
      {' '}
      {profit}
    </div>
  )
})

export default Statistic

import { notification } from 'antd'
import { ReactNode } from 'react'
import { IBet } from './types'

interface IOpenNotification {
  message: string,
  description: string,
  icon: ReactNode
}

export const openNotification = ({
  message,
  description,
  icon,
}: IOpenNotification) : void => {
  notification.open({
    message,
    description,
    icon,
  })
}

interface IGetErrorsBet {
  success: boolean,
  key: number | string
  errors?: string[],
}

export const getErrorsBet = (Bet: IBet) : IGetErrorsBet => {
  const {
    date, home, visit, sum, bet, result, key, quotient,
  } = Bet

  return {
    success: !!(date && home && visit && sum && bet && result && quotient) && !(home.id === visit.id),
    errors: ['date', 'home', 'visit', 'sum', 'bet', 'result', 'key', 'quotient'].filter(item => {
      if (item === 'home') return !Bet[item] || Bet[item] === Bet.visit
      if (item === 'visit') return !Bet[item] || Bet[item] === Bet.home
      return !Bet[item]
    }),
    key,
  }
}

export const getErrorsBets = (bets: IBet[]) : IGetErrorsBet[] => bets
  .map(getErrorsBet)
  .filter((bet: IGetErrorsBet) => !bet.success)

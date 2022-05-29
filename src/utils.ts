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
  key: number
  errors?: string[],
}

export const getErrorsBet = (Bet: IBet) : IGetErrorsBet => {
  const {
    date, home, visit, sum, bet, result, key,
  } = Bet

  return {
    success: !!(date && home && visit && sum && bet && result) && !(home.id === visit.id),
    errors: ['date', 'home', 'visit', 'sum', 'bet', 'result', 'key'].filter(item => !Bet[item]),
    key,
  }
}

export const getErrorsBets = (bets: IBet[]) : IGetErrorsBet[] => bets
  .map(getErrorsBet)
  .filter((bet: IGetErrorsBet) => !bet.success)

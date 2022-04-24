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

export const checkBet = ({
  date, home, visit, sum, bet, result,
}: IBet) : boolean => !!(date && home && visit && sum && bet && result)

export const checkBets = (bets: IBet[]) : boolean => !bets
  .map(checkBet)
  .filter(result => result === false)
  .length

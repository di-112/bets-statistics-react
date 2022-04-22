export interface ITeam {
  country: string,
  id: number,
  logo: string,
  name: string
}

export interface IBet {
  key: number,
  date: Date | null,
  home: ITeam | null,
  visit: ITeam | null,
  bet: string,
  sum: number,
  result: string,
  isNew?: boolean,
}

export enum TeamStatus {
  visit = 'visit',
  home = 'home',
}

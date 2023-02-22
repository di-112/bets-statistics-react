import React, { createContext, ReactNode, useContext } from 'react'
import store from './store'

type StoreType = typeof store | null

const Store = createContext<StoreType>(null)

export const StoreProvider = (
  { children } : { children: ReactNode },
) => <Store.Provider value={store}>{children}</Store.Provider>

export const useStore = () => useContext<StoreType>(Store)

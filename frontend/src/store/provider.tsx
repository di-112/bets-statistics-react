import React, {
    createContext, FC, ReactNode, useContext,
} from 'react'
import store from './store'

type StoreType = typeof store | null

const Store = createContext<StoreType>(null)

interface IStoreProvider {
    children: ReactNode
}

export const StoreProvider: FC<IStoreProvider> = ({ children }) => (
    <Store.Provider value={store}>
        {children}
    </Store.Provider>
)

export const useStore = () => useContext<StoreType>(Store)

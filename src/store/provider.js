import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import store from './store'

const Store = createContext({})

export const StoreProvider = ({ children }) => <Store.Provider value={store}>{children}</Store.Provider>

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useStore = () => useContext(Store)

import React, { useEffect, useState } from 'react'
import Menu from './components/Menu'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import styles from './style.less'
import api from './api/index'

const App = () => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className={styles.app}>
      <Header />
      <Main isOpenMenu={!collapsed} />
      <Footer />
      <Menu
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
    </div>
  )
}

export default App

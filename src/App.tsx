import React, {FC, useState} from 'react'
import { StoreProvider } from './store/provider'
import Menu from './components/Menu'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import styles from './style.less'

const App: FC = () => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <StoreProvider>
      <div className={styles.app}>
        <Header />
        <Main isOpenMenu={!collapsed} />
        <Footer />
        <Menu
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>
    </StoreProvider>
  )
}

export default App

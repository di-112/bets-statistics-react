import React, { FC, useState } from 'react'
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import { StoreProvider } from '@store/provider'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Menu from './components/Menu'
import styles from './style.less'

const App: FC = () => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <ConfigProvider locale={ruRU}>
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
    </ConfigProvider>
  )
}

export default App

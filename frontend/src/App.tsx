import React, { FC } from 'react'
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import { StoreProvider } from '@store/provider'
import Header from './components/Header'
import Main from './components/Main'
import Menu from './components/Menu';
import styles from './style.less'

const App: FC = () => (
    <ConfigProvider locale={ruRU}>
        <StoreProvider>
            <div className={styles.app}>
                <Menu />
                <Header />
                <Main />
            </div>
        </StoreProvider>
    </ConfigProvider>
)

export default App

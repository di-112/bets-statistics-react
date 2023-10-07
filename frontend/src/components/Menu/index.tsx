import React, { FC, useLayoutEffect, useState } from 'react'
import { Button, Menu as AntMenu } from 'antd'
import { observer } from 'mobx-react-lite'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import api from '@api';
import { LEAGUES } from '@enums';
import { useStore } from '@store/provider'
import { ILeague } from '@types';
import styles from './style.less'

const Menu: FC = observer(() => {
    const {
        setActiveLeagueId,
        isOpenMenu,
        setIsOpenMenu,
    } = useStore()

    const [leagues, setLeagues] = useState<ILeague[]>([])

    useLayoutEffect(() => {
        if (!leagues.length) {
            api.getLeagues().then(setLeagues)
        }
    }, [])

    const onSelect = item => {
        setActiveLeagueId(item.key)
        setIsOpenMenu(false)
    }

    return (
        <div className={styles.menu}>
            <Button
                type="ghost"
                className={styles.collapseButton}
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                icon={!isOpenMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
            <AntMenu
                defaultSelectedKeys={[LEAGUES[1].toString()]}
                mode="inline"
                theme="dark"
                inlineCollapsed={!isOpenMenu}
                onSelect={onSelect}
            >
                {leagues.map(({ name, logo, id }) => (
                    <AntMenu.Item key={id}>
                        <img
                            alt={name}
                            style={{
                                width: 24,
                                height: 24,
                                marginRight: 8,
                            }}
                            src={logo}
                        />
                        {' '}
                        {name}
                    </AntMenu.Item>
                ))}
            </AntMenu>
        </div>
    )
})

export default Menu

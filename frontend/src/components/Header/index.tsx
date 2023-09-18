import React, { FC } from 'react'
import { observer } from 'mobx-react-lite';
import { LogoutOutlined } from '@ant-design/icons';
import { useStore } from '@store/provider';
import styles from './style.less'

const Header: FC = observer(() => {
    const {
        isAuth,
        user,
        setUser,
    } = useStore()

    const logout = () => {
        setUser(null)
    }

    return (
        <div className={styles.header}>
            {isAuth && (
                <>

                    <div className={styles.email}>{user?.login}</div>
                    <LogoutOutlined
                        onClick={logout}
                        style={{ color: 'white', fontSize: 16, cursor: 'pointer' }}
                    />
                </>
            )}
        </div>
    )
})

export default Header

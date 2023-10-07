import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@store/provider';
import { AppRoutes, IBet } from '../../../../types'
import Statistic from '../Statistic';
import Table from '../Table';
import Toolbar from '../Toolbar';
import styles from './style.less'

const Content: FC = observer(() => {
    const [selected, setSelected] = useState<IBet[]>([])

    const navigate = useNavigate();

    const { isAuth } = useStore()

    useEffect(() => {
        if (!isAuth) {
            navigate(AppRoutes.AUTH)
        }
    }, [isAuth])

    return (
        <div className={styles.wrapper}>
            <Toolbar
                selected={selected}
                setSelected={setSelected}
            />
            <Table
                selected={selected}
                setSelected={setSelected}
            />
            <Statistic />
        </div>
    )
})

export default Content

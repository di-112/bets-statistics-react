import React, { FC, useState } from 'react'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons'
import { useStore } from '@store/provider';
import Statistic from './components/Statistic'
import Table from './components/Table'
import Toolbar from './components/Toolbar'

const Wrapper = styled.div`
  height: 100%;
  padding: 24px;
  background: #eee;
  position: relative;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
  ${props => props.isOpenMenu && css`
    padding-left: 280px;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.2);
    }`};
`

const ContentWrapper = styled.div`
  height: 100%;
  padding: 12px;
  background: white;
`

const AntIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

interface IMain {
  isOpenMenu: boolean
}

const Main: FC<IMain> = observer(({ isOpenMenu }) => {
  const [selected, setSelected] = useState<number[]>([])

  const { isLoading } = useStore()

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Spin
      indicator={AntIcon}
      spinning={isLoading}
    >
      <Wrapper isOpenMenu={isOpenMenu}>
        <ContentWrapper>
          <Toolbar
            selected={selected}
            setSelected={setSelected}
          />
          <Table setSelected={setSelected} />
          <Statistic />
        </ContentWrapper>
      </Wrapper>
    </Spin>
  )
})

export default Main

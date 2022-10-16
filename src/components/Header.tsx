import styled from 'styled-components';

const Header = styled.div`
  height: ${props => props.theme.headerHeight};
  background:  ${props => props.theme.colors.darkBlue};
`

export default Header

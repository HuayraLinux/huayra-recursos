import styled from 'styled-components';

const Main = styled.img.attrs({
})`
  ${props => props.width && `width: ${props.width};`}
  ${props => props.height && `width: ${props.height};`}
  ${props => `transform: scale(${props.size});`}
`;

export default ({
  Main
});

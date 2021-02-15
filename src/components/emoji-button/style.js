import styled from 'styled-components'

const Main = styled.span.attrs((props) => ({
  className: `cursor-pointer ${props.disabled && 'cursor-not-allowed opacity-25'}`
}))``;

export default ({
  Main
});

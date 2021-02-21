import styled from 'styled-components'

const Main = styled.span.attrs((props) => ({
  className: `${props.clickeable && 'cursor-pointer'} ${props.disabled && 'cursor-not-allowed'} ${props.animate && `animate-${props.animate}`}`
}))``;

export default ({
  Main
});

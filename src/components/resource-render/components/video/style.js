import styled from 'styled-components';

const Main = styled.video.attrs({
  className: 'w-full h-full'
})`
  max-height: 450px;
  &:focus{
    outline :none;
  }
`;

export default ({
  Main
});

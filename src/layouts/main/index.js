import styled from 'styled-components';

export default styled.main.attrs({
  className: 'grid gap-6 p-12'
})`
  grid-template-columns: 0.3fr 0.7fr;
  grid-template-rows: 0.1fr 0.1fr auto;
  height: 100vh;
`;

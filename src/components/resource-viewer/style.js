import styled from 'styled-components';

const Main = styled.div.attrs({
  className: 'border-2 bg-white p-4 row-span-2 overflow-y-scroll overflow-x-hidden rounded shadow-xl'
})``;

const ResourcePlaceholder = styled.div.attrs({
  className: 'grid h-full'
})`
  grid-template-columns: 100%;
  grid-template-rows: 0.1fr 0.1fr auto;
`;

export default ({
  Main,
  ResourcePlaceholder,
});

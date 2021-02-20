import styled from 'styled-components';

const Main = styled.div.attrs({
    className: 'border-2 border-black bg-white p-4 row-span-2 overflow-y-scroll'
})`
  box-shadow: 6px 6px 0px 0px rgba(202,48,111,1);
`;

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

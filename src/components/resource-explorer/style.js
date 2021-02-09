import styled from 'styled-components';

const Main = styled.ul.attrs({
  className: 'overflow-scroll	rounded shadow-md'
})`
  & > li:nth-of-type(odd) {
    background: #ececec;
  }
`;

const Item = styled.li.attrs({
  className: 'p-4 cursor-pointer'
})`
`;

export default ({
  Main,
  Item,
});

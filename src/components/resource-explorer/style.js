import styled from 'styled-components';

const Main = styled.ul.attrs({
  className: 'overflow-scroll	rounded shadow-md'
})`
  & > li:nth-of-type(odd) {
    background: #ececec;
  }
`;

const Item = styled.li.attrs((props) => ({
  className: `p-4 cursor-pointer truncate ${props.selected && 'font-bold'}`
}))`
`;

export default ({
  Main,
  Item,
});

import styled from 'styled-components';

const Main = styled.ul.attrs({
  className: 'bg-white overflow-y-scroll rounded border-2'
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

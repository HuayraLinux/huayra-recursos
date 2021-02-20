import styled from 'styled-components';

const Main = styled.ul.attrs({
  className: 'bg-white overflow-y-scroll border-2 border-black'
})`
  & > li:nth-of-type(odd) {
    background: var(--primary-color);
    color: white;
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

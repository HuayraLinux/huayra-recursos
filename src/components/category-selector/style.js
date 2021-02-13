import styled from 'styled-components';

const Main = styled.div.attrs((props) => ({
  className: `border-2 rounded ${props.disabled && 'opacity-40'}`
}))``;

const Select = styled.select.attrs((props) => ({
  className: `h-full w-full p-4 ${props.disabled && 'cursor-not-allowed bg-gray-300'}`
}))``;

const OptGroup = styled.optgroup.attrs({
  className: ''
})``;

const Option = styled.option.attrs({
  className: ''
})``;

export default ({
  Main,
  Select,
  OptGroup,
  Option
});

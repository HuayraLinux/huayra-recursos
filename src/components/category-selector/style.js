import styled from 'styled-components';

const Main = styled.div.attrs({
  className: 'border-2 rounded'
})``;

const Select = styled.select.attrs({
  className: 'h-full w-full'
})``;

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

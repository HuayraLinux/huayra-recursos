import Emoji from 'react-emoji-render';

import Wrapper from './style';

export default ({ emojiText, title, onClick, style, disabled = false, size = '32px' }) => (
  <Wrapper.Main
    onClick={disabled ? null : onClick}
    clickeable={onClick ? true : false }
    style={style}
    disabled={disabled}
    title={title}
  >
    <Emoji text={`:${emojiText}:`} style={{ fontSize: size }} />
  </Wrapper.Main>
);

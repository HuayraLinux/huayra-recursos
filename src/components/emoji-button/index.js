import Emoji from 'react-emoji-render';

import Wrapper from './style';

export default ({ emojiText, title, onClick, disabled, size = '32px' }) => (
  <Wrapper.Main onClick={disabled ? null : onClick} disabled={disabled} title={title}>
    <Emoji text={`:${emojiText}:`} style={{ fontSize: size }} />
  </Wrapper.Main>
);

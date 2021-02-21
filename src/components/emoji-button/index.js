import Wrapper from './style';
import * as Emojis from 'assets/emojis';

export default ({ name, title, onClick, style, animate, disabled = false, size = '48px' }) => {
  const EmojiSVGSrc = Emojis[name];

  return (
    <Wrapper.Main
      onClick={disabled ? null : onClick}
      clickeable={onClick ? true : false }
      style={style}
      disabled={disabled}
      title={title}
      animate={animate}
    >
      <img height={size} width={size} className={`${disabled && 'opacity-25'}`} src={EmojiSVGSrc} />
    </Wrapper.Main>
  );
};

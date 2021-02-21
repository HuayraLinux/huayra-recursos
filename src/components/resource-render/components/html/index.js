import Wrapper from './style';
import { EmojiButton } from 'components';

const ipc = window.require('electron').ipcRenderer;

export default ({ file }) => (
  <Wrapper.Main>
    <EmojiButton name="ThinkingFace" 
      title="Herramienta sugerida"
      size="128px"
    />
    <h1 className="text-2xl font-bold text-center">
      Este recurso se ve mejor si usás<br />
      <span
        className="underline cursor-pointer primary-color-text"
        onClick={() => ipc.send('open-file', file)}
      >
        esta herramienta
      </span>{' '}
      de Huayra
    </h1>
  </Wrapper.Main>
);

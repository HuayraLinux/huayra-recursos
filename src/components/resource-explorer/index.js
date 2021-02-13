import {
  useContext,
  useState,
  useEffect
} from 'react';

import { Context } from '../../provider';
import Wrapper from './style';

export default () => {
  const { resources, setResourceId } = useContext(Context);
  const [resourcesToExplore, setResourcesToExplore] = useState([]);

  useEffect(() => {
    setResourcesToExplore(resources);
  }, [resources]);

  return (
    <Wrapper.Main>
      {
        resourcesToExplore.length ?
        resourcesToExplore.map(c => (
          <Wrapper.Item
            onClick={() => setResourceId(c.id)}
            key={c.id}
          >
            { c.titulo }
          </Wrapper.Item>
        )):
        null
      }
    </Wrapper.Main>
  );
};

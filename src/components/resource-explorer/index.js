import {
  useContext,
  useState,
  useEffect
} from 'react';

import { Context } from '../../provider';
import Wrapper from './style';

export default () => {
  const { allResources, setResourceId } = useContext(Context);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!allResources.length) return;

    const categoryNames = allResources.map(c => ({ id: c.id, name: c.categoria }));
    setCategories(categoryNames);
  }, [allResources]);


  return (
    <Wrapper.Main>
      {
        categories.map(c => (
          <Wrapper.Item
            onClick={() => setResourceId(c.id)}
            key={c.id}
          >
            { c.name }
          </Wrapper.Item>
        ))
      }
    </Wrapper.Main>
  );
};

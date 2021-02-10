import {
  useContext,
  useState,
  useEffect,
} from 'react';

import { Context } from '../../provider';
import getData from '../../lib';
import Wrapper from './style';

const Option = ({ id, children }) => (
  <Wrapper.Option id={id}>
    { children }
  </Wrapper.Option>
);

const OptGroup = ({ id, label, children }) => (
  <Wrapper.OptGroup id={id} label={label.toUpperCase()}>
    { children }
  </Wrapper.OptGroup>
);

export default () => {
  const { allResources, setResources } = useContext(Context);
  const [formattedData, setFormattedData] = useState([]);

  const onCategoryClicked = ({ target }) => {
    const { selectedIndex, options } = target;

    const option = options[selectedIndex];
    const parentOption = option.parentNode;

    const { id: cycleName } = parentOption;
    const { value: categoryValue } = option;

    const resources = allResources.reduce((acc, r) => {
      if (r.ciclo !== cycleName || r.categoria !== categoryValue) return acc;

      return acc.concat(r);
    }, []);

    setResources(resources);
  };

  useEffect(() => {
    if (!allResources.length) return;

    setFormattedData(getData(allResources));
  }, [allResources]);

  return (
    <Wrapper.Main>
      <Wrapper.Select onChange={onCategoryClicked}>
        {
          formattedData.map((e, i) => (
            <OptGroup key={i} id={e.cycle} label={e.cycle}>
              {
                e.categories.map((c, ii) => (
                  <Option id={c.id} key={c.id}>
                    { c.category }
                  </Option>
                ))
              }
            </OptGroup>
          ))
        }
      </Wrapper.Select>
    </Wrapper.Main>
  );
}

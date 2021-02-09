import GlobalStyle from 'global-style';

import Provider from './provider';
import { MainLayout } from 'layouts';
import {
  MainTitle,
  CategorySelector,
  ResourceViewer,
  ResourceExplorer,
} from 'components';

const App = () => (
  <>
    <GlobalStyle />
    <MainTitle>Huayra Recursos Educ.Ar</MainTitle>
    <MainLayout>
      <Provider>
        <CategorySelector />
        <ResourceViewer />
        <ResourceExplorer />
      </Provider>
    </MainLayout>
  </>
);

export default App;

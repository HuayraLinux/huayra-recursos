import GlobalStyle from 'global-style';

import Provider from './provider';
import { MainLayout } from 'layouts';
import {
  SearchBar,
  CategorySelector,
  ResourceViewer,
  ResourceExplorer,
} from 'components';

const App = () => (
  <>
    <GlobalStyle />
    <MainLayout>
      <Provider>
        <SearchBar />
        <ResourceViewer />
      <div className="text-center text-lg">
        o también podés
      </div>
        <CategorySelector />
        <ResourceExplorer />
      </Provider>
    </MainLayout>
  </>
);

export default App;

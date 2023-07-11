import styled from "styled-components";
import Header from "./components/Header";
import GistList from "./components/GistList";
import GlobalStyles from "./GlobalStyle";
import { SearchProvider } from "./context/SearchContext";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <SearchProvider>
      <Wrapper className="App" data-testid="app">
        <Header />
        <div className="container my-5">
          <GistList />
        </div>
        <GlobalStyles />
      </Wrapper>
    </SearchProvider>
  );
};

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;

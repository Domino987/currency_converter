import { RecoilRoot } from "recoil";
import { AppFrame } from "./components/AppFrame";
import { Content } from "./components/Content";
import { Header } from "./components/Header";

function App() {
  return (
    <RecoilRoot>
      <AppFrame>
        <Header />
        <Content />
      </AppFrame>
    </RecoilRoot>
  );
}

export default App;

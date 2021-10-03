import { RecoilRoot } from "recoil";
import { Alertbar } from "./components/Alertbar";
import { AppFrame } from "./components/AppFrame";
import { Content } from "./components/Content";
import { Header } from "./components/Header";

function App() {
  return (
    <RecoilRoot>
      <AppFrame>
        <Header />
        <Content />
        <Alertbar />
      </AppFrame>
    </RecoilRoot>
  );
}

export default App;

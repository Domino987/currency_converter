import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { AppFrame } from "./components/AppFrame";
import { Content } from "./components/Content";
import { Header } from "./components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      retry: false,
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AppFrame>
          <Header />
          <Content />
        </AppFrame>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

import { CurrencyChart } from "./CurrencyChart";
import { Inputs } from "./Inputs";
import { History } from "./History";
import { DevModeNotification } from "./DevModeNotification";
import { Alertbar } from "./Alertbar";

function Content() {
  return (
    <>
      <DevModeNotification />
      <Alertbar />
      <CurrencyChart />
      <Inputs />
      <History />
    </>
  );
}

export { Content };

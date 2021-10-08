import { CurrencyChart } from "./CurrencyChart";
import { Inputs } from "./Inputs";
import { History } from "./History";
import { DevModeNotification } from "./DevModeNotification";
/**
 * The app content to render in the correct order
 *
 * @return {JSX.Element} The content of the app
 */
function Content() {
  return (
    <>
      <DevModeNotification />
      <CurrencyChart />
      <Inputs />
      <History />
    </>
  );
}

export { Content };

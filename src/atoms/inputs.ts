import { atom, AtomEffect, useRecoilTransaction_UNSTABLE } from "recoil";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
const currencyValues = atom({
  key: "currencyValues",
  default: { from: "", to: "" },
  effects_UNSTABLE: [localStorageEffect("currencyValues")],
});
const leftInput = atom({
  key: "leftInput",
  default: "",
});

const currencyHistory = atom<Array<{ from: string; to: string }>>({
  key: "currencyHistory",
  default: [],
  effects_UNSTABLE: [localStorageEffect("currencyHistory")],
});

function useSetCurrencies() {
  const setCurrencies = useRecoilTransaction_UNSTABLE(
    ({ get, set }) =>
      ({ from, to }: { from?: string; to?: string }) => {
        const values = get(currencyValues);
        const nextValue = {
          from: from ?? values.from,
          to: to ?? values.to,
        };
        set(currencyValues, nextValue);
        if (nextValue.from && nextValue.to) {
          const prev = get(currencyHistory);
          set(currencyHistory, (prev) =>
            [nextValue].concat(
              prev.filter(
                ({ from: prevFrom, to: prevTo }) =>
                  `${prevFrom}_${prevTo}` !==
                  `${nextValue.from}_${nextValue.to}`
              )
            )
          );
        }
      }
  );
  return setCurrencies;
}

export {
  leftInput,
  currencyValues,
  currencyHistory,
  useSetCurrencies,
  localStorageEffect,
};

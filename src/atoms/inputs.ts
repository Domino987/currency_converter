import { atom, AtomEffect } from "recoil";

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

const leftInput = atom({
  key: "leftInput",
  default: "",
});

const fromCurrency = atom({
  key: "fromCurrency",
  default: "EUR",
  effects_UNSTABLE: [localStorageEffect("fromCurrency")],
});

const toCurrency = atom({
  key: "toCurrency",
  default: "JPY",
  effects_UNSTABLE: [localStorageEffect("toCurrency")],
});

export { leftInput, fromCurrency, toCurrency, localStorageEffect };

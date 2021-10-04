import { atom } from "recoil";
import { localStorageEffect } from "./inputs";

const darkModeAtom = atom<"dark" | "light">({
  key: "dark_mode",
  default: "dark",
  effects_UNSTABLE: [localStorageEffect<"dark" | "light">("dark_mode")],
});

const devModeAtom = atom({
  key: "dev_mode",
  default: false,
  effects_UNSTABLE: [localStorageEffect<boolean>("dev_mode")],
});

export { darkModeAtom, devModeAtom };

import { atom } from "recoil";
import { localStorageEffect } from "./inputs";

const darkModeAtom = atom<"dark" | "light">({
  key: "dark_mode",
  default: "dark",
  effects_UNSTABLE: [localStorageEffect<"dark" | "light">("dark_mode")],
});

export { darkModeAtom };

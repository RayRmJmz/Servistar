import { create } from "zustand";

import { NavStore } from "../models";

export const useNavStore = create<NavStore>((set) => ({
  sideNavIsOpen: false,
  openSideNav: () => set(() => ({ sideNavIsOpen: true })),
  closeSideNav: () => set(() => ({ sideNavIsOpen: false })),
}));

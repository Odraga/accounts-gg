import { DefaultLayout } from "../layouts/index";
import {
  ExtraExpense,
  ExtraIncome,
  FixedExpense,
  FixedIncome,
  LandingPage,
} from "../pages/index";

export const routes = {
  LandingPage: {
    path: "/",
    clean: "/",
    layout: DefaultLayout,
    page: LandingPage,
  },
  FixedExpense: {
    path: "/expense/fixed",
    clean: "/expense/fixed",
    layout: DefaultLayout,
    page: FixedExpense,
  },
  ExtraExpense: {
    path: "/expense/extra",
    clean: "/expense/extra",
    layout: DefaultLayout,
    page: ExtraExpense,
  },
  FixedIncome: {
    path: "/income/fixed",
    clean: "/income/fixed",
    layout: DefaultLayout,
    page: FixedIncome,
  },
  ExtraIncome: {
    path: "/income/extra",
    clean: "/income/extra",
    layout: DefaultLayout,
    page: ExtraIncome,
  },
};

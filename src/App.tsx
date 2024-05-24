/* import { useEffect } from "react";
import { db } from "./db/db.ts"; */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes.tsx";
import RouteWithNavbar from "./components/common/RouteWithNavbar.tsx";
import { FC } from "react";

const App: FC = () => {
  /* console.log([routes].map((item) => item)); */
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.LandingPage.path}
          element={
            <RouteWithNavbar
              element={routes.LandingPage.page}
              layout={routes.LandingPage.layout}
            />
          }
        />
        <Route
          path={routes.FixedExpense.path}
          element={
            <RouteWithNavbar
              element={routes.FixedExpense.page}
              layout={routes.FixedExpense.layout}
            />
          }
        />

        <Route
          path={routes.ExtraExpense.path}
          element={
            <RouteWithNavbar
              element={routes.ExtraExpense.page}
              layout={routes.ExtraExpense.layout}
            />
          }
        />

        <Route
          path={routes.FixedIncome.path}
          element={
            <RouteWithNavbar
              element={routes.FixedIncome.page}
              layout={routes.FixedIncome.layout}
            />
          }
        />

        <Route
          path={routes.ExtraIncome.path}
          element={
            <RouteWithNavbar
              element={routes.ExtraIncome.page}
              layout={routes.ExtraIncome.layout}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

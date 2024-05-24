import { routes } from "../../routes/routes";

const Navigationbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Account GG</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href={routes.LandingPage.path}>Home</a>
          </li>
          <li>
            <a href="#">Debt</a>
          </li>
          <li>
            <details>
              <summary>Income</summary>
              <ul className="p-2 bg-base-100 rounded-t-none z-50">
                <li>
                  <a href={routes.ExtraIncome.path}>Extra</a>
                </li>
                <li>
                  <a href={routes.FixedIncome.path}>Fixed</a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>Expense</summary>
              <ul className="p-2 bg-base-100 rounded-t-none z-50">
                <li>
                  <a href={routes.ExtraExpense.path}>Extra</a>
                </li>
                <li>
                  <a href={routes.FixedExpense.path}>Fixed</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigationbar;

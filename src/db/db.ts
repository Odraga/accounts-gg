import Dexie, { Table } from "dexie";

import { CurrentBalanceI } from "../interface/db/CurrentBalanceI";
import { DebtI } from "../interface/db/DebtI";
import { ExtraExpenseI } from "../interface/db/ExtraExpenseI";
import { ExtraIncomeI } from "../interface/db/ExtraIncomeI";
import { FixedExpenseI } from "../interface/db/FixedExpenseI";
import { FixedIncomeI } from "../interface/db/FixedIncomeI";

export class MySubClassedDexie extends Dexie {
  currentBalance!: Table<CurrentBalanceI>;
  debt!: Table<DebtI>;
  extraExpense!: Table<ExtraExpenseI>;
  extraIncome!: Table<ExtraIncomeI>;
  fixedExpense!: Table<FixedExpenseI>;
  salary!: Table<FixedIncomeI>;

  constructor() {
    super("myDatabase");

    this.version(4).stores({
      currentBalance: "++id, currentMonth, totalIncome, totalExpense",
      debt: "++id, name, startQuota, endQuota, paid, payable",
      extraExpense: "++id, title, description, amount, creationDate",
      extraIncome: "++id, title, description, amount, creationDate",
      fixedExpense: "++id, title, amount",
      fixedIncomeI: "++id, company, amount, status",
    });
  }
}

export const db = new MySubClassedDexie();

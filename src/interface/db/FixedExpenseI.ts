export interface FixedExpenseI {
  id: number;
  title: string;
  amount: number;
  [key: string]: string | number;
}

export interface ExtraExpenseI {
  id: number;
  title: string;
  description: string;
  amount: number;
  creationDate: string;
  [key: string]: string | number;
}

import React, { FC, useState } from "react";
import Table from "../../../components/Table/Table";
import { ExtraExpenseI } from "../../../interface/db/ExtraExpenseI";

const Extra: FC = () => {
  const [tableHead] = useState([
    "Id",
    "Title",
    "Description",
    "Amount",
    "Creation Date",
  ]);
  const [tableData, setTableData] = useState<ExtraExpenseI[]>([]);
  return (
    <div className="mx-6">
      <Table tableHead={tableHead} tableData={tableData} />
    </div>
  );
};

export default Extra;

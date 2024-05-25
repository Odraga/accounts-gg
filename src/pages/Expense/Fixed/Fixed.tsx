import { FC, useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import { FixedExpenseI } from "../../../interface/db/FixedExpenseI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddEdit from "./components/AddEdit";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db/db";

interface FixedI {}

const Fixed: FC<FixedI> = () => {
  const [tableHead] = useState(["Id", "Title", "Amount"]);
  const [tableData, setTableData] = useState<FixedExpenseI[]>([]);
  const [selected, setSelected] = useState<FixedExpenseI>();

  const [showAddEdit, setShowAddEdit] = useState(false);

  const toggleModal = (status: boolean) => {
    setShowAddEdit(!showAddEdit);

    if (!status) {
      setSelected(undefined);
    }
  };

  const requestData = useLiveQuery(() => db.fixedExpense.toArray(), []);

  useEffect(() => {
    console.log(selected);
    if (requestData) {
      setTableData(requestData);
    }
  }, [requestData, selected]);

  return (
    <>
      {showAddEdit ? (
        <AddEdit
          show={showAddEdit}
          toggleModal={toggleModal}
          selected={selected}
        />
      ) : null}
      <div className="flex flex-col mx-6 mt-2">
        <div className="flex justify-between mb-3 mx-4">
          <div>
            <span className="text-xl">Expense / Fixed</span>
          </div>
          <div>
            <button className="btn btn-info btn-sm" onClick={toggleModal}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div>
          <Table
            tableHead={tableHead}
            tableData={tableData}
            setSelected={setSelected}
            /* typeTable="table-zebra" */
          />
        </div>
      </div>
    </>
  );
};

export default Fixed;

import { FC, useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import { ExtraExpenseI } from "../../../interface/db/ExtraExpenseI";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db/db";
import AddEdit from "./components/AddEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface ExtraI {}

const Extra: FC<ExtraI> = () => {
  const [tableHead] = useState([
    "Id",
    "Title",
    "Description",
    "Amount",
    "Creation Date",
  ]);

  const [tableData, setTableData] = useState<ExtraExpenseI[]>([]);
  const [selected, setSelected] = useState<ExtraExpenseI>();

  const [showAddEdit, setShowAddEdit] = useState(false);

  const toggleModal = (status: boolean) => {
    setShowAddEdit(!showAddEdit);

    if (!status) {
      setSelected(undefined);
    }
  };

  const cleanSelected = () => {
    if (selected !== undefined) {
      toggleModal(true);
    }
  };

  const updateTableData = () => {
    if (requestData) {
      setTableData(requestData);
    }
  };

  const requestData = useLiveQuery(() => db.extraExpense.toArray(), []);

  useEffect(() => {
    updateTableData();
    cleanSelected();
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
            <button
              className="btn btn-info btn-sm"
              onClick={() => toggleModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div>
          <Table
            tableHead={tableHead}
            tableData={tableData}
            setSelected={setSelected}
            tableDelete={"extraExpense"}
            /* typeTable="table-zebra" */
          />
        </div>
      </div>
    </>
  );
};

export default Extra;

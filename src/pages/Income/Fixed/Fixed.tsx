import { FC, useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddEdit from "./components/AddEdit";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db/db";
import { FixedIncomeI } from "../../../interface/db/FixedIncomeI";

interface FixedI {}

const Fixed: FC<FixedI> = () => {
  const [tableHead] = useState(["Id", "Title", "Amount"]);
  const [tableData, setTableData] = useState<FixedIncomeI[]>([]);
  const [selected, setSelected] = useState<FixedIncomeI>();

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

  const requestData = useLiveQuery(() => db.fixedIncome.toArray(), []);

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
            tableDelete={"fixedIncome"}
            /* typeTable="table-zebra" */
          />
        </div>
      </div>
    </>
  );
};

export default Fixed;

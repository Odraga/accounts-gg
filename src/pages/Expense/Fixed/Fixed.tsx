import { FC, useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import { FixedExpenseI } from "../../../interface/db/FixedExpenseI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddEdit from "./components/AddEdit";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db/db";
import { confirmAlert } from "react-confirm-alert";

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

  const deleteConfirm = async (id: string | number) => {
    console.log(id);
    /* confirmAlert({
      closeOnClickOutside: false,
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await db.fixedExpense.delete(selected.id);
            } catch (error) {
              console.error(error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    }); */
  };

  const requestData = useLiveQuery(() => db.fixedExpense.toArray(), []);

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
            delete={deleteConfirm}
            /* typeTable="table-zebra" */
          />
        </div>
      </div>
    </>
  );
};

export default Fixed;

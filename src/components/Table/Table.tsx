import { Dispatch, FC, SetStateAction } from "react";
import { confirmAlert } from "react-confirm-alert";
import { db } from "../../db/db";

interface TableDataI {
  [key: string]: string | number;
}

interface TableI {
  tableHead: string[];
  tableData: TableDataI[];
  typeTable?: string;
  tableDelete: keyof typeof db;
  setSelected: Dispatch<SetStateAction<TableDataI>> | any;
}

const Table: FC<TableI> = ({
  tableHead = [],
  tableData = [],
  typeTable = null,
  tableDelete,
  setSelected,
}) => {
  const deleteConfirm = (id: string | number) => {
    console.log(id);
    confirmAlert({
      closeOnClickOutside: false,
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              console.log(id);
              await db[tableDelete].delete(id);
            } catch (error) {
              console.error(error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className={`table ${typeTable}`}>
        <thead>
          <tr>
            {tableHead.map((item, index) => (
              <th key={index} className={item === "Id" ? "w-24" : "w-auto"}>
                {item}
              </th>
            ))}
            <th className="w-24"></th>
          </tr>
        </thead>
        <tbody>
          {tableData && tableData.length > 0 ? (
            tableData.map((data: TableDataI, rowIndex: number) => {
              return (
                <tr
                  key={rowIndex}
                  className="hover:bg-slate-200 cursor-pointer"
                  onClick={() => setSelected(data)}
                >
                  {Object.keys(data).map((key: string, cellIndex: number) => (
                    <td key={cellIndex}>
                      {key === "id" ? rowIndex + 1 : data[key]}
                    </td>
                  ))}
                  <td>
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConfirm(data.id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center" colSpan={tableHead.length + 1}>
                No data :)
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

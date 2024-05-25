import { Dispatch, FC, SetStateAction } from "react";

interface TableDataI {
  [key: string]: string | number;
}

interface TableI {
  tableHead: string[];
  tableData: TableDataI[];
  typeTable?: string;
  setSelected: Dispatch<SetStateAction<TableDataI>> | any;
  deleteSelected: (value: string | number) => void;
}

const Table: FC<TableI> = ({
  tableHead = [],
  tableData = [],
  typeTable = null,
  setSelected,
  deleteSelected,
}) => {
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
                      onClick={() => deleteSelected(data["id"])}
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

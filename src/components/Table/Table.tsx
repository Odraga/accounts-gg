import React, { Dispatch, FC, SetStateAction } from "react";

interface TableI {
  tableHead: string[];
  tableData: object[];
  typeTable?: string;
  setSelected: Dispatch<SetStateAction<object>>;
}

const Table: FC<TableI> = ({
  tableHead = [],
  tableData = [],
  typeTable = null,
  setSelected,
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
          </tr>
        </thead>
        <tbody>
          {tableData && tableData.length > 0 ? (
            tableData.map((data: object, rowIndex: number) => {
              return (
                <tr
                  key={rowIndex}
                  className="hover:bg-slate-200 cursor-pointer"
                  onClick={() => setSelected(data)}
                >
                  {Object.keys(data).map((key: string, cellIndex: number) => (
                    <td key={cellIndex} /*  colSpan={key === "id" ? 5 : 1} */>
                      {key === "id" ? rowIndex + 1 : data[key]}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center" colSpan={12}>
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

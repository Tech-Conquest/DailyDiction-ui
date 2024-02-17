import React from "react";

const CustomTable = ({
  data,
  buttonClickCB,
}: {
  data: any;
  buttonClickCB: any;
}) => {
  /*
  data = {
    headers: ["","Name", "Job", "Favorite Color"],
    body: ["1", "Cy Ganderton", "Quality Control Specialist", "Blue"],
  }
  */
  return (
    <div className="overflow-x-auto">
      <table className="table text-white">
        {/* head */}
        <thead className="text-white">
          <tr>
            {data.headers.map((header: string, thIndex: number) => (
              <th key={thIndex}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.body.map((row: string[], index: number) => (
            <tr key={index}>
              {row.map((record: string, rowIndex: number) => (
                <td key={rowIndex}>{record}</td>
              ))}
              {data.buttons.map((button: any, buttonIndex: number) => {
                return (
                  <td key={buttonIndex}>
                    <button
                      className={`btn btn-${button.color}`}
                      onClick={(event) =>
                        buttonClickCB(event, row)
                      }
                    >
                      {button.text}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;

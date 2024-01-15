import React, { ChangeEvent, useState } from "react";
import Papa from "papaparse";
import Spinner from "../../pages/Landing/MicroComponents/Spinner";
import { IParsedJSON } from "../../core/interface/ParsedJson";

const CSVUploader = ({
  validateHeaderList,
  validateCSV,
  setJson,
  setError
}: {
  validateHeaderList?: (keyof IParsedJSON)[];
  validateCSV?: boolean;
  setJson: (data:IParsedJSON[]) => void
  setError:(error:string) => void
}) => {
  const [isParsing, setIsParsing] = useState<Boolean>(false);

  const handleCsvUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setIsParsing(true);
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (result: any): any => {

          let parsedJsonData: IParsedJSON[] = result.data;
          let isValidJson = true;

          if (validateCSV) {
            isValidJson = validateMandatedField(parsedJsonData, validateHeaderList || []);
          }

          if (isValidJson) {
           setJson(parsedJsonData)
          }
          else{
           setError("Please upload correct csv file !!")
          }

        },
        header: true,
      });
    }
    setIsParsing(false)
  };

  const validateMandatedField = (
    parsedData: IParsedJSON[],
    validateHeaderList: (keyof IParsedJSON)[]
  ): boolean => {
    if (validateHeaderList.length) {
      for (const parse of parsedData) {
        for (const header of validateHeaderList) {
          if (!parse[header]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  return (
    <>
      {isParsing ? (
        <div className="flex flex-col items-center">
          <Spinner />
          <p className="mt-1">Parsing csv...</p>
        </div>
      ) : (
        <input
          type="file"
          accept=".csv"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleCsvUpload}
        />
      )}
    </>
  );
}

export default CSVUploader;

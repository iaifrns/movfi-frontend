import LoadingPage from "@/components/LoadingPage";
import { dataContext } from "@/hooks/useContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { checkFishAndFileData } from "./services/getDataFile";

const FileData = () => {
  const { fish, activity, setFish, fileData, setFileData } =
    useContext(dataContext);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const [screenSize, setScreenSize] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => setScreenSize(window.innerHeight));
    return window.removeEventListener("resize", () =>
      setScreenSize(window.innerHeight),
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    checkFishAndFileData(
      fish.id,
      fileData?.id,
      activity.id,
      setFish,
      setFileData,
    ).then(() => {
      setLoading(false);
    });
  }, []);

  const columns = useMemo(() => {
    if (!fileData?.data.length) return [];
    return Object.keys(fileData.data[0]);
  }, [fileData?.data]);

  const totalPages = Math.ceil((fileData?.data.length || 0) / rowsPerPage);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return fileData?.data.slice(start, start + rowsPerPage);
  }, [fileData?.data, page, rowsPerPage]);

  const tableContextHeight = (size:number) => {
    if(size < 800){
      return 'h-170'
    }else if(size < 900){
      return 'h-200'
    }else{
      return 'h-220'
    }
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="px-3">
      <div className={`w-full ${tableContextHeight(screenSize)} overflow-hidden flex flex-col`}>
        {/* Table */}
        <div className="overflow-auto rounded-lg border border-gray-300 shadow h-full">
          <table className="min-w-max border-collapse">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th
                  key={"id-rows"}
                  className="border px-4 py-2 text-sm font-semibold whitespace-nowrap"
                >
                  #
                </th>

                {columns.map((column) => (
                  <th
                    key={column}
                    className="border px-4 py-2 text-sm font-semibold whitespace-nowrap"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedRows?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50"
                >
                  <td className="border px-4 py-2 font-medium sticky left-0 bg-inherit">
                    {(page - 1) * rowsPerPage + rowIndex + 1}
                  </td>

                  {columns.map((column) => (
                    <>
                    <td
                      key={column}
                      className="border px-4 py-2 whitespace-nowrap text-sm"
                    >
                      {typeof row[column] === "number"
                        ? Number(row[column]).toFixed(6)
                        : row[column]}
                    </td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * rowsPerPage + 1} -{" "}
            {Math.min(page * rowsPerPage, fileData?.data.length || 0)} of{" "}
            {fileData?.data.length}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="rounded border px-2 py-1"
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileData;

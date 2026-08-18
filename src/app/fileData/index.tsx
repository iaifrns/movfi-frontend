import LoadingPage from "@/components/LoadingPage";
import { dataContext } from "@/hooks/useContext";
import { getPaginatedData } from "@/service/getPaginatedData";
import { useContext, useEffect, useMemo, useState } from "react";
import { checkFishAndFileData } from "./services/getDataFile";
import LoadingIcon from "@/assets/icons/loading";

const FileData = () => {
  const { fish, activity, setFish, fileData, setFileData, count, setCount } =
    useContext(dataContext);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState<Record<string, any>[]>([]);
  const [isFirst, setIsFirst] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
      setCount,
    ).then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (fileData?.data) setDisplayData(fileData?.data);
  }, [fileData?.data]);

  useEffect(() => {
    if (!isFirst && fileData?.id) {
      setIsLoading(true);
      window.scrollTo(0,0)
      getPaginatedData(fileData?.id, page, (v) => {
        setDisplayData(v);
      }).then(() => {
        setIsLoading(false)});
    } else {
      setIsFirst(false);
    }
  }, [page]);

  const columns = useMemo(() => {
    if (!displayData.length) return [];
    return Object.keys(displayData[0]);
  }, [displayData]);

  const totalPages = Math.ceil((count || 0) / 10);

  const paginatedRows = useMemo(() => {
    return displayData;
  }, [displayData, page]);

  const tableContextHeight = (size: number) => {
    if (size < 800) {
      return "h-170";
    } else if (size < 900) {
      return "h-200";
    } else {
      return "h-220";
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="px-3">
      <div
        className={`w-full ${tableContextHeight(screenSize)} overflow-hidden flex flex-col`}
      >
        {/* Table */}
        {isLoading && (
          <div className="w-full flex justify-center items-center mb-2">
            <LoadingIcon /> <p className="font-semibold">Loading ...</p>
          </div>
        )}
        <div className="overflow-auto rounded-lg border shadow h-full">
          <table className="min-w-max border-collapse">
            <thead className="sticky top-0 bg-accent">
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
                <tr key={rowIndex} className="hover:bg-accent">
                  <td className="border px-4 py-2 font-medium sticky left-0 bg-inherit">
                    {rowIndex + 1}
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
            Showing {(page - 1) * 10 + 1} - {Math.min(page * 10)} of {count}
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => {
                if (!isLoading) setPage((p) => p - 1);
              }}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => {
                if (!isLoading) setPage((p) => p + 1);
              }}
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

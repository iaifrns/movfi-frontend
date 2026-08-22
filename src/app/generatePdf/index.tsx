import FishReport from "@/components/generatePDF";
import LoadingPage from "@/components/LoadingPage";
import { dataContext } from "@/hooks/useContext";
import type { Fish } from "@/types/fish";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useContext, useEffect, useState } from "react";
import { getOneActivity } from "../dashboard/services/getOneActivity";
import { getFishandData } from "./service/getFishandData";
import { getGeneralJointPoint } from "@/service/getJointpoints";

const GeneratePDF = () => {
  const { activity, fish, setFish, fileData, setFileData, setActivity } =
    useContext(dataContext);
  const [loading, setLoading] = useState(true);
  const [jointPoints, setJointPoints] = useState<[]>([]);
  const [seg_length, setSeg_length] = useState(0);
  const [tailAmplitude, setTailAmplitude] = useState(0);

  useEffect(() => {
    if (!activity.name) {
      setLoading(true);
      getOneActivity(setActivity);
    }
  }, []);

  useEffect(() => {
    if (activity.id) {
      getFishandData(setFish, setFileData, activity.id, fish.id, fileData?.id);
    }
  }, [activity]);

  useEffect(() => {
    console.log("this is the fileData", fileData?.id);
    if (fileData?.data) {
      getGeneralJointPoint(fish.id).then((result) => {
        setJointPoints(result.joints);
        setSeg_length(result.segementation_length);
        setTailAmplitude(result.tail_amplitude);
        setLoading(false);
      });
    }
  }, [fileData?.data]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="w-full justify-center items-center flex">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Analysis Report</h1>

          <p className="mt-2 text-sm">
            Your fish kinematics analysis is complete. You can download a
            detailed PDF report containing the results and summary of the
            analysis.
          </p>
        </div>

        {/* Report Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Card Header */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">
            <div className="flex items-center gap-4">
              {/* PDF Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V7.828a2 2 0 00-.586-1.414l-4.828-4.828A2 2 0 0012.172 1H7a2 2 0 00-2 2v16a2 2 0 002 2z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 2v6h6"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Fish Kinematics Analysis Report
                </h2>

                <p className="text-sm text-gray-500">
                  PDF report • Analysis summary
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-sm leading-6 text-gray-600">
              The generated report contains the information and results obtained
              from your fish kinematics analysis.
            </p>

            {/* Included sections */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">
                The report includes
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ReportItem
                  title="Fish information"
                  description="Species, length, weight and identification"
                />

                <ReportItem
                  title="Dataset information"
                  description="Frames, FPS, duration and number of points"
                />

                <ReportItem
                  title="Kinematic parameters"
                  description="Tail beat, curvature, speed and other measurements"
                />

                <ReportItem
                  title="Analysis results"
                  description="Calculated values and statistical summaries"
                />

                <ReportItem
                  title="Visualisations"
                  description="Graphs and analysis visualisations"
                />

                <ReportItem
                  title="Travelling wave analysis"
                  description="Wave parameters and simulation results"
                />
              </div>
            </div>

            {/* Download section */}
            <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Ready to download?
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Generate your complete analysis report as a PDF.
                  </p>
                </div>

                <PDFDownloadLink
                  document={
                    <FishReport
                      activityName={activity.name}
                      fish={fish as Fish}
                      data={fileData?.data || []}
                      joints={jointPoints}
                      seg_length={seg_length}
                      tail_amplitude={tailAmplitude}
                      swiming_speed={0}
                    />
                  }
                  fileName="fish-kinematics-report.pdf"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {({ loading }) => (
                    <>
                      {loading ? "Generating report..." : "Download PDF"}

                      {!loading && (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      )}
                    </>
                  )}
                </PDFDownloadLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <PDFDownloadLink
        document={
          <FishReport
            activityName={activity.name}
            fish={fish as Fish}
            data={fileData?.data || []}
            joints={jointPoints}
            seg_length={seg_length}
            tail_amplitude={tailAmplitude}
            swiming_speed={0}
          />
        }
        fileName={activity.name + "-fish-kinematics-report.pdf"}
        className="border w-fit p-2 rounded-md bg-primary text-white"
      >
        {({ loading }) =>
          loading ? "Generating report..." : "Download PDF Report"
        }
      </PDFDownloadLink> */}
    </div>
  );
};

export default GeneratePDF;

function ReportItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-gray-100 bg-white p-3">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-3 w-3 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>

        <p className="mt-0.5 text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}

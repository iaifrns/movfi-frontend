import type { SimulatedData } from "@/types/fish";

const DataGenerateInputs = ({
  dataInput,
  setDataInput,
}: {
  dataInput: SimulatedData;
  setDataInput: (_: SimulatedData) => void;
}) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-3">
        <div>
          <p className="font-bold mb-2">Fish Informations</p>
          <p className="text-sm ">
            Enter the fish and swimming parameters below. These values will be
            used to generate a simulated fish movement using a travelling-wave
            model. if a value is left empty it will be a default value that will
            be replace by it
          </p>
        </div>

        {/* start of the form */}
        <div className="w-full flex flex-col gap-1">
          <div>
            <label htmlFor="activityName" className="text-sm font-semibold">
              Body Points
            </label>
            <p className="text-xs">
              Number of points used to represent the fish body
            </p>
          </div>
          <input
            type="number"
            id="bodyPoints"
            name="bodyPoints"
            placeholder="Enter the number of body points"
            value={dataInput.body_points}
            onChange={(e) =>
              setDataInput({
                ...dataInput,
                body_points: parseInt(e.target.value),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <div>
            <label htmlFor="activityName" className="text-sm font-semibold">
              Maximum Tail Amplitude (cm)
            </label>
            <p className="text-xs">Maximum lateral displacement at the tail</p>
          </div>
          <input
            type="number"
            id="maxTailAmplitude"
            name="maxTailAmplitude"
            placeholder="Enter the maximum tail amplitude"
            value={dataInput.max_amplitude}
            onChange={(e) =>
              setDataInput({
                ...dataInput,
                max_amplitude: parseFloat(e.target.value),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <div>
            <label htmlFor="activityName" className="text-sm font-semibold">
              Tail Beat Frequency (Hz)
            </label>
            <p className="text-xs">Number of tail oscillations per second</p>
          </div>
          <input
            type="number"
            id="tailBeatFrequency"
            name="tailBeatFrequency"
            placeholder="Enter activity name"
            value={dataInput.tail_beat_frequency}
            onChange={(e) =>
              setDataInput({
                ...dataInput,
                tail_beat_frequency: parseFloat(e.target.value),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <div>
            <label htmlFor="activityName" className="text-sm font-semibold">
              Wavelength (BL)
            </label>
            <p className="text-xs">
              Length of one travelling wave along the fish body
            </p>
          </div>
          <input
            type="number"
            id="wavelength"
            name="wavelength"
            placeholder="Enter the wavelength in body lengths"
            value={dataInput.wave_length}
            onChange={(e) =>
              setDataInput({
                ...dataInput,
                wave_length: parseFloat(e.target.value),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <div>
            <label htmlFor="activityName" className="text-sm font-semibold">
              Simulation Duration (s)
            </label>
            <p className="text-xs">
              How long the simulated movement should run
            </p>
          </div>
          <input
            type="number"
            id="simulationDuration"
            name="simulationDuration"
            value={dataInput.duration}
            onChange={(e) =>
              setDataInput({ ...dataInput, duration: parseInt(e.target.value) })
            }
            placeholder="Enter the simulation duration in seconds"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <div>
            <label htmlFor="activityName" className="text-sm font-semibold">
              Frames Per Second (FPS)
            </label>
            <p className="text-xs">Number of frames generated per second</p>
          </div>
          <input
            type="number"
            id="fps"
            name="fps"
            placeholder="Enter the frames per second"
            value={dataInput.fps}
            onChange={(e) =>
              setDataInput({ ...dataInput, fps: parseInt(e.target.value) })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default DataGenerateInputs;

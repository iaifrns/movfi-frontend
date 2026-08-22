import { getCurvatures } from "@/app/dashboard/services/curvature";
import { getJointAngles } from "@/app/dashboard/services/jointAngles";
import type { Fish } from "@/types/fish";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useMemo, useState } from "react";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
  },

  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    padding: 5,
  },

  label: {
    width: "40%",
    fontWeight: "bold",
  },

  value: {
    width: "60%",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    padding: 5,
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 1,
  },

  column: {
    width: "25%",
  },
});
const FishReport = ({
  data,
  seg_length,
  tail_amplitude,
  swiming_speed,
  joints,
  activityName,
  fish,
}: {
  data: Record<string, any>[];
  seg_length: number;
  tail_amplitude: number;
  swiming_speed: number;
  joints: number[];
  activityName: string;
  fish: Fish;
}) => {
  const [jointAngles, setJointAngles] = useState<Record<string, any>>({});
  const [curvature, setCurvature] = useState<Record<string, any>>({});

  const section = useMemo(() => {
    if (Object.keys(jointAngles).length < 1) return 0;
    return Math.round(Object.values(jointAngles)[0].length / 10);
  }, [jointAngles]);

  useEffect(() => {
    if (!data || data.length === 0 || joints.length === 0) {
      console.log("No data or joints available");
      return;
    }
    setJointAngles(getJointAngles(data, joints as []));
    setCurvature(getCurvatures(data, joints as []));
  }, [data]);

  const lastInd = (size: number, ind: number) => {
    if (size > (ind + 1) * 10) return (ind + 1) * 10;
    return size;
  };

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <Text style={styles.title}>
          {activityName} Fish Kinematics Analysis Report
        </Text>
        <Text style={styles.sectionTitle}>Fish Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{fish.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Species</Text>
          <Text style={styles.value}>{fish.species}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Length</Text>
          <Text style={styles.value}>{fish.length} cm</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Weight</Text>
          <Text style={styles.value}>{fish.weight} cm</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Behavior</Text>
          <Text style={styles.value}>{fish.behavior}</Text>
        </View>

        {!fish.file && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Points per frame</Text>
              <Text style={styles.value}>{fish.body_points}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{fish.duration}s</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Frame per second</Text>
              <Text style={styles.value}>{fish.fps}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Max Amplitude</Text>
              <Text style={styles.value}>{fish.max_amplitude}cm</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Tail Beat Frequency</Text>
              <Text style={styles.value}>{fish.tail_beat_frequency}Hz</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Wave length</Text>
              <Text style={styles.value}>{fish.wave_length}cm</Text>
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>Dataset Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Number of frames</Text>
          <Text style={styles.value}>
            {data[0] ? Object.keys(data[0]).length / 2 : 0}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Joint points</Text>
          <Text style={styles.value}>{joints.join(", ")}</Text>
        </View>

        <Text style={styles.sectionTitle}>Kinematic Parameters</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Tail Beat Amplitude</Text>
          <Text style={styles.value}>{tail_amplitude.toFixed(4)} cm</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Swimming speed</Text>
          <Text style={styles.value}>{swiming_speed}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Segmentation Length</Text>
          <Text style={styles.value}>{seg_length}</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page} key={"joint Angle"}>
        <Text style={styles.title}>Joint Angle Analysis</Text>
        {section > 1 && (
          <Text>
            Since the joint angle table is too long it will be in {section}{" "}
            sections
          </Text>
        )}
        {Array.from({ length: section }).map((_, i) => (
          <>
            <Text style={styles.sectionTitle}>Section {i + 1}</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.column}>Frame</Text>
              {Object.values(jointAngles)[0] && (
                <>
                  {(Object.values(jointAngles)[0] as [])
                    .slice(
                      i * 10,
                      lastInd(
                        (Object.values(jointAngles)[0] as []).length,
                        i,
                      ),
                    )
                    .map((_, ind) => (
                      <Text style={styles.column}>Angle {ind + 1 + (i*10)}</Text>
                    ))}
                </>
              )}
            </View>

            {Object.keys(jointAngles).map((frame, index) => (
              <View style={styles.tableRow} key={index + "frame"}>
                <Text style={styles.column}>{frame}</Text>

                {(jointAngles[frame] as number[])
                  .slice(
                    i * 10,
                    lastInd((Object.values(jointAngles)[0] as []).length, i),
                  )
                  .map((item, ind) => (
                    <Text style={styles.column} key={ind + "-joint-" + frame}>
                      {item.toFixed(3)}°
                    </Text>
                  ))}
              </View>
            ))}
          </>
        ))}
      </Page>

      <Page size="A4" style={styles.page} key={"Curvature"}>
        <Text style={styles.title}>Curvature analysis</Text>
        {section > 1 && (
          <Text>
            Since the Curvature analysis table is too long it will be in {section}{" "}
            sections
          </Text>
        )}
        {Array.from({ length: section }).map((_, i) => (
          <>
            <Text style={styles.sectionTitle}>Section {i + 1}</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.column}>Frame</Text>
              {Object.values(curvature)[0] && (
                <>
                  {(Object.values(curvature)[0] as [])
                    .slice(
                      i * 10,
                      lastInd(
                        (Object.values(curvature)[0] as []).length,
                        i,
                      ),
                    )
                    .map((_, ind) => (
                      <Text style={styles.column}>Curve {ind + 1 + (i*10)}</Text>
                    ))}
                </>
              )}
            </View>

            {Object.keys(curvature).map((frame, index) => (
              <View style={styles.tableRow} key={index + "frame"}>
                <Text style={styles.column}>{frame}</Text>

                {(curvature[frame] as number[])
                  .slice(
                    i * 10,
                    lastInd((Object.values(curvature)[0] as []).length, i),
                  )
                  .map((item, ind) => (
                    <Text style={styles.column} key={ind + "-joint-" + frame}>
                      {item.toFixed(3)}
                    </Text>
                  ))}
              </View>
            ))}
          </>
        ))}
      </Page>

      <Page size="A4" style={styles.page} key={"Bending"}>
        <Text style={styles.title}>Bending Angle Analysis</Text>
        {section > 1 && (
          <Text>
            Since the Bending angle table is too long it will be in {section}{" "}
            sections
          </Text>
        )}
        {Array.from({ length: section }).map((_, i) => (
          <>
            <Text style={styles.sectionTitle}>Section {i + 1}</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.column}>Frame</Text>
              {Object.values(jointAngles)[0] && (
                <>
                  {(Object.values(jointAngles)[0] as [])
                    .slice(
                      i * 10,
                      lastInd(
                        (Object.values(jointAngles)[0] as []).length,
                        i,
                      ),
                    )
                    .map((_, ind) => (
                      <Text style={styles.column}>Angle {ind + 1 + (i*10)}</Text>
                    ))}
                </>
              )}
            </View>

            {Object.keys(jointAngles).map((frame, index) => (
              <View style={styles.tableRow} key={index + "frame"}>
                <Text style={styles.column}>{frame}</Text>

                {(jointAngles[frame] as number[])
                  .slice(
                    i * 10,
                    lastInd((Object.values(jointAngles)[0] as []).length, i),
                  )
                  .map((item, ind) => (
                    <Text style={styles.column} key={ind + "-joint-" + frame}>
                      {(180 - item).toFixed(3)}°
                    </Text>
                  ))}
              </View>
            ))}
          </>
        ))}
      </Page>
    </Document>
  );
};

export default FishReport;

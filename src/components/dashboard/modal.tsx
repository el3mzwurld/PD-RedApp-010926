import { ArrowDropDown } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Volume } from "../../assets/data/data";
import {
  transactionCount,
  transactionVolume,
  transactionCountByDay,
  transactionVolumeByDay,
  transactionCountByMonth,
  transactionVolumeByMonth,
} from "./../../assets/data/data";

import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
} from "recharts";
type Range = "daily" | "weekly" | "monthly";

interface ModalProps {
  mode: "line" | "bar";
}

export const Modal = ({ mode }: ModalProps) => {
  const [timeRange, setTimeRange] = useState<Range>("weekly");
  const [data, setData] = useState<Volume[]>([]);

  useEffect(() => {
    const loadData = () => {
      if (mode === "line" && timeRange == "daily") {
        setData(transactionVolume);
        return;
      }
      if (mode === "bar" && timeRange === "daily") {
        setData(transactionCount);
        return;
      }
      if (mode === "line" && timeRange === "weekly") {
        setData(transactionVolumeByDay);
        return;
      }
      if (mode === "line" && timeRange === "monthly") {
        return setData(transactionVolumeByMonth);
      }
      if (mode === "bar" && timeRange === "weekly") {
        return setData(transactionCountByDay);
      }
      if (mode === "bar" && timeRange === "monthly") {
        return setData(transactionCountByMonth);
      }
    };

    void loadData();
  }, [timeRange, mode]);

  const setRange = (time: Range) => {
    setTimeRange(time);
  };

  const ranges: Range[] = ["daily", "weekly", "monthly"];

  return (
    <Stack
      sx={{
        width: { md: "100%", xl: 550 },
        height: { md: 230 },
        backgroundColor: "white",
        paddingY: 1,
        borderRadius: 1,
      }}
    >
      {/* header */}
      <div
        style={{
          width: "100%",
          height: 25,
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          gridTemplateColumns: "1fr 2fr 1fr",
          padding: "2px 10px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            gridColumn: 2,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mode === "line" ? "Transaction Volume" : "Transaction Count"}
        </Typography>

        <select
          value={timeRange}
          style={{ width: "100%", height: "100%", gridColumn: 3 }}
          onChange={(e) => setRange(e.target.value.toLowerCase() as Range)}
        >
          {ranges.map((r, index) => {
            const capitalized = r.charAt(0).toUpperCase() + r.slice(1);
            return (
              <option
                key={index}
                style={{
                  width: "100%",
                  height: "100%",
                  paddingLeft: 2,
                  fontSize: 12,
                }}
                value={r}
              >
                {capitalized}
              </option>
            );
          })}
        </select>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          width: "100%",
          paddingLeft: 5.5,
          paddingRight: 5.5,
          height: "169px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {mode === "line" ? <LineGraph data={data} /> : <BarGraph data={data} />}
      </div>
    </Stack>
  );
};

const LineGraph = ({ data }: { data: Volume[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 15, right: 10, left: 15, bottom: 5 }}
        style={{ fontSize: 9 }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="y"
          strokeWidth={2}
          name="Transaction Volume"
          stroke="#EE1721"
        />
        <XAxis dataKey="name" label={{}} />
        <YAxis
          width={40}
          label={{
            value: "Volume",
            position: "insideLeft",
            angle: -90,
            offset: -5,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const BarGraph = ({ data }: { data: Volume[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        style={{ fontSize: 9 }}
        margin={{ top: 15, right: 10, left: 15, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <Bar
          type="monotone"
          dataKey="y"
          strokeWidth={2}
          name="Transaction Volume"
          fill="#EE1721"
        />
        <XAxis dataKey="name" label={{}} />
        <YAxis
          label={{
            value: "Count",
            position: "insideLeft",
            angle: -90,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

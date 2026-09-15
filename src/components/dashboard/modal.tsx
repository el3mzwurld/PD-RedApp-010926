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
  type PieSectorShapeProps,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import CustomerCount from "../ui/CustomerCount";

export type Range = "daily" | "weekly" | "monthly";

interface ModalProps {
  mode: "line" | "bar" | "merchant count";
  timeRange?: Range;
  setTimeRange: (time: Range) => void;
}

export const Modal = ({ mode, timeRange }: ModalProps) => {
  const [data, setData] = useState<Volume[]>([]);
  const role: "merchant" | "admin" = "admin";
  useEffect(() => {
    const loadData = () => {
      if (!timeRange) return;
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

  const ranges: Range[] = ["daily", "weekly", "monthly"];

  return (
    <Stack
      sx={{
        width: { md: "100%" },
        height: "100%",
        backgroundColor: "white",
        paddingY: 1,
        borderRadius: 1,
      }}
    >
      {/* header */}
      {(mode === "bar" || mode === "line") && (
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

          {role === "admin" && (
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
          )}
        </div>
      )}
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
        {mode === "line" && <LineGraph data={data} />}
        {mode === "bar" && <BarGraph data={data} />}
        {mode === "merchant count" && <MerchantCount />}
      </div>
    </Stack>
  );
};

export const LineGraph = ({ data }: { data: Volume[] }) => {
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

export const BarGraph = ({ data }: { data: Volume[] }) => {
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

export const PieGraph = ({
  data,
  isAnimationActive = true,
}: {
  data: { status: string; value: number }[];
  isAnimationActive: boolean;
}) => {
  return (
    <PieChart
      style={{
        width: "90%",
        height: "80%",
        aspectRatio: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
      responsive
    >
      <Pie
        data={data}
        labelLine={false}
        dataKey={"value"}
        isAnimationActive={isAnimationActive}
        shape={PieSector}
        nameKey={"status"}
      ></Pie>
      <Legend wrapperStyle={{ width: "100%" }} labelStyle={{ fontSize: 8 }} />
    </PieChart>
  );
};

const PieSector = (props: PieSectorShapeProps) => {
  const p = useActiveTooltipDataPoints();
  const isToolTipActive = useIsTooltipActive();
  const isThisPieActive = isToolTipActive && props.payload === p?.[0];
  let fillOpacty: number;
  const COLORS = ["#358EB5", "#BA68C8", "#EE1721", "#BE9731"];

  if (isToolTipActive && !isThisPieActive) {
    fillOpacty = 0.5;
  } else {
    fillOpacty = 1;
  }
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      stroke="none"
      fillOpacity={fillOpacty}
      style={{ transition: "fill-opacity 0.3s ease" }}
    ></Sector>
  );
};

export const MerchantCount = () => {
  return (
    <Stack
      spacing={0}
      sx={{ width: "100%", height: "100%", alignItems: "center" }}
    >
      <p style={{ fontSize: 14, fontFamily: "poppins", fontWeight: 600 }}>
        Merchants
      </p>

      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <CustomerCount variant="new" />
        <CustomerCount variant="active" />
        <CustomerCount variant="inactive" />
        <CustomerCount variant="total" />
      </Stack>
    </Stack>
  );
};

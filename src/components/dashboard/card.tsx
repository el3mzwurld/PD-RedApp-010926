import type { RenderedPage } from "../../pages/home";
import CustomerCount from "../ui/CustomerCount";
import QuickLinks from "../ui/QuickLinks";
import { PieGraph } from "./modal";

interface CardProps {
  mode:
    | "customer count"
    | "quick links"
    | "transaction volume"
    | "transaction count";

  pageChange?: (page: RenderedPage) => void;
}

const pieData: { status: string; value: number }[] = [
  { status: "Successful", value: 550 },
  { status: "Failed", value: 100 },
  { status: "Processing", value: 250 },
  { status: "Pending", value: 150 },
];

const countData: typeof pieData = [
  { status: "Successful", value: 800 },
  { status: "Failed", value: 200 },
];
export const Card = ({ mode, pageChange }: CardProps) => {
  return (
    <div
      className="dash--card"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 15,
        overflow: "hidden",
      }}
    >
      {/* title */}
      <div
        className="dash-card--title"
        style={{
          width: "100%",
          height: "auto",
          padding: "1.5px",
          textAlign: "center",
          fontSize: 14,
        }}
      >
        {mode === "customer count" && "Customers"}
        {mode === "quick links" && "Quick Links"}
        {mode === "transaction volume" && "Transaction Volume"}
        {mode === "transaction count" && "Transaction Count"}
      </div>
      {/* content container*/}
      <div
        className="dash-card--content"
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {mode === "customer count" && <CustomerCount />}
        {mode === "quick links" && pageChange && (
          <QuickLinks pageChange={pageChange} />
        )}
        {mode === "transaction volume" && (
          <PieGraph data={pieData} isAnimationActive={true} />
        )}
        {mode === "transaction count" && (
          <PieGraph data={countData} isAnimationActive={true} />
        )}
      </div>
    </div>
  );
};

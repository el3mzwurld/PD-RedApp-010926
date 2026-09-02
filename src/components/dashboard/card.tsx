import type { RenderedPage } from "../../pages/home";
import CustomerCount from "../ui/CustomerCount";
import QuickLinks from "../ui/QuickLinks";

interface CardProps {
  mode:
    | "customer count"
    | "quick links"
    | "transaction volume"
    | "transaction count";

  pageChange?: (page: RenderedPage) => void;
}

export const Card = ({ mode, pageChange }: CardProps) => {
  return (
    <div
      className="dash--card"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: 5,
        borderRadius: 15,
      }}
    >
      {/* title */}
      <div
        className="dash-card--title"
        style={{
          width: "100%",
          height: "auto",
          padding: "5px",
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
          padding: "5px",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        {mode === "customer count" && <CustomerCount />}
        {mode === "quick links" && pageChange && (
          <QuickLinks pageChange={pageChange} />
        )}
      </div>
    </div>
  );
};

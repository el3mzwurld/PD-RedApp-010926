interface CustomerCountProps {
  variant: "new" | "total" | "active" | "inactive";
}

const CustomerCount = ({ variant = "total" }: CustomerCountProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* count */}
      <div className={`count-outer-ring-${variant}`}>
        {/* outer div */}

        <div className={`count-inner-ring-${variant}`}>
          <h2>409</h2>
        </div>
      </div>
      <p style={{ fontSize: 12 }}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </p>
    </div>
  );
};

export default CustomerCount;

const CustomerCount = () => {
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
      <div className="count-outer-ring">
        {/* outer div */}

        <div className="count-inner-ring">
          <h2>409</h2>
        </div>
      </div>
      <p style={{ fontSize: 12 }}>Total</p>
    </div>
  );
};

export default CustomerCount;

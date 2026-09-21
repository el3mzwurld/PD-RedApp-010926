import { useNavigate } from "react-router-dom";
import type { RenderedPage } from "../../pages/home";
import { LinkOutlined } from "@mui/icons-material";

const QuickLinks = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        gap: 5,
        padding: "10px 10px",
        justifyContent: "space-evenly",
      }}
    >
      {(["disputes", "customers", "transaction"] as RenderedPage[]).map(
        (p, index) => (
          <MyLink name={p} key={index} />
        ),
      )}
    </div>
  );
};

interface MyLinkProps {
  name: RenderedPage;
}
const MyLink = (props: MyLinkProps) => {
  const nav = useNavigate();
  const formalizedLink =
    props.name.charAt(0).toUpperCase() + props.name.slice(1);
  return (
    <div
      onClick={() => {
        nav(props.name.toLowerCase());
      }}
      style={{
        width: "100%",
        height: "40px",
        borderRadius: 8,
        backgroundColor: "lightgray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#d0031b6a",
          borderRadius: 100,
        }}
      >
        <LinkOutlined sx={{ color: "white", width: "50%" }} />
      </div>
      <p
        className="quick-link--item"
        style={{ width: "50%", textAlign: "center", fontWeight: 500 }}
      >
        {formalizedLink}
      </p>
    </div>
  );
};

export default QuickLinks;

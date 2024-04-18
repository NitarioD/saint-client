import { useRouter } from "next/router";

const Card = ({ h3, p, button }) => {
  const router = useRouter();
  return (
    <div className="card">
      <h3
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "14px",
        }}
      >
        {h3}
      </h3>
      <p style={{ marginBottom: "80px", fontSize: "1rem" }}>{p}</p>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <button
          onClick={() =>
            button == "DETAILS HERE"
              ? router.push("/about/the_point_man")
              : button == "EXPLORE MORE"
              ? router.push("/posts/sermons/publications")
              : button == "JOIN US" && router.push("/user/subscribe")
          }
        >
          {button}
        </button>
      </div>
    </div>
  );
};

export default Card;

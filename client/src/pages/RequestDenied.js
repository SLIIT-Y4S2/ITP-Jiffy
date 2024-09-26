function RequestDenied(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>{props.error} </h2>
        <h1 style={{ textAlign: "center" }}>😥</h1>
      </div>
    </div>
  );
}

export default RequestDenied;

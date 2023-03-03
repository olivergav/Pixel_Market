import "./Loader.scss";

function Loader({ fullScreen }) {
  return (
    <div className={fullScreen ? "lds-box full-screen" : "lds-box"}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;

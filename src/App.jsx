import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{ width: 1176, fontFamily: "Pretendard" }}
          className="bg-white"
        >
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;

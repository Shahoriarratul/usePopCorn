import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

// function HandleRating() {
//   const [autoRate, setAutoRate] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" maxRating={5} />
//       <p>Rating: {autoRate}</p>
//       <StarRating
//         maxRating={10}
//         color="red"
//         className="test"
//         defaultRating={3}
//         onSetRating={setAutoRate}
//       />
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />

    {/* <HandleRating /> */}
  </React.StrictMode>
);

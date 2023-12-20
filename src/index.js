import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

<<<<<<< .mine

















=======
function HandleRating() {
  const [autoRate, setAutoRate] = useState(0);
  return (
    <div>
      <StarRating color="blue" maxRating={5} />
      <p>Rating: {autoRate}</p>
      <StarRating
        maxRating={10}
        color="red"
        className="test"
        defaultRating={3}
        onSetRating={setAutoRate}
      />
    </div>
  );
}

>>>>>>> .theirs
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={2} />

<<<<<<< .mine
    <Test /> */}
=======
     <HandleRating /> 
>>>>>>> .theirs
  </React.StrictMode>
);

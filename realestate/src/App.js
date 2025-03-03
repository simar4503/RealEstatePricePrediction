
import { useState, useEffect } from "react";
import DataInputForm from "./components/DataInputForm";
import { predictPrice } from "./neuralNetwork";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function App() {
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [actualPrice, setActualPrice] = useState(null);
  const [chartData, setChartData] = useState([]);

  // Load actual prices from JSON
  useEffect(() => {
    fetch("/data/real_estate_data.json")
      .then((response) => response.json())
      .then((data) => setActualPrice(data[0]?.price || 0)) // Use first price as a placeholder
      .catch((error) => console.error("❌ Error loading actual prices:", error));
  }, []);

  // Handle prediction from form submission
  const handlePredict = (inputData) => {
    const result = predictPrice(inputData);

    if (result && !isNaN(result.price)) {
      const scaledPredictedPrice = result.price * 1000000; // Scale back price
      setPredictedPrice(scaledPredictedPrice);

      // Update chart data
      setChartData([
        { name: "Actual Price", value: actualPrice },
        { name: "Predicted Price", value: scaledPredictedPrice },
      ]);
    } else {
      setPredictedPrice("Error in prediction");
    }
  };

  return (
    <div className="container">
      <h1>Real Estate Price Prediction</h1>
      <DataInputForm onPredict={handlePredict} />

      {predictedPrice !== null && (
        <div>
          <h2>Predicted Price: ${typeof predictedPrice === "number" ? predictedPrice.toFixed(2) : predictedPrice}</h2>

          {/* Recharts Bar Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default App;


/*import { useState } from "react";
import DataInputForm from "./components/DataInputForm";
import { predictPrice } from "./neuralNetwork";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function App() {
  const [predictedPrice, setPredictedPrice] = useState(null);

  // Handle prediction from form submission
  const handlePredict = (inputData) => {
    const result = predictPrice(inputData);

    if (result && !isNaN(result.price)) {
      setPredictedPrice(result.price * 1000000); // Scale back price
    } else {
      setPredictedPrice("Error in prediction");
    }
  };

  const sampleData = [
    { name: "Actual", price: 50000 },
    { name: "Predicted", price: predictedPrice },
  ];

  <LineChart width={400} height={200} data={sampleData}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <CartesianGrid stroke="#ccc" />
  <Line type="monotone" dataKey="price" stroke="#8884d8" />
</LineChart>

  return (
    <div className="container">
      <h1>Real Estate Price Prediction</h1>
      <DataInputForm onPredict={handlePredict} />
      {predictedPrice !== null && (
        <div>
          <h2>Predicted Price: ${predictedPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default App;*/


import * as brain from "brain.js";

// Ensure brain.js is properly imported
if (!brain || !brain.NeuralNetwork) {
  console.error("❌ Brain.js is not loaded correctly!");
}

const net = new brain.NeuralNetwork();

// Sample Training Data
const trainingData = [
  { input: { area: 0.5, bedrooms: 0.6, bathrooms: 0.4, location: 0.2, age: 0.1 }, output: { price: 0.7 } },
];

// Train model only if training data is available
if (trainingData.length > 0) {
  net.train(trainingData);
} else {
  console.error("❌ No training data available.");
}

// Function to Predict Price
export const predictPrice = (inputData) => {
  console.log("🔍 Input Data for Prediction:", inputData);
  
  const result = net.run(inputData);
  
  if (!result || isNaN(result.price)) {
    console.error("❌ Prediction failed. Returning default value.");
    return { price: 0 };  // Default output if prediction fails
  }
  
  return result;
};

import { useState } from "react";

const DataInputForm = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    age: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure valid numeric inputs
    const parsedData = {
      area: parseFloat(formData.area) / 10000 || 0,  
      bedrooms: parseFloat(formData.bedrooms) / 10 || 0,
      bathrooms: parseFloat(formData.bathrooms) / 10 || 0,
      location: parseFloat(formData.location) / 100 || 0,
      age: parseFloat(formData.age) / 100 || 0,
    };

    onPredict(parsedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Area (sq ft):</label>
      <input type="number" name="area" value={formData.area} onChange={handleChange} required />

      <label>Bedrooms:</label>
      <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />

      <label>Bathrooms:</label>
      <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />

      <label>Location Score (1-100):</label>
      <input type="number" name="location" value={formData.location} onChange={handleChange} required />

      <label>Age of Property:</label>
      <input type="number" name="age" value={formData.age} onChange={handleChange} required />

      <button type="submit">Predict Price</button>
    </form>
  );
};

export default DataInputForm;
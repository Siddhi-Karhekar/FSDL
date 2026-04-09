import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // This updates the specific field in our object
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setIsSubmitted(true);
    } else {
      setErrors(validationErrors);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {isSubmitted && <div className="success">Form Submitted Successfully! ✅</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="text" 
            name="name" // Added name attribute
            placeholder="Name" 
            value={formData.name} // This makes the input "Controlled"
            onChange={handleChange} 
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="input-group">
          <input 
            type="email" 
            name="email" // Added name attribute
            placeholder="Email" 
            value={formData.email} // This makes the input "Controlled"
            onChange={handleChange} 
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="input-group">
          <input 
            type="password" 
            name="password" // Added name attribute
            placeholder="Password" 
            value={formData.password} // This makes the input "Controlled"
            onChange={handleChange} 
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
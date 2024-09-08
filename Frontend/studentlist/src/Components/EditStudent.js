import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudent = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState(student);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/students/${formData.regno}`, formData)
      .then(response => {
        onSave(formData);
        onClose();
      })
      .catch(error => {
        console.error('There was an error updating the student:', error);
      });
  };

  return (
    <div className="edit-student-form">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Department:
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
        </label>
        <label>
          Class:
          <input type="text" name="class" value={formData.class} onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditStudent;

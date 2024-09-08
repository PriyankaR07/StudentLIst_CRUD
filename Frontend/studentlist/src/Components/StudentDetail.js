import React from 'react';

const StudentDetail = ({ student, onClose }) => {
  return (
    <div className="student-detail-container">
      <h2>Student Details</h2>
      <table className="detail-table">
        <tbody>
          <tr>
            <th>RegNo:</th>
            <td>{student.regno}</td>
          </tr>
          <tr>
            <th>Name:</th>
            <td>{student.name}</td>
          </tr>
          <tr>
            <th>Department:</th>
            <td>{student.department}</td>
          </tr>
          <tr>
            <th>Class:</th>
            <td>{student.class}</td>
          </tr>
        </tbody>
      </table>
      <button className="close-btn" onClick={onClose}>Back</button>
    </div>
  );
};

export default StudentDetail;

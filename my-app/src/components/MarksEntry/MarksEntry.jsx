import React, { useState } from 'react';
import './MarksEntry.css';

// Added onAddSubject to the props
function MarksEntry({ subjects, onAddStudent, onAddSubject }) {
  const [formData, setFormData] = useState({ name: '', marks: {} });
  const [newSubjectName, setNewSubjectName] = useState(''); // State for the new subject input

  const handleMarkChange = (subject, value) => {
    setFormData(prev => ({
      ...prev,
      marks: { ...prev.marks, [subject]: value }
    }));
  };

  // Triggered when "Add Subject" is clicked
  const handleAddNewSubject = () => {
    if (newSubjectName.trim() !== '') {
      onAddSubject(newSubjectName);
      setNewSubjectName(''); // Clear the input field
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent(formData);
    setFormData({ name: '', marks: {} });
    alert("Student record saved successfully!");
  };

  return (
    <section className="card">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Enter Student Marks</h2>
      
      {/* --- New Add Subject Row --- */}
      <div className="add-subject-container">
        <input 
          type="text" 
          placeholder="New subject (e.g. Physics)" 
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
        />
        <button type="button" onClick={handleAddNewSubject} className="add-sub-btn">
          + Add Subject
        </button>
      </div>
      
      <div className="form-divider"></div>

      {/* --- Main Student Form --- */}
      <form onSubmit={handleSubmit} className="marks-form">
        <div className="form-group full-width">
          <label>Student Name</label>
          <input 
            type="text" 
            placeholder="e.g. Jane Doe"
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
          />
        </div>
        
        <div className="marks-grid">
          {subjects.map(subject => (
            <div className="form-group" key={subject}>
              <label>{subject} (0-100)</label>
              <input 
                type="number" 
                min="0" 
                max="100" 
                placeholder="0"
                value={formData.marks[subject] || ''} 
                onChange={(e) => handleMarkChange(subject, e.target.value)} 
                required 
              />
            </div>
          ))}
        </div>

        <button type="submit" className="save-btn">Save Student Record</button>
      </form>
    </section>
  );
}

export default MarksEntry;
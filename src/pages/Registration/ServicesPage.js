import React, { useState } from 'react';
import './ServicesPage.css';

function ServicesPage({ userFullName }) {
  const [basicFees] = useState({
    tuition: 6500,
    activity: 200,
  });

  const optionalFeesValues = {
    food: 3500,
    admission: 1000,
    diary: 150,
    assessmentTool: 300,
    termlyExerciseBooks: 500,
    yearlyExerciseBooks: 1500,
    transportTown: 7000,
    transportUmma: 8000,
    transportOneWay: 4500,
  };

  const [optionalFees, setOptionalFees] = useState({
    food: false,
    admission: false,
    diary: false,
    assessmentTool: false,
    exerciseBooks: '',
    transport: 0,
  });

  const [isEditable, setIsEditable] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  const calculateTotalAmount = () => {
    const selectedOptionalFees = Object.keys(optionalFees)
      .filter(key => optionalFees[key] && key !== 'exerciseBooks' && key !== 'transport')
      .reduce((acc, curr) => acc + optionalFeesValues[curr], 0);

    const exerciseBookFee =
      optionalFees.exerciseBooks === 'termly'
        ? optionalFeesValues.termlyExerciseBooks
        : optionalFees.exerciseBooks === 'yearly'
        ? optionalFeesValues.yearlyExerciseBooks
        : 0;

    return (
      basicFees.tuition +
      basicFees.activity +
      selectedOptionalFees +
      (optionalFees.transport || 0) +
      exerciseBookFee
    );
  };

  const handleCheckboxChange = (e) => {
    if (!isEditable) return;
    const { name, checked } = e.target;
    setOptionalFees(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleRadioChange = (e) => {
    if (!isEditable) return;
    const { name, value } = e.target;
    setOptionalFees(prev => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };

  const handleExerciseBookChange = (e) => {
    if (!isEditable) return;
    const { value } = e.target;
    setOptionalFees(prev => ({
      ...prev,
      exerciseBooks: value,
    }));
  };

  const handleCheckout = () => {
    setInvoiceDetails({
      userFullName,
      fees: { ...basicFees, ...optionalFees },
      totalAmount: calculateTotalAmount(),
    });
    setShowInvoice(true);
    setIsEditable(false);
  };

  const handleEditInvoice = () => {
    setShowInvoice(false);
    setIsEditable(true);
  };

  return (
    <div className="services-page">
      <div className="container">
        <h2 className="welcome-message">Welcome, {userFullName}!</h2>
        <h3 className="page-title">Here's your personalized service page for Baby Class</h3>
        <section className="fee-structure">
          <p>Below is the fee structure:</p>
          <div className="fee-list">
            <div className="fee-item">
              <span className="fee-label">Tuition Fee:</span>
              <span className="fee-amount">6,500 KSH</span>
            </div>
            <div className="fee-item">
              <span className="fee-label">Activity Fee:</span>
              <span className="fee-amount">200 KSH</span>
            </div>

            <h4 className="optional-title">Optional Fees</h4>
            <div className="optional-fees">
              <label>
                <input
                  type="checkbox"
                  name="food"
                  checked={optionalFees.food}
                  onChange={handleCheckboxChange}
                  disabled={!isEditable}
                />
                Food (3,500 KSH)
              </label>
              <label>
                <input
                  type="checkbox"
                  name="admission"
                  checked={optionalFees.admission}
                  onChange={handleCheckboxChange}
                  disabled={!isEditable}
                />
                Admission Fee (1,000 KSH)
              </label>
              <label>
                <input
                  type="checkbox"
                  name="diary"
                  checked={optionalFees.diary}
                  onChange={handleCheckboxChange}
                  disabled={!isEditable}
                />
                Diary (150 KSH)
              </label>
              <label>
                <input
                  type="checkbox"
                  name="assessmentTool"
                  checked={optionalFees.assessmentTool}
                  onChange={handleCheckboxChange}
                  disabled={!isEditable}
                />
                Assessment Tool (300 KSH)
              </label>

              <h4>Exercise Books</h4>
              <label>
                <input
                  type="radio"
                  name="exerciseBooks"
                  value="termly"
                  checked={optionalFees.exerciseBooks === 'termly'}
                  onChange={handleExerciseBookChange}
                  disabled={!isEditable}
                />
                Termly (500 KSH)
              </label>
              <label>
                <input
                  type="radio"
                  name="exerciseBooks"
                  value="yearly"
                  checked={optionalFees.exerciseBooks === 'yearly'}
                  onChange={handleExerciseBookChange}
                  disabled={!isEditable}
                />
                Yearly (1,500 KSH)
              </label>

              <h4>Transport</h4>
              <label>
                <input
                  type="radio"
                  name="transport"
                  value={optionalFeesValues.transportTown}
                  checked={optionalFees.transport === optionalFeesValues.transportTown}
                  onChange={handleRadioChange}
                  disabled={!isEditable}
                />
                Town (7,000 KSH)
              </label>
              <label>
                <input
                  type="radio"
                  name="transport"
                  value={optionalFeesValues.transportUmma}
                  checked={optionalFees.transport === optionalFeesValues.transportUmma}
                  onChange={handleRadioChange}
                  disabled={!isEditable}
                />
                Umma (8,000 KSH)
              </label>
              <label>
                <input
                  type="radio"
                  name="transport"
                  value={optionalFeesValues.transportOneWay}
                  checked={optionalFees.transport === optionalFeesValues.transportOneWay}
                  onChange={handleRadioChange}
                  disabled={!isEditable}
                />
                One-Way (4,500 KSH)
              </label>
            </div>
          </div>
          <div className="total">
            <h3>Total Amount: {calculateTotalAmount()} KSH</h3>
          </div>
          <button className="checkout-button" onClick={handleCheckout} disabled={!isEditable}>View Invoice</button>
        </section>
        
        {showInvoice && invoiceDetails && (
          <div className="invoice">
            <h3>Invoice for {invoiceDetails.userFullName}</h3>
            <ul>
              <li><strong>Tuition Fee:</strong> 6,500 KSH</li>
              <li><strong>Activity Fee:</strong> 200 KSH</li>
              
              {/* Display each optional fee if selected */}
              {optionalFees.food && <li><strong>Food:</strong> 3,500 KSH</li>}
              {optionalFees.admission && <li><strong>Admission Fee:</strong> 1,000 KSH</li>}
              {optionalFees.diary && <li><strong>Diary:</strong> 150 KSH</li>}
              {optionalFees.assessmentTool && <li><strong>Assessment Tool:</strong> 300 KSH</li>}
              {optionalFees.exerciseBooks && (
                <li>
                  <strong>Exercise Books:</strong> 
                  {optionalFees.exerciseBooks === 'termly' ? '500' : '1500'} KSH
                </li>
              )}
              {optionalFees.transport !== 0 && (
                <li><strong>Transport:</strong> {optionalFees.transport} KSH</li>
              )}
            </ul>
            <div><strong>Total:</strong> {invoiceDetails.totalAmount} KSH</div>
            <button className="edit-invoice" onClick={handleEditInvoice}>Edit Invoice</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesPage;

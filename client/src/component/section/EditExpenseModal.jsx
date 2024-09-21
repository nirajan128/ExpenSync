import React, { useState, useEffect } from "react";
import LabelInput from "../form/LabelInput";

const EditExpenseModal = ({
  isOpen,
  onClose,
  expense,
  onUpdate,
  categories,
}) => {
  const [editedExpense, setEditedExpense] = useState({});

  useEffect(() => {
    if (expense) {
      setEditedExpense({ ...expense });
    }
  }, [expense]);

  const handleInputChange = (e) => {
    setEditedExpense({ ...editedExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedExpense);
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Expense</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <LabelInput
                type="date"
                name="date"
                value={editedExpense.date}
                onChange={handleInputChange}
              />
              <LabelInput
                type="text"
                name="expense_type"
                value={editedExpense.expense_type}
                onChange={handleInputChange}
                placeholder="Expense Type"
              />
              <select
                className="form-select mb-3 mt-3"
                name="category"
                value={editedExpense.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select expense category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <LabelInput
                type="number"
                name="amount"
                value={editedExpense.amount}
                onChange={handleInputChange}
                placeholder="Amount"
              />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;

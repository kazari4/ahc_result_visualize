import { useState } from "react";

function UserNameInput({ onChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      onChange(inputValue.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input
          className="input"
          type="text"
          placeholder="例: kazari4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="control">
        <button className="button is-primary" onClick={handleSubmit}>
          <span className="icon">
            <i className="fas fa-check"></i>
          </span>
          <span>決定</span>
        </button>
      </div>
    </div>
  );
}

export default UserNameInput;
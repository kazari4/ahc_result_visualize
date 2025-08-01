import { useState } from "react";

function UserNameInput({ onChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    onChange(inputValue);
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
          placeholder="Enter UserName"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="control">
        <button className="button is-primary" onClick={handleSubmit}>
          決定
        </button>
      </div>
    </div>
  );
}

export default UserNameInput;

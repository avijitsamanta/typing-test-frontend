import React, { forwardRef } from "react";

const TypingArea = forwardRef(({ currentInput, onChange, onKeyDown, isRunning }, ref) => {
  return (
    <textarea
      className="form-control"
      ref={ref}
      value={currentInput}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={!isRunning}
      rows="3"
      style={{ resize: "none" }}
      autoFocus
    />
  );
});

export default TypingArea;

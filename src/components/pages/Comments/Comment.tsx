import './comment.css';
import React from 'react';
export default function Comment() {
  return (
    <div className="App">
      <p>Comments: </p>
      <textarea rows={20} cols={40} />
      <button type="submit">Submit</button>
    </div>
  );
}

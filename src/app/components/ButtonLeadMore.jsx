import React, { useState } from "react";

export default function ButtonLeadMore({ getMore }) {
  return (
    <div>
      <div
        className="btn-group btn-group-lg btn-costum-div"
        role="group"
        aria-label=""
      >
        <button
          type="button"
          className="btn btn-secondary btn-costum"
          onClick={getMore}
        >
          Lead More
        </button>
      </div>
    </div>
  );
}

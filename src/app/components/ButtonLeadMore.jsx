import React, { Component } from "react";

export default function ButtonLeadMore({ gotoNextPage, gotoPrevPage }) {
  return (
    <div>
      <div
        className="btn-group btn-group-lg btn-costum-div"
        role="group"
        aria-label=""
      >
        <button type="button" className="btn btn-secondary btn-costum">
          Lead More
        </button>
      </div>
    </div>
  );
}

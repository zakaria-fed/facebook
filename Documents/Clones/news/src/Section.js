import React from "react";

function Section(data) {

  const returned = () => {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        return (
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{data.title}</h4>
              <p className="card-text">{data.abstract}</p>
            </div>
          </div>
        );
      }
    } else {
        return <div></div>
    }
  };
  return returned();
}

export default Section;

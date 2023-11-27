import React from 'react'
import {Spinner} from "react-bootstrap";

const Skeleton = ({ width = "100%", height = ".8rem", margin = "0", rounded = "0" }) => {
  return <span className="skeleton-box" style={{ width, height, margin, borderRadius: rounded }}></span>
}


const SpinnerCicle = () => {
  return (
      <>
          <div
              style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
              }}
          >
              <Spinner animation="border" />
          </div>
      </>
  );
}

export{ Skeleton ,SpinnerCicle}
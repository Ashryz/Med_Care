import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function CustomAlert() {
  // get the alert from the store
  const alert = useSelector((state) => state.combineAlert);
  const dispatch = useDispatch();

  const handleAlertClose = () => {
    dispatch({
      type: "SET_ALERT",
      payload: { strong: "", txt: "", type: "" },
    });
  };

  useEffect(() => {
    if (alert.txt) {
      const timer = setTimeout(() => {
        handleAlertClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [alert.txt, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {alert.txt && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show mb-0 animate__animated animate__fadeInDown rounded-0`}
          role="alert"
        >
          {alert.strong && (
            <strong>
              {alert.strong}{" "}
              {alert.type === "danger" && (
                <i className="fas fa-exclamation-triangle"></i>
              )}
              {alert.type === "success" && (
                <i className="fas fa-check-circle"></i>
              )}
            </strong>
          )}
          {alert.txt}
          <button
            type="button"
            className="btn-close"
            onClick={handleAlertClose}
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  );
}

export default CustomAlert;

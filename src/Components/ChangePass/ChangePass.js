import "./changepass.css";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Sidebar from "../SideBar/Sidebar";

const ChangePass = () => {
  const [user, ChangePass] = useState({
    Password: "",
    confirmPassword: "",
  });
  const [err, PassErr] = useState({
    errorPassword: null,
    errorConfirmPass: null,
  });

  const inputChange = (e) => {
    const passRegex = new RegExp(
      "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$"
    );
    if (e.target.name === "password") {
      ChangePass({
        ...user,
        userPassword: e.target.value,
      });
      PassErr({
        ...err,
        errorPassword: passRegex.test(e.target.value) ? "" : "invalid password",
      });
    } else if (e.target.name === "confirmation") {
      ChangePass({
        ...user,
        confirmPassword: e.target.value,
      });
      PassErr({
        ...err,
        errorConfirmation:
          e.target.value === user.userPassword ? "" : "not match the password",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <ListGroup className="cardheadlistStyle m-3 bg-primary" as="ul">
              <ListGroup.Item
                className="cardhead bg-primary listgroupItem"
                as="li"
              >
                <p className="text-center text-light cardhead">
                  {" "}
                  Change Password
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <form>
                  <div className="p-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={user.userPassword}
                      name="password"
                      onChange={(e) => inputChange(e)}
                      required
                    />
                    <small className="text-danger">{err.errorPassword}</small>
                  </div>

                  <div className="p-3">
                    <label htmlFor="confirmation" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmation"
                      placeholder="Confirm password"
                      value={user.confirmPassword}
                      name="confirmation"
                      onChange={(e) => inputChange(e)}
                      required
                    />
                    <small className="text-danger">
                      {err.errorConfirmation}
                    </small>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-danger me-2">
                      Save
                    </button>
                    <button type="button" className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePass;

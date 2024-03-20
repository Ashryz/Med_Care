import "./SignIn.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useDispatch } from "react-redux";
function SignIn() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const isLoggedIn = authContext.isLoggedIn;
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //state & setState to get field value
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // errors required & invalid
  const [errors, setErrors] = useState({
    emailErrors: "",
    passwordErrors: "",
  });
  const dataChange = (e) => {
    if (e.target.name === "email") {
      setData({
        ...data,
        email: e.target.value,
      });
    } else {
      setData({
        ...data,
        password: e.target.value,
      });
    }
  };

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!data.email.trim() || !data.password.trim()) {
      setErrors({
        ...errors,
        emailErrors: "This Field is Required",
        passwordErrors: "This Field is Required",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/",
        data
      );
      if (response.status === 200) {
        authContext.login(response.data.token, response.data.user);
        dispatch({
          type: "SET_ALERT",
          payload: {
            strong: "Welcome Back",
            txt: " You have successfully logged in",
            type: "success",
          },
        });
        navigate("/");
      }
    } catch (error) {
      setErrors({
        ...errors,
        emailErrors: "Invalid Email",
        passwordErrors: "Invalid Password",
      });
    }
  };

  return (
    <div className="container  my-2 text-center  p-2  justify-content-center ">
      <Form
        onSubmit={handleLogin}
        className=" w-25 mx-auto text-start  rounded-4 bg-white shadow "
        style={{ minWidth: "360px" }}
      >
        <div
          className="prim-pg text-center text-white p-1"
          style={{ borderRadius: "11px 11px 0px 0px" }}
        >
          <span className="fw-light">Login</span>
        </div>
        <div className="mx-4 my-4">
          <Row className="mb-3  pt-4 text-start">
            <Form.Group as={Col}>
              <Form.Label className="text-muted">
                Email<span className="text-danger"> *</span>
              </Form.Label>

              <Form.Control
                name="email"
                type="email"
                value={data.email}
                placeholder="email@example.com"
                onChange={(e) => dataChange(e)}
                isInvalid={!!errors.emailErrors}
                isValid={!errors.emailErrors && data.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.emailErrors}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 text-start">
            <Form.Group as={Col}>
              <Form.Label className="text-muted">
                Password<span className="text-danger"> *</span>
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  placeholder="Password"
                  onChange={(e) => dataChange(e)}
                  isInvalid={!!errors.passwordErrors}
                  isValid={!errors.passwordErrors && data.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passwordErrors}
                </Form.Control.Feedback>
                {showPassword ? (
                  <FiEye
                    onClick={togglePasswordVisibility}
                    className="position-absolute top-0 end-0 fs-5 me-4 mt-2 text-primary"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  // position-absolute top-50 end-0 translate-middle-y
                  <FiEyeOff
                    onClick={togglePasswordVisibility}
                    className="position-absolute top-0 end-0 fs-5 me-4 mt-2 text-muted"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </Form.Group>
          </Row>
          <Row className="mx-1">
            <Button
              type="submit"
              className="btn main-btn my-3 rounded-2 fw-bold "
            >
              LOGIN
            </Button>
          </Row>
          <div
            className="d-flex  justify-content-between mx-1"
            style={{ fontSize: "14px" }}
          >
            <div className="text-muted">
              <Form.Check name="check" type="checkbox" label="Remember Me" />
            </div>
            <div className="mb-4">
              <Link to={"/ForgotPassword"} className="text-decoration-none">
                Forgot Your Password?
              </Link>
            </div>
          </div>
        </div>
        <div className="dhr">
          <hr className="hr" />
          <label className="or">or</label>
        </div>
        <div className="text-center mt-1 pb-4">
          <span className="text-muted me-2">New User</span>
          <Link
            to={"/SignUp"}
            className="text-decoration-none border-0 border-bottom border-2  pb-1"
          >
            SignUp
          </Link>
        </div>
      </Form>
    </div>
  );
}
export default SignIn;

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { LoginUser } from "../../ListingApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const StyleDiv = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    alignItems: "center",
  };
  const FormDiv = {
    width: "90%",
    height: "60px",
    borderRadius: "15px",
    fontSize: "17px",
  };

  const [data, setData] = useState({});
  console.log("data", data);

  useEffect(() => {
    LoginApi();
  }, [data]);
  //   ApiCall
  const LoginApi = async () => {
    let params = data;
    console.log("paraa", params);
    await LoginUser(params)
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),

        password: Yup.string().required("Password is Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setData(values);
      }}
    >
      {({ isValid, isSubmitting }) => (
        <div
          style={{
            display: "flex",
            border: "1px solid black",
            width: "80%",
            height: "600px",
          }}
        >
          <div
            style={{
              width: "40%",
              border: "1px solid black",
              background: "#4F93B1",
              color: "white",
            }}
          >
            <Form style={StyleDiv}>
              <div style={{ background: "#00539CFF", width: "100%" }}>
                <h1>Login Form</h1>
              </div>

              <Field
                type="email"
                name="email"
                placeholder="Email"
                style={FormDiv}
              />

              <Field
                type="text"
                name="password"
                placeholder="password"
                style={FormDiv}
              />

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                style={FormDiv}
              >
                Submit
              </button>
            </Form>
          </div>
          <div style={{ width: "60%", background: "lightblue" }}>
            <h1 style={{ margin: "35% 0 0 50%" }} onClick={() => navigate("/")}>
              Sign Up
            </h1>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;

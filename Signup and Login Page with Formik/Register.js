import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { RegisterUser } from "../../ListingApi";
import { useNavigate } from "react-router-dom";
function Register(props) {

const navigate = useNavigate()
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
    RegistApi();
  }, [data]);
  //   ApiCall
  const RegistApi = async () => {
    let params = data;
    console.log("paraa", params);
    await RegisterUser(params)
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
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
        address: "",
      }}
      validationSchema={Yup.object({
        firstname: Yup.string().required("firstname is Required"),
        lastname: Yup.string().required("lastname is Required"),

        email: Yup.string().email("Invalid email address").required("Required"),

        password: Yup.string().required("Password is Required"),
        confirm_password: Yup.string().required("confirm_password is Required"),

        address: Yup.string().required("Address is Required"),
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
            height: "900px",
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
                <h1>Register Form</h1>
              </div>
              <Field
                type="text"
                name="firstname"
                placeholder="firstname"
                style={FormDiv}
              />
              <Field
                type="text"
                name="lastname"
                placeholder="lastname"
                style={FormDiv}
              />
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

              <Field
                type="text"
                name="confirm_password"
                placeholder="confirm_password"
                style={FormDiv}
              />

              <Field
                type="text"
                name="address"
                placeholder="address"
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
            <h1 style={{ margin: "35% 0 0 50%", height:"100px", width:"auto" }} onClick={()=>navigate("/login")}>Sign In</h1>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Register;

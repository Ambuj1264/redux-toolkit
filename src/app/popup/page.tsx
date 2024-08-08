"use client";
import React, { useState } from "react";
import "./style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
const Popup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleToggleModal = () => {
    setIsModalOpen(true);
    setIsAnimating(true);
  };

  const handleCloseModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsAnimating(false);
    }, 300); // Match the duration of the animation
  };
  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        rememberMeCheckbox : false
      },

      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
          rememberMeCheckbox : Yup.boolean().notRequired()
      }),
      onSubmit: async (values: any, action: any) => {
        try {
          console.log(
            values,
            "======================values==================="
          );
        } catch (error) {
          console.log(error, "======================error===================");
        }
      },
    });
  const spacehandler = (event: any) => {
    if (event.which === 32 && event.target.value === "") {
      event.preventDefault();
    }
  };
  return (
    <>
      <div>
        {/* Modal toggle */}
        <button
          onClick={handleToggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Toggle modal
        </button>
        {/* Main modal */}
        {isModalOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              onClick={handleCloseModal}
            />
            <div
              tabIndex={-1}
              aria-hidden="true"
              className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-x-hidden overflow-y-auto ${
                isAnimating ? "modal-open" : "modal-close"
              }`}
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow ">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 ">
                      Sign in to our platform
                    </h3>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* Modal body */}
                  <div className="p-4 md:p-5">
                    <form
                      className="space-y-4"
                      action="#"
                      onSubmit={handleSubmit}
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                          placeholder="name@company.com"
                          // required
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onKeyDown={spacehandler}
                        />
                        {errors.email && touched.email ? (
                          <p className="text-red-500 text-sm mx-1">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Your password
                        </label>
                        <div className="relative">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            // required
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={spacehandler}
                          />
                          {errors.password && touched.password ? (
                            <p className="text-red-500 text-sm mx-1">
                              {errors.password}
                            </p>
                          ) : null}
                          <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                          >
                            {passwordVisible ? (
                              <FaEyeSlash className="" />
                            ) : (
                              <FaEye className="" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="rememberMeCheckbox"
                              type="checkbox"
                              defaultValue="true"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"

                              // required
                              value={values.rememberMeCheckbox ? "true" : "false"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              
                            />
                          </div>
                          <label
                            htmlFor="rememberMeCheckbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                        <a
                          href="#"
                          className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                          Lost Password?
                        </a>
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Login to your account
                      </button>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?{" "}
                        <a
                          href="#"
                          className="text-blue-700 hover:underline dark:text-blue-500"
                        >
                          Create account
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Popup;

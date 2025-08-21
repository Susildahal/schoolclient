import React, { useState , useEffect, startTransition } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axiosInstance from "../config/Axiosconfig.js";
import { Mail, Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");
    const [codeError, setCodeError] = useState("");
    const navigate = useNavigate();

    const initialValues = {
        email: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),
    });

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        setIsLoading(true);
        setSubmitting(true);
        setCurrentEmail(values.email); // Store the email
        setCodeError(""); // Clear any previous error
        
        try {
            const response = await axiosInstance.post("/user/passwordchangeotp", { id: values.email });

            if (response.data.msg) {
               
                // Navigate to OTP page with email
                startTransition(() => navigate("/PasswordForgetOtp", {
                    state: {
                        email: values.email,
                        fromForgotPassword: true 
                    } 
                }));
            }
        } catch (error) {
            console.error("Forgot password error:", error);
            
            // Handle specific error cases
            if (error.response?.status === 404) {
                setFieldError("email", "No account found with this email address");
            } else if (error.response?.status === 429) {
                toast.error("Too many requests. Please try again later.");
            } else {
                toast.error(
                    error.response?.data?.message || "Failed to send OTP. Please try again."
                );
            }
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    // Handle "Already have a code?" click
    const handleAlreadyHaveCode = (e) => {
        e.preventDefault();
        
        // Check if email is entered and valid
        if (!currentEmail) {
            setCodeError("Please enter your email address first");
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(currentEmail)) {
            setCodeError("Please enter a valid email address");
            return;
        }
        
        // Clear error if validation passes
        setCodeError("");
        
        // Navigate to OTP page with email
        startTransition(() => navigate("/PasswordForgetOtp", {
            state: {
                email: currentEmail,
                fromForgotPassword: false // User already has code
            } 
        }));
    };

    // Watcher component to update currentEmail from Formik values using a hook at component level
    const EmailWatcher = ({ setCurrentEmail, setCodeError }) => {
        const { values } = useFormikContext();
        useEffect(() => {
            setCurrentEmail(values.email);
            if (values.email) {
                setCodeError(""); // Clear code error when email is entered
            }
        }, [values.email, setCurrentEmail, setCodeError]);
        return null;
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Card Header */}
                    <div className="px-6 pt-6 pb-6">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched, values }) => {
                                return (
                                    <Form className="space-y-4">
                                        <EmailWatcher setCurrentEmail={setCurrentEmail} setCodeError={setCodeError} />
                                        <div className="space-y-2">
                                            <label 
                                                htmlFor="email" 
                                                className="text-sm font-medium text-gray-700"
                                            >
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Field
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder="Enter your email address"
                                                    className={`w-full pl-10 h-11 px-3 py-2 border rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                                                        errors.email && touched.email 
                                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-sm text-red-600"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading || isSubmitting}
                                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors flex items-center justify-center"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending Code...
                                                </>
                                            ) : (
                                                "Send Verification Code"
                                            )}
                                        </button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 pb-6 pt-6">
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col items-center justify-center space-y-2">
                                <div className="flex items-center justify-center space-x-1">
                                    <span className="text-sm text-gray-600">Already have a code?</span>
                                    <button
                                        onClick={handleAlreadyHaveCode}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline bg-transparent border-none cursor-pointer"
                                    >
                                        Enter Code
                                    </button>
                                </div>
                                
                                {codeError && (
                                    <div className="flex items-center text-red-600 text-sm mt-1">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        <span>{codeError}</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-center space-x-1 pt-4 border-t border-gray-200">
                                <ArrowLeft className="h-4 w-4 text-gray-400" />
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
import React, { useRef, useEffect, useState, startTransition } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../config/Axiosconfig.js';

const Otp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';
    
    // State management
    const [isLoading, setIsLoading] = useState(false);
    const [isResendLoading, setIsResendLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [timer, setTimer] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    
    const inputRefs = useRef([]);
    const timerRef = useRef(null);

    // Initialize component
    useEffect(() => {
        if (!email) {
                startTransition(() => navigate('/login'));
            }
        startTimer();
        return () => clearTimer();
    }, [email, navigate]);

    useEffect(() => {
        inputRefs.current = Array(6).fill().map((_, i) => inputRefs.current[i] || React.createRef());
    }, []);

    // Timer functions
    const startTimer = () => {
        setCanResend(false);
        setTimer(120);
        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setCanResend(true);
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    // Format timer display
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        if (!canResend || isResendLoading || isBlocked) return;

        setIsResendLoading(true);
        setError('');
        setResendSuccess(false);

        try {
            const response = await axiosInstance.post('/user/login', {id: email });
            
            if (response.status === 200 || response.status === 201) {
                setResendSuccess(true);
                setAttempts(0);
                startTimer();
                
                setTimeout(() => {
                    setResendSuccess(false);
                }, 3000);
            } else {
                throw new Error(response.data?.message || 'Failed to resend OTP');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
            
            if (err.response?.status === 429) {
                setIsBlocked(true);
                setTimeout(() => setIsBlocked(false), 300000);
            }
        } finally {
            setIsResendLoading(false);
        }
    };

    // Validation schema
    const validationSchema = Yup.object().shape({
        otp: Yup.array()
            .of(Yup.string().matches(/^\d{1}$/, 'Only digits allowed').nullable())
            .test('is-complete', 'Please enter the complete 6-digit OTP', value => 
                value && value.filter(Boolean).length === 6
            )
    });

    // Enhanced input handling
    const handleChange = (e, index, setFieldValue, values) => {
        const { value } = e.target;
        
        if (error) setError('');
        if (!/^\d*$/.test(value)) return;
        
        const newOtp = [...values.otp];
        newOtp[index] = value.slice(0, 1);
        setFieldValue('otp', newOtp);
        
        if (value && index < 5) {
            setTimeout(() => {
                inputRefs.current[index + 1]?.focus();
            }, 10);
        }
    };

    // Enhanced keydown handling
    const handleKeyDown = (e, index, values, setFieldValue) => {
        if (e.key === 'Backspace') {
            if (!values.otp[index] && index > 0) {
                setTimeout(() => {
                    inputRefs.current[index - 1]?.focus();
                    const newOtp = [...values.otp];
                    newOtp[index - 1] = '';
                    setFieldValue('otp', newOtp);
                }, 10);
            } else if (values.otp[index]) {
                const newOtp = [...values.otp];
                newOtp[index] = '';
                setFieldValue('otp', newOtp);
            }
        }
        
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Enhanced paste handling
    const handlePaste = (e, setFieldValue) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim().replace(/\s/g, '');
        
        if (/^\d+$/.test(pastedData)) {
            const digits = pastedData.split('').slice(0, 6);
            const newOtp = [...digits, ...Array(6 - digits.length).fill('')];
            setFieldValue('otp', newOtp);
            
            const focusIndex = Math.min(digits.length, 5);
            setTimeout(() => {
                inputRefs.current[focusIndex]?.focus();
            }, 10);
        }
    };

    // Enhanced form submission
    const handleSubmit = async (values, { setSubmitting, setFieldValue }) => {
        setError('');
        setIsLoading(true);
        setSuccess(false);

        try {
            const otpString = values.otp.join('');
            const response = await axiosInstance.post('/user/checkotptologin', {
                id:email,
                otp: otpString
            });

            if (response.status === 200 || response.status === 201) {
                setSuccess(true);
                setAttempts(0);
                clearTimer();
                localStorage.setItem("flag", "true");

                setTimeout(() => {
                    startTransition(() => navigate('/adminoutlet/AdminHome', { state: { email, otp: otpString } }));
                }, 1500);
            } else {
                throw new Error(response.data?.message || 'Invalid OTP');
            }
        } catch (err) {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            
            setFieldValue('otp', Array(6).fill(''));
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
            
            if (err.response?.status === 400) {
                setError('Invalid OTP. Please check and try again.');
            } else if (err.response?.status === 410) {
                setError('OTP has expired. Please request a new one.');
                setCanResend(true);
                setTimer(0);
                clearTimer();
            } else if (newAttempts >= 5) {
                setError('Too many failed attempts. Please request a new OTP.');
                setCanResend(true);
                setTimer(0);
                clearTimer();
            } else {
                setError(
                    err.response?.data?.message || 
                    'Verification failed. Please try again.'
                );
            }
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-sm border">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Verify Email
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                        Enter the 6-digit code sent to:
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                        {email}
                    </p>
                </div>

                {/* Status Messages */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-600">Verified! Redirecting...</p>
                    </div>
                )}

                {resendSuccess && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-600">New code sent!</p>
                    </div>
                )}

                {!success && (
                    <Formik
                        initialValues={{ otp: Array(6).fill('') }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue, isSubmitting }) => (
                            <Form className="space-y-4">
                                
                                {/* OTP Input */}
                                <div>
                                    <div 
                                        className="flex gap-2 justify-center mb-2" 
                                        onPaste={(e) => handlePaste(e, setFieldValue)}
                                    >
                                        {[0, 1, 2, 3, 4, 5].map((index) => (
                                            <Field
                                                key={index}
                                                innerRef={el => inputRefs.current[index] = el}
                                                name={`otp[${index}]`}
                                                type="text"
                                                maxLength="1"
                                                inputMode="numeric"
                                                className={`
                                                    w-10 h-10 text-center font-medium border rounded-md
                                                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent
                                                    ${values.otp[index] ? 'border-gray-400' : 'border-gray-300'}
                                                    ${error ? 'border-red-300' : ''}
                                                `}
                                                value={values.otp[index]}
                                                onChange={(e) => handleChange(e, index, setFieldValue, values)}
                                                onKeyDown={(e) => handleKeyDown(e, index, values, setFieldValue)}
                                                autoComplete="off"
                                                disabled={isLoading}
                                            />
                                        ))}
                                    </div>
                                    <ErrorMessage
                                        name="otp"
                                        component="div"
                                        className="text-xs text-red-600 text-center"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isLoading || values.otp.filter(Boolean).length !== 6}
                                    className="w-full py-2.5 px-4 w-full py-1.5 px-3 mt-1 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-md transition text-white text-sm font-medium rounded-md hover: focus:ring-2  focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? 'Verifying...' : 'Verify Code'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}

                {/* Footer */}
                <div className="mt-4 text-center space-y-2">
                    {/* Timer or Resend */}
               {/* Timer or Resend */}
{canResend ? (
    <button
        type="button"
        onClick={handleResendOtp}
        disabled={isResendLoading || isBlocked}
        className="w-full py-1.5 px-3 mt-1 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-md transition"
    >
        {isBlocked
            ? 'Try again later'
            : isResendLoading
            ? 'Sending...'
            : 'Resend code'}
    </button>
) : timer > 0 ? (
    <div className="flex flex-col items-center">
        {/* Circular Live Timer */}
        <div className="relative w-16 h-16">
            <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
            >
                {/* Background track */}
                <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                />
                {/* Progress ring */}
                <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={100 - (timer / 120) * 100}
                    className={`transition-colors duration-300 ${
                        timer > 60
                            ? 'stroke-blue-500'
                            : timer > 30
                            ? 'stroke-amber-500'
                            : 'stroke-red-500'
                    }`}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                {formatTime(timer)}
            </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Resend in</p>
    </div>
) : null}
                    
                    {/* Back Link */}
                    <div>
                        <Link 
                            to="/ForgotPassword" 
                            className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            ← Back to forgot password
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Otp;
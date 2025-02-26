

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: 0,
        profession: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        age: "",
        profession: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateFormStep1 = () => {
        let formErrors = {};
        let isValid = true;

        // Validate Name
        if (!formData.name.trim()) {
            formErrors.name = "Name is required";
            isValid = false;
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            formErrors.email = "Email is required";
            isValid = false;
        } else if (!emailPattern.test(formData.email)) {
            formErrors.email = "Please enter a valid email";
            isValid = false;
        }

        // Validate Age
        if (!formData.age || formData.age <= 0) {
            formErrors.age = "Please enter a valid age";
            isValid = false;
        }

        // Validate Profession
        if (!formData.profession) {
            formErrors.profession = "Please select a profession";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const validateFormStep2 = () => {
        let formErrors = {};
        let isValid = true;

        // Validate Username
        if (!formData.username.trim()) {
            formErrors.username = "Username is required";
            isValid = false;
        }

        // Validate Password
        if (!formData.password.trim()) {
            formErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        // Validate Confirm Password
        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleNextPage = () => {
        if (step === 0) {
            // Validate Step 1 before proceeding to Step 2
            if (validateFormStep1()) {
                setStep(step + 1);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate Step 2 before submitting
        if (!validateFormStep2()) {
            return; // If form is invalid, stop the submission
        }

        // Prepare the data to send to backend
        const newUser = {
            username: formData.username,
            fullName: formData.name,
            email: formData.email,
            passwordHash: formData.password, // Assuming backend hashes the password
            age: formData.age,
            profession: formData.profession,
        };

        try {
            const response = await fetch('http://localhost:3000/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User created successfully:', data);
                data.data.token && localStorage.setItem('token', data.data.token);
                navigate('/'); // Redirect to home page
            } else {
                console.error('Signup failed:', data.message);
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 rounded-xl shadow-2xl p-2 w-full max-w-4xl min-h-[70vh] flex">
                {/* Left Side: Image Section */}
                <div className="w-1/2 hidden md:block">
                    <img src="/src/assets/signup-image.jpg" alt="signup illustration" className="w-full h-full object-cover rounded-xl" />
                </div>

                {/* Right Side: Form Section */}
                <div className="w-1/2 p-12">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h2>
                    <form>
                        {/* Step 1: Personal Information */}
                        {step === 0 && (
                            <div>
                                <div className="mb-4">
                                    <label className="block text-white text-lg font-stretch-expanded mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        className="appearance-none border rounded w-full py-4 px-4 text-white focus:ring-2 focus:ring-gray-500 transition duration-300"
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-white text-lg font-stretch-expanded mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="appearance-none border rounded w-full py-4 px-4 text-white focus:ring-2 focus:ring-gray-500 transition duration-300"
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-white text-lg font-stretch-expanded mb-2" htmlFor="age">
                                        Age
                                    </label>
                                    <input
                                        className="appearance-none border rounded w-full py-4 px-4 text-white focus:ring-2 focus:ring-gray-500 transition duration-300"
                                        id="age"
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Enter your age"
                                    />
                                    {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-white text-lg font-stretch-expanded mb-2" htmlFor="profession">
                                        Profession
                                    </label>
                                    <select
                                        className="appearance-none border rounded w-full mb-3 py-4 px-4 text-white focus:ring-2 focus:ring-gray-500 transition duration-300"
                                        name="profession"
                                        value={formData.profession}
                                        onChange={handleChange}
                                    >
                                        <option value="" className='bg-gray-700 text-white'>Choose your profession</option>
                                        <option value="Software Engineer" className='bg-gray-700 text-white'>Software Engineer</option>
                                        <option value="IT" className='bg-gray-700 text-white'>IT</option>
                                        <option value="Business" className='bg-gray-700 text-white'>Business</option>
                                        <option value="Artist" className='bg-gray-700 text-white'>Artist</option>
                                    </select>
                                    {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Account Information */}
                        {step === 1 && (
                            <div>
                                <div className="mb-4">
                                    <label className="block text-white text-lg font-stretch-expanded mb-2" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        className="appearance-none border rounded w-full py-4 px-4 text-white focus:ring-2 focus:ring-gray-500 transition duration-300"
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                    />
                                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-white text-lg font-stretch-expanded mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="appearance-none border rounded w-full py-4 px-4 text-white focus:ring-2 focus:ring-gray-500 transition duration-300"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-white text-lg font-stretch-expanded mb-2" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <input
                                        className="appearance-none border rounded w-full py-4 px-4 text-white focus:ring-2 focus:ring-gray-500 transition duration-300"
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                                </div>
                            </div>
                        )}

                        {/* Buttons to move between steps */}
                        {step === 0 && (
                            <div className="flex items-center justify-center">
                                <button
                                    className="border border-gray-300 hover:cursor-pointer font-stretch-expanded text-white py-3 px-6 rounded-full w-full transition-transform duration-200 hover:scale-105"
                                    type="button"
                                    onClick={handleNextPage}
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="flex items-center justify-center">
                                <button
                                    className="border border-gray-300 hover:cursor-pointer font-stretch-expanded text-white py-3 px-6 rounded-full transition-transform duration-200 hover:scale-105 w-full"
                                    onClick={handleSubmit}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>s
        </div>
    );
};

export default SignUp;

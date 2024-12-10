import React, { useState } from 'react';

const profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
    };

    return (
        <div className="p-5 bg-white max-w-md mx-auto border border-gray-300 rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="mb-2.5">
                    <label htmlFor="name" className="block mb-1.5">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 box-border rounded-lg"
                        placeholder='Enter your name'
                    />
                </div>
                <div className="mb-2.5">
                    <label htmlFor="email" className="block mb-1.5">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 box-border rounded-lg"
                        placeholder='Enter your email'
                    />
                </div>
                <button type="submit" className="px-5 py-2 bg-theme-green text-white border-none rounded cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default profile;
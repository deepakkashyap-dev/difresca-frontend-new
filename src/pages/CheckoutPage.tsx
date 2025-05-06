import React from "react";

const CheckoutPage = () => {
    return (
        <div className="min-h-screen bg-green-50 p-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Payment Gateway Section */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Payment Information</h2>
                    <div className="space-y-4">
                        <input type="text" placeholder="Cardholder Name" className="w-full p-2 border rounded-md" />
                        <input type="text" placeholder="Card Number" className="w-full p-2 border rounded-md" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Expiry Date" className="w-full p-2 border rounded-md" />
                            <input type="text" placeholder="CVV" className="w-full p-2 border rounded-md" />
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md w-full">Pay Now</button>
                    </div>

                    {/* Address Section */}
                    <div className="bg-green-100 rounded-xl p-4 mt-8">
                        <h3 className="text-xl font-bold text-green-700 mb-2">Delivery Address</h3>
                        <p className="text-gray-700">John Doe</p>
                        <p className="text-gray-700">123 Green Street, Garden City</p>
                        <p className="text-gray-700">New Delhi, India - 110001</p>
                        <p className="text-gray-700">Phone: +91 9876543210</p>
                    </div>
                </div>

                {/* Cart Summary Section */}
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Your Cart</h2>
                    <div className="flex-1 overflow-y-auto space-y-4 max-h-96 pr-2">
                        <div className="border rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src="/images/apples.jpg" alt="Fresh Apples" className="w-16 h-16 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold">Fresh Apples</p>
                                    <p className="text-sm text-gray-500">1 kg</p>
                                    <p className="text-sm text-gray-500">Qty: 2</p>
                                </div>
                            </div>
                            <p className="font-semibold">₹240</p>
                        </div>

                        <div className="border rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src="/images/carrots.jpg" alt="Organic Carrots" className="w-16 h-16 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold">Organic Carrots</p>
                                    <p className="text-sm text-gray-500">500 g</p>
                                    <p className="text-sm text-gray-500">Qty: 1</p>
                                </div>
                            </div>
                            <p className="font-semibold">₹60</p>
                        </div>

                        {/* More products can be listed here dynamically */}
                    </div>
                    <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹300</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
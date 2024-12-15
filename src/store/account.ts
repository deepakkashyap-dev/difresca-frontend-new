import { createSlice } from '@reduxjs/toolkit';
import { CartItem, Address } from '../utils/types';

const address = [
    {
        addressId: '1',
        name: 'John Doe',
        phoneNo: '1234567890',
        building: 'blitz apartment',
        street_no: '123',
        street_name: 'Elm St',
        pincode: '12345',
        locality: 'Downtown',
        landmark: 'Near Central Park',
        formattedAddress: '123, Elm St, blitz apartment, Downtown, Gotham - 12345',
        cordinates: {
            lat: 12.345,
            lng: 98.765,
        },
    },
]

const orderList = [
    {
        id: "000011",
        cart_id: '00001',
        order_id: 'odid00011',
        checkout_time: "Placed on fri, 29 nov'24, 10:01 pm",
        quantity: 6,
        order_amount: '$12.00',
        status: '1',
        product_images: [
            "https://cdn.grofers.com/app/images/products/sliding_image/160a.jpg?ts=1654778815",
            "https://cdn.grofers.com/app/images/products/sliding_image/383615a.jpg?ts=1630648502",
            "https://cdn.grofers.com/app/images/products/sliding_image/34338a.jpg",
            "https://cdn.grofers.com/app/images/products/sliding_image/480693a.jpg?ts=1650977521",
        ]
    },
    {
        id: "000012",
        cart_id: '00002',
        order_id: 'odid00012',
        checkout_time: "Placed on fri, 30 nov'24, 01:01 pm",
        quantity: 6,
        order_amount: '$342.00',
        status: '5',
        product_images: [
            "https://cdn.grofers.com/app/images/products/sliding_image/34338a.jpg",
            "https://cdn.grofers.com/app/images/products/sliding_image/160a.jpg?ts=1654778815",
            "https://cdn.grofers.com/app/images/products/sliding_image/480693a.jpg?ts=1650977521",
        ]
    }
]


type OrderList = {
    id: string;
    cart_id: string;
    order_id: string;
    checkout_time: string;
    quantity: number;
    order_amount: string;
    status: string;
    product_images: string[];
};

// type Order = {
//     id: string;
//     items: CartItem[];
//     totalAmount: number;
//     date: string;
// };

type InitialState = {
    orderList: OrderList[];
    addressList: Address[];
};

const initialState: InitialState = {
    orderList: [...orderList],
    addressList: [...address],
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        // addOrders: (state, action) => {
        //     const newOrder = action.payload as Order;
        //     const orderExists = state.orders.some(order => order.id === newOrder.id);
        //     if (!orderExists) {
        //         state.orders.push(newOrder);
        //     }
        // },
        addAddress: (state, action) => {
            const newAddress = action.payload as Address;
            state.addressList.push(newAddress);
        },
    },
});

export default accountSlice.reducer;
export const { addAddress } = accountSlice.actions;


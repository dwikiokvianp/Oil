export interface OrderInputType {
  id: number;
  name: string;
  state: string;
  type: string;
  placeholder?: string;
}

export interface OrderInputState {
  name: string;
  email: string;
  phone: string;
  street: string;
  liter: string;
}

export const orderInput = [
  {
    id: 1,
    name: "Name",
    state: "name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    id: 2,
    name: "Email Address",
    state: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: 3,
    name: "Phone Number",
    state: "phone",
    type: "number",
    placeholder: "Enter your phone number",
  },
  {
    id: 4,
    name: "Street Address",
    state: "address",
    type: "text",
    placeholder: "Enter your street address",
  },
  {
    id: 5,
    name: "Quantity",
    state: "liter",
    type: "number",
    placeholder: "Enter your quantity",
  },
];

export const initOrder = {
  name: "",
  email: "",
  phone: "",
  address: "",
  liter: 0,
};

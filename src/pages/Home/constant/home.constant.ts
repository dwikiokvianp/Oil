export interface NavigationType {
  name: string;
  href: string;
  current: boolean;
}

export interface UserNavigationType {
  id: number;
  name: string;
  href: string;
}
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Sales", href: "#", current: false },
  { name: "Scan", href: "#", current: false },
  { name: "Order", href: "#", current: false },
  { name: "Camera", href: "#", current: false },
];
const userNavigation = [
  { id: 1, name: "Your Profile", href: "#" },
  { id: 2, name: "Settings", href: "#" },
  { id: 3, name: "Sign out", href: "#" },
];

export { user, navigation, userNavigation };


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
    "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Order", href: "#", current: false },
  { name: "Transaction", current: false, href: "#" },
  { name: "Vehicle", href: "#", current: false },
  { name: "Scan", href: "#", current: false },
  {name: "userlist", href: "#", current: false },
];

const userNavigation = [
  { id: 1, name: "Your Profile", href: "#" },
  { id: 2, name: "Settings", href: "#" },
  { id: 3, name: "Sign out", href: "#" },
];

export { user, navigation, userNavigation };

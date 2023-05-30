enum LocalStorageKeys {
  access_token = "access_token",
}
const setLocalStorage = (key: LocalStorageKeys, value: string) => {
  localStorage.setItem(key, value);
};

const getLocalStorage = (key: LocalStorageKeys) => {
  return localStorage.getItem(key);
};

const removeLocalStorage = (key: LocalStorageKeys) => {
  localStorage.removeItem(key);
};

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  LocalStorageKeys,
};

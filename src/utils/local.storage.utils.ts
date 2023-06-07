enum LocalStorageKeys {
  token = "token",
  name = "name",
  role = "role",
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

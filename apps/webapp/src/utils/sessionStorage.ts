export const getItem = async ({ itemName }: any) => {
  if (typeof window === "undefined") {
    return await sessionStorage.getItem(itemName);
  }
};

export const setItem = async ({ name, value }: any) => {
  sessionStorage.setItem(name, JSON.stringify(value));
};

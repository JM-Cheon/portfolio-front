export const StorageControl = {
  storageSetter: (itemName: string, data: any) => {
    localStorage.setItem(itemName, data);
  },
  storageRemover: (itemName: string) => {
    localStorage.removeItem(itemName);
  },
  storageGetter: (itemName: string) => {
    return localStorage.getItem(itemName);
  },
};

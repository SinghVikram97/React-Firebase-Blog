export const getIDsAndDocs = doc => {
  return {
    id: doc.id,
    ...doc.data()
  };
};

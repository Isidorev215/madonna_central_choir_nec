export const isASubSet = (mainArray, subSet) => {
  let mainArray_ids = mainArray.map((obj) => obj._id);
  let subSet_ids = subSet.map((obj) => obj._id);
  return subSet_ids.every((id) => {
    if (mainArray_ids.includes(id)) {
      return true;
    }
    return false;
  });
};

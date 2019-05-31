export default (closingTypes, updatedType) => {
  return closingTypes.map(type => {
    if (type.value === updatedType.value) {
      return updatedType;
    }
    return type;
  });
};

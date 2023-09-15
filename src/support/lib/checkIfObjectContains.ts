const objectContains = (
  obj1?: Record<string, any> | string | null,
  obj2?: Record<string, any> | string | null,
): boolean => {
  if (obj1 === undefined || obj2 === undefined) {
    return obj1 === obj2;
  }

  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  if (typeof obj1 === 'string' || typeof obj2 === 'string') {
    return obj1 === obj2;
  }

  for (const key in obj2) {
    if (!(key in obj1) || obj1[key] !== obj2[key]) {
      console.log(`Expected value for property "${key}": `, obj1[key]);
      console.log(`Received value for property "${key}": `, obj2[key]);
      return false;
    }
  }
  return true;
};

export { objectContains };

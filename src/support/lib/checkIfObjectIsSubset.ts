function isSubset(subset: any, superset: any): boolean {
  for (const key in subset) {
      if (typeof subset[key] === 'object' && subset[key] !== null) {
          if (!superset[key] || typeof superset[key] !== 'object') {
              return false;
          }
          if (!isSubset(subset[key], superset[key])) {
              return false;
          }
      } else if (subset[key] !== superset[key]) {
          return false;
      }
  }
  return true;
}

const objectIsSubset = (
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
  return isSubset(obj2, obj1)

};

export { objectIsSubset };

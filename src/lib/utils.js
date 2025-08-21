export function cn(...inputs) {
  return inputs
    .flat()
    .filter(Boolean)
    .map((x) => {
      if (typeof x === 'string') return x;
      if (typeof x === 'object') {
        return Object.entries(x)
          .filter(([, v]) => !!v)
          .map(([k]) => k)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}

export default cn;

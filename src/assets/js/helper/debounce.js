export function debounce(func, delay = 500) {
  let debounceTimer;
  return function () {
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}

function debounce(fc: CallableFunction, delay: number) {
  let time: number;
  return function toBeExcuted(...args: any) {
    const later = () => {
      clearTimeout(time);
      fc(...args);
    };
    clearTimeout(time);
    time = setTimeout(later, delay);
  };
}

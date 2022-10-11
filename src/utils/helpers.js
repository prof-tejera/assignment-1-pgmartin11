// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

export const incrementHelper = (val, upLimit=99) => {
  if (val === upLimit) { return val; }

  return val+1;
}

export const decrementHelper = (val, downLimit=0) => {
if (val == downLimit) { return val; }

return val-1;
}

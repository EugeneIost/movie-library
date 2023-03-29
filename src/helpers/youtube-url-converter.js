export const urlConverter = (url) => {
  if (url.includes('.com/watch?v=')) {
    return url.replace('.com/watch?v=', '-nocookie.com/embed/');
  } else if (url.includes('.com/v/')) {
    return url.replace('.com/v/', '-nocookie.com/embed/');
  } else return url;
};

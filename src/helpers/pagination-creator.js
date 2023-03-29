export const paginationCreator = (currentPage, pagesQuantity) => {
  const pages = [];
  let isLast = false;
  if (pagesQuantity > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
        if (i === pagesQuantity) {
          isLast = true;
          break;
        }
      }

      if (!isLast) {
        pages.push(pagesQuantity);
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
        if (i === pagesQuantity) {
          isLast = true;
          break;
        }
      }

      if (!isLast) {
        pages.push(pagesQuantity);
      }
    }
  } else {
    for (let i = 1; i <= pagesQuantity; i++) {
      pages.push(i);
    }
  }

  return pages;
};

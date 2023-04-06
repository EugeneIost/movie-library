export const paginationCreator = (currentPage, pagesQuantity) => {
  let pages = [];

  if (pagesQuantity > 10) {
    pages = Array.from({ length: 5 }, (_, i) => i + currentPage - 2).filter(
      (el) => el > 0 && el <= pagesQuantity
    );

    if (currentPage <= 5) {
      for (let leftIndex = pages[0] - 1; leftIndex > 0; leftIndex--) {
        pages.unshift(leftIndex);
      }

      while (pages.length < 5) {
        pages.push(pages[pages.length - 1] + 1);
      }
    }

    if (pages[pages.length - 1] < pagesQuantity - 1) {
      pages.push(pagesQuantity);
    }
  } else {
    for (let i = 1; i <= pagesQuantity; i++) {
      pages.push(i);
    }
  }

  return pages;
};

import { useState } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

interface PaginationProps<T>
  extends Omit<ReactPaginateProps, "pageCount" | "onPageChange"> {
  items: T[];
  itemsPerPage: number;
  Items: React.ComponentType<{ currentItems: T[] }>;
}

function Pagination<T>({
  items,
  itemsPerPage,
  Items,
  ...paginateProps
}: PaginationProps<T>) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        pageRangeDisplayed={5}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        {...paginateProps}
      />
    </>
  );
}

export default Pagination;

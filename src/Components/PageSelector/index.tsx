import { useMemo } from "react";
import { classNames } from "../../Common/utils";
import styles from "./selector.module.css";

// Interface for PageSelector props
interface PageSelectorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const PageSelector = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PageSelectorProps): JSX.Element => {
  const pageNumbers = useMemo((): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const firstPages = [1, 2];
    const lastPages = [totalPages - 1, totalPages];
    const startPage = Math.max(
      3,
      Math.min(currentPage - siblingCount, totalPages - 5)
    );
    const endPage = Math.min(
      totalPages - 2,
      Math.max(currentPage + siblingCount, 6)
    );

    const middlePages = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );

    return [
      ...firstPages,
      ...(startPage > 3 ? ["..."] : []),
      ...middlePages,
      ...(endPage < totalPages - 2 ? ["..."] : []),
      ...lastPages,
    ];
  }, [currentPage, totalPages, siblingCount]);

  // Render page buttons

  return (
    <div
      className={styles.pageSelector}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={classNames({
          [styles.navigationButton]: true,
          [styles.prevButton]: true,
        })}
        aria-label="Previous Page"
      >
        Previous
      </button>
      <RenderPageButtons
        pageNumbers={pageNumbers}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={classNames({
          [styles.navigationButton]: true,
          [styles.nextButton]: true,
        })}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
};

const RenderPageButtons = ({
  pageNumbers,
  onPageChange,
  currentPage,
}: {
  pageNumbers: (number | string)[];
  onPageChange: (val: number) => void;
  currentPage: number;
}): JSX.Element => {
  return (
    <div className={styles.pageNumbers}>
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className={styles.pageEllipsis}
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={classNames({
              [styles.pageButton]: true,
              [styles.active]: currentPage === page,
            })}
            aria-label={`Page ${page}`}
            disabled={currentPage === page}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

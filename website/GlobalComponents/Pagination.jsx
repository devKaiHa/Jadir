import { useTranslation } from "react-i18next";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const { t } = useTranslation();

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageButton = (page, isCurrent = false) => (
    <li className="count-page" key={page}>
      <button
        type="button"
        onClick={() => goToPage(page)}
        className={isCurrent ? "current" : ""}
        aria-current={isCurrent ? "page" : undefined}
      >
        <span>{String(page).padStart(2, "0")}</span>
      </button>
    </li>
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination-wrapper centred">
      <ul className="pagination clearfix">
        <li className="prev-btn">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <i className="flaticon-right-chevron" />
            {t("PrevPage")}
          </button>
        </li>

        {currentPage > 1 && getPageButton(currentPage - 1)}
        {getPageButton(currentPage, true)}
        {currentPage < totalPages && getPageButton(currentPage + 1)}

        <li className="next-btn">
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            {t("NextPage")} <i className="flaticon-right-chevron" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

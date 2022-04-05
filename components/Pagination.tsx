import usePagination from "../hooks/usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import Link from 'next/link'

type PaginationProps = {
    startIndex?: number
    classify: string,
    total: number,
    onPageChange?: (page: number) => void
};

function urlString(page: number, classify: string) {
    if (page === 1) {
      if (classify === "archive") {
        return "/";
      }
      return `/${classify}`;
    }
    return `/${classify}/${page}`;
}

const Pagination = ({ startIndex = 1, total, onPageChange, classify }: PaginationProps) => {
    const { currentPage, pagesArray, canNextPage, canPreviousPage } = usePagination({ startIndex, total, onPageChange });
    return (
        <div className="flex justify-end items-center gap-6">
            <div className="flex items-center gap-3">
                { canPreviousPage && (
                  <Link href={urlString(currentPage - 1, classify)} passHref>
                    <a><FontAwesomeIcon icon={faChevronLeft} /></a>
                  </Link>
                ) }
                { !canPreviousPage && <div className="opacity-25 cursor-not-allowed">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div> }
                <div className="flex gap-2 select-none">
                    {pagesArray.map(v =>
                      <Link key={v} href={urlString(v, classify)} passHref>
                        <a>
                          <div
                              className={
                                  classNames({ "bg-gray-500 text-white border-gray-500": currentPage === v, "hover:bg-gray-200": currentPage !== v }, 
                                      "w-8 h-8 flex items-center justify-center border cursor-pointer rounded border-gray-200")
                              }
                          > 
                            {v}
                          </div>
                        </a>
                      </Link>
                    )}
                </div>
                { canNextPage && <Link href={`/${classify}/${currentPage + 1}`} passHref>
                    <a>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                </Link> }
                { !canNextPage && <div className="opacity-25 cursor-not-allowed">
                    <FontAwesomeIcon icon={faChevronRight} />
                </div> }
            </div>
        </div>
    );
};

export default Pagination;

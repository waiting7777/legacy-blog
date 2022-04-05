import { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { POSTPERPAGE } from "../config"

type usePaginationProps = {
    rowsPerPage?: number,
    startIndex?: number,
    pagesArrayCount?: number,
    total: number,
    onPageChange?: (page: number) => void
};

function caculatePagesArray(currentPage: number, totalPage: number, pagesArrayCount: number) {
    if (totalPage <= pagesArrayCount) {
        return _.range(1, totalPage + 1);
    } else {
        const pagesArrayOffset = Math.floor(pagesArrayCount / 2);
        if (pagesArrayCount % 2 === 0) {
            const pageTemp = _.clamp(currentPage, 1 + pagesArrayOffset - 1, totalPage - pagesArrayOffset);
            return _.range(pageTemp - pagesArrayOffset + 1, pageTemp + pagesArrayOffset + 1);
        } else {
            const pageTemp = _.clamp(currentPage, 1 + pagesArrayOffset, totalPage - pagesArrayOffset);
            return _.range(pageTemp - pagesArrayOffset, pageTemp + pagesArrayOffset + 1);
        }
    }
}

const usePagination = ({ rowsPerPage = POSTPERPAGE, startIndex = 1, pagesArrayCount = 3, total, onPageChange }: usePaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(startIndex);
    const [pagesArray, setPagesArray] = useState<number[]>(caculatePagesArray(startIndex, Math.ceil(total / rowsPerPage), pagesArrayCount));
    const [rowsPerPageState, setRowsPerPageState] = useState<number>(rowsPerPage);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [canNextPage, setCanNextPage] = useState<boolean>(true);
    const [canPreviousPage, setCanPreviousPage] = useState<boolean>(false);

    useEffect(() => {
        setTotalPage(Math.ceil(total / rowsPerPageState));
    }, [rowsPerPageState, total]);

    useEffect(() => {
        setCanNextPage(currentPage < totalPage);
        setCanPreviousPage(currentPage > 1);
    }, [currentPage, totalPage]);

    useEffect(() => {
        setPagesArray(caculatePagesArray(currentPage, totalPage, pagesArrayCount));
    }, [totalPage, currentPage, pagesArrayCount]);

    const gotoPage = useCallback((page: number) => {
        if (page !== currentPage && _.inRange(page, 1, totalPage + 1)) {
            setCurrentPage(page);
            setPagesArray(caculatePagesArray(page, totalPage, pagesArrayCount));
            if (onPageChange) onPageChange(page);
        }
    }, [setCurrentPage, setPagesArray, currentPage, totalPage, pagesArrayCount, onPageChange]);

    const nextPage = useCallback(() => {
        if (canNextPage) gotoPage(currentPage + 1);
    }, [gotoPage, currentPage, canNextPage]);

    const previousPage = useCallback(() => {
        if (canPreviousPage) gotoPage(currentPage - 1);
    }, [gotoPage, currentPage, canPreviousPage]);

    const setPageSize = useCallback((page: number) => {
        setRowsPerPageState(page);
        gotoPage(1);
    }, [setRowsPerPageState, gotoPage]);

    return {
        currentPage,
        gotoPage,
        canNextPage,
        canPreviousPage,
        nextPage,
        previousPage,
        setPageSize,
        pagesArray,
        totalPage
    };
};

export default usePagination;

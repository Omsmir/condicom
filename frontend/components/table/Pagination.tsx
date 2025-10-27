import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table } from '@tanstack/react-table';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getIsNextEnabled, getIsPerviousEnabled, setPageIndex } from '../store/slices/PatientsSlicer';

interface PaginationProps {
    table: Table<any>;
    pagination: {
        pageIndex: number;
        pageSize: number;
    };
}

const Pagination = ({ props }: { props: PaginationProps }) => {
    const { table, pagination } = props;
    const { pageIndex ,totalPages} = useAppSelector(state => state.pagination);
    const getCanPerivous = useAppSelector((state) => getIsPerviousEnabled(state))
    const getCanNext = useAppSelector((state) => getIsNextEnabled(state))
    const dispatch = useAppDispatch();

    const getVisiblePageIndex = (currentPage: number, totalPages: number) => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage < 3) return [1, 2, , 3, 4, '...', totalPages];
        if (currentPage <= 3) return [1, '...', 3, 4, 5, '...', totalPages];
        if (currentPage >= totalPages - 2)
            return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', currentPage, currentPage + 1, currentPage + 2, '...', totalPages];
    };
    return (
        <div className="flex items-center justify-between my-2">
            <div className="flex items-center gap-2">
                <span className="flex items-center ml-2">
                    <Input
                        type="number"
                        min={1}
                        maxLength={totalPages}
                        max={table.getPageCount()}
                        defaultValue={pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            dispatch(setPageIndex(page));
                        }}
                        className="shad-input w-16 mx-2 p-2 "
                    />
                </span>
                <span className="flex text-sm">
                    {pageIndex + 1} <p className="text-slate-600 mx-1"> of </p>{' '}
                    {table.getPageCount()}
                </span>
            </div>

            <div className="flex border rounded-md overflow-hidden dark:border-0">
                {getVisiblePageIndex(pageIndex, table.getPageCount()).map((page, index) => (
                    <Button
                        key={index}
                        onClick={() =>
                            dispatch(setPageIndex((page as number) && (page as number) - 1))
                        }
                        className={clsx(
                            'border-r last-of-type:border-0 rounded-none text-[12px] p-3 text-slate-600',
                            {
                                'bg-[var(--sidebar-background)]':
                                    pageIndex === (page as number) - 1,
                            }
                        )}
                        disabled={page === '...'}
                    >
                        {page}
                    </Button>
                ))}
            </div>
            <div className="flex gap-2 mx-2">
                <Button
                    variant="outline"
                    className="bg-[var(--sidebar-background)] dark:border-0"
                    onClick={() => dispatch(setPageIndex(0))}
                    disabled={!getCanPerivous}
                >
                    {'<<'}
                </Button>
                <Button
                    variant="outline"
                    className="bg-[var(--sidebar-background)] dark:border-0"
                    onClick={() => dispatch(setPageIndex(pageIndex - 1))}
                    disabled={!getCanPerivous}
                >
                    {'<'}
                </Button>
                <Button
                    variant="outline"
                    className="bg-[var(--sidebar-background)] dark:border-0"
                    onClick={() => dispatch(setPageIndex(pageIndex + 1))}
                    disabled={!getCanNext}
                >
                    {'>'}
                </Button>
                <Button
                    variant="outline"
                    className="bg-[var(--sidebar-background)] dark:border-0"
                    onClick={() => dispatch(setPageIndex(table.getPageCount() - 1))}
                    disabled={!getCanNext}
                >
                    {'>>'}
                </Button>
            </div>
        </div>
    );
};

export default Pagination;

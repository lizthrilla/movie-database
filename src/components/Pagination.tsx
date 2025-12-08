interface PaginationProps {
    handleNextPage: () => void;
    handlePrevPage: () => void;
    loading: boolean;
    page: number;
    totalPages: number;
}
export default function Pagination({handleNextPage, handlePrevPage, loading, page, totalPages}: PaginationProps) {
    return(
        <div className="mt-6 flex items-center justify-between text-sm">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={page <= 1 || loading}
                className="rounded-md border border-slate-600 px-3 py-1 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={page >= totalPages || loading}
                className="rounded-md border border-slate-600 px-3 py-1 disabled:opacity-40"
              >
                Next
              </button>
            </div>
        </div>
    )
}
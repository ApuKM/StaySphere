"use client";

import { Pagination } from "@heroui/react";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export function PaginationWithSummary({
  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage = 12,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // কোনো ডেটা না থাকলে পেজিনেশন হাইড করে রাখা
  if (totalItems === 0) return null;

  return (
    <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* 📊 Summary Section */}
      <Pagination.Summary className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-900">{startItem}</span>-
        <span className="font-semibold text-slate-900">{endItem}</span> of{" "}
        <span className="font-semibold text-slate-900">{totalItems}</span> results
      </Pagination.Summary>

      {/* 🔘 Pagination Items */}
      <Pagination.Content>
        {/* Previous Button */}
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={currentPage === 1}
            onPress={() => onPageChange(currentPage - 1)}
          >
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {/* Page Numbers & Ellipsis */}
        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === currentPage}
                onPress={() => onPageChange(p as number)}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}

        {/* Next Button */}
        <Pagination.Item>
          <Pagination.Next
            isDisabled={currentPage === totalPages}
            onPress={() => onPageChange(currentPage + 1)}
          >
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
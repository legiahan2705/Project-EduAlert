'use client';

import { useEffect } from 'react';

/**
 * Gắn nhãn cột (data-label) cho mọi ô của bảng .erp-table để CSS biến bảng thành dạng thẻ trên điện thoại.
 * Chạy một lần và tự cập nhật khi bảng được vẽ lại. Bảng có class "no-stack" được bỏ qua.
 */
function labelTables() {
  document.querySelectorAll('table.erp-table:not(.no-stack), table.stack-table').forEach((table) => {
    const headRow = table.tHead?.rows?.[0];
    if (!headRow) return;
    const labels = [...headRow.cells].map((th) => th.textContent.trim());
    [...table.tBodies].forEach((body) => {
      [...body.rows].forEach((row) => {
        let col = 0;
        [...row.cells].forEach((td) => {
          if (td.colSpan > 1) {
            td.setAttribute('data-span', '1');
            col += td.colSpan;
            return;
          }
          const label = labels[col] || '';
          if (td.getAttribute('data-label') !== label) td.setAttribute('data-label', label);
          col += 1;
        });
      });
    });
  });
}

export default function ResponsiveTables() {
  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(labelTables);
    };
    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);
  return null;
}

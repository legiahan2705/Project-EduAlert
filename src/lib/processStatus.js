// Trạng thái xử lý của CVHT đối với từng sinh viên, suy ra từ nhật ký tư vấn mới nhất.
export const PROCESS_STATUSES = [
  { key: 'Chưa liên hệ', color: '#b91c1c', bg: '#fef2f2', border: '#fecaca' },
  { key: 'Đã liên hệ', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe' },
  { key: 'Đang hỗ trợ', color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
  { key: 'Đã cam kết', color: '#6d28d9', bg: '#f5f3ff', border: '#ddd6fe' },
  { key: 'Chuyển cố vấn', color: '#475569', bg: '#f1f5f9', border: '#cbd5e1' },
  { key: 'Hoàn thành', color: '#047857', bg: '#ecfdf5', border: '#a7f3d0' },
];

// Trạng thái nhập được trong form nhật ký (không gồm "Chưa liên hệ")
export const NOTE_STATUS_OPTIONS = PROCESS_STATUSES.filter((s) => s.key !== 'Chưa liên hệ').map((s) => s.key);

export function getProcessStatus(student) {
  const log = student?.counselingLog;
  if (!log || log.length === 0) return { ...PROCESS_STATUSES[0], lastDate: null };
  const last = log[0]; // nhật ký mới nhất nằm đầu danh sách
  // Nhật ký cũ chỉ có "type" (hình thức gặp) mà không có trạng thái -> coi là đã liên hệ
  const found = PROCESS_STATUSES.find((s) => s.key === last.status) || PROCESS_STATUSES[1];
  return { ...found, lastDate: last.date || null };
}

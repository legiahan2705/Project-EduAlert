'use client';

import {
  HelpCircle,
  X,
  AlertTriangle,
  Compass,
  Building2,
  Layers,
  FileSpreadsheet,
  ListChecks
} from 'lucide-react';

const sectionTitleStyle = {
  color: 'var(--primary)',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const listStyle = {
  paddingLeft: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const sectionStyle = { marginBottom: '18px' };

export default function QuickGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Hướng Dẫn Sử Dụng EduAlert
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Đóng">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          className="modal-body-content"
          style={{ maxHeight: '70vh', overflowY: 'auto', fontSize: '0.88rem', lineHeight: '1.6' }}
        >
          <p style={{ marginBottom: '16px', color: 'var(--text-muted, #64748b)' }}>
            EduAlert giúp Cố vấn học tập (CVHT) và Phòng Đào tạo theo dõi điểm số, phát hiện sớm sinh viên
            có nguy cơ học vụ (theo Thông tư 08/2021) và lập kế hoạch cải thiện. Chọn chức năng ở
            thanh bên trái. Dữ liệu hiện tại là <strong>dữ liệu mẫu</strong>, thay đổi chỉ lưu trong phiên làm việc
            và sẽ mất khi tải lại trang.
          </p>

          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>
              <AlertTriangle className="w-4 h-4" />
              1. Cảnh Báo Sớm Nguy Cơ
            </h4>
            <ul style={listStyle}>
              <li>Chọn <strong>Ngành</strong> và <strong>Lớp</strong> (mặc định lớp <strong>DH22CS01C</strong>, 45 sinh viên), hoặc gõ tên / MSSV vào ô tìm kiếm.</li>
              <li>Bảng được xếp theo <strong>chỉ số rủi ro</strong> giảm dần, sinh viên cần can thiệp nhất nằm trên cùng.</li>
              <li>Ở cột <strong>Thao tác</strong>, bấm biểu tượng <strong>con mắt</strong> (Xem hồ sơ học vụ) để xem 4 quy tắc cảnh báo, lịch sử học kỳ và <strong>ghi biên bản tư vấn</strong> (bấm <em>Lưu Ghi Chú</em>).</li>
              <li>Bấm biểu tượng <strong>tia sáng</strong> (Mô phỏng What-If đăng ký trả nợ môn) để chuyển sang Smart Planner với sinh viên đó.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>
              <Compass className="w-4 h-4" />
              2. Smart Academic Planner
            </h4>
            <ul style={listStyle}>
              <li>Chọn sinh viên ở mục <strong>Đổi SV</strong>. Màn hình hiển thị tiến độ so với khung chương trình 141 tín chỉ, các môn đã đạt, môn nợ (F) và môn còn lại.</li>
              <li><strong>GPA mục tiêu:</strong> chọn hoặc nhập mức GPA mong muốn, hệ thống tính điểm trung bình cần đạt trên số tín chỉ còn lại. Nếu vượt 4.0, hệ thống gợi ý các môn điểm thấp nên học cải thiện.</li>
              <li><strong>Mô phỏng What-If:</strong> thêm các môn dự kiến học kỳ tới (bấm <em>Mô Phỏng</em> / <em>Đưa Vào Mô Phỏng</em>), chọn điểm giả định để xem GPA tích lũy mới.</li>
              <li>Môn nợ F khi học lại và đạt sẽ <strong>thay thế hoàn toàn</strong> điểm F cũ khi tính GPA tích lũy. Mô phỏng chỉ chạy trên màn hình, không làm thay đổi bảng điểm thật.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>
              <Building2 className="w-4 h-4" />
              3. Quản Lý Khoa
            </h4>
            <ul style={listStyle}>
              <li>Thêm khoa mới: <strong>mã khoa tự sinh</strong> theo dạng <code>OU + YYMMDD + XXX</code>, ký hiệu viết tắt (ví dụ FIT) phải <strong>không trùng</strong>.</li>
              <li>Sửa thông tin, <strong>vô hiệu hóa / kích hoạt</strong> khoa, hoặc xem <strong>lịch sử thao tác</strong> (Audit log: ai đổi gì, giá trị cũ và mới).</li>
              <li>Khoa đã có ngành hoặc lớp thì <strong>không xóa được</strong>, hãy chuyển sang <em>Vô hiệu hóa</em>.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>
              <Layers className="w-4 h-4" />
              4. Quản Lý Ngành &amp; CTĐT
            </h4>
            <ul style={listStyle}>
              <li>Lọc theo khoa, thêm ngành mới: <strong>mã ngành tự sinh</strong> dạng <code>[Ký hiệu khoa] + YYMM + XXX</code>.</li>
              <li>Mở chi tiết ngành gồm 4 tab: <strong>Thông tin tổng quan</strong>, <strong>Chương trình đào tạo</strong>, <strong>Danh sách lớp</strong>, <strong>Lịch sử</strong>.</li>
              <li>Ở tab Chương trình đào tạo, có thể thêm môn tự nhập hoặc <strong>nạp môn từ khoa / ngành khác</strong> (môn liên ngành).</li>
              <li>Ngành đã có lớp hoặc sinh viên thì không xóa được.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>
              <FileSpreadsheet className="w-4 h-4" />
              5. Quản Lý Bảng Điểm
            </h4>
            <ul style={listStyle}>
              <li>Bảng điểm được <strong>nhóm theo môn học</strong>. Bấm vào tên môn để mở ra danh sách các lớp học môn đó (mã bảng điểm dạng <code>BD-[Lớp]-[Môn]</code>).</li>
              <li>Tìm theo mã môn, tên môn, lớp hoặc giảng viên; lọc theo khoa và học kỳ.</li>
              <li>Bấm <strong>Nhập Điểm</strong> trên dòng lớp để vào bảng điểm chi tiết, nhập <strong>Điểm quá trình (40%)</strong> và <strong>Điểm thi (60%)</strong>. Điểm tổng kết, điểm chữ, thang 4 và kết quả Đạt / Rớt tự cập nhật.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>
              <ListChecks className="w-4 h-4" />
              Quy tắc cần nhớ
            </h4>
            <p style={{ marginBottom: '6px' }}>
              <strong>Điểm tổng kết (thang 10)</strong> = Điểm quá trình × 0.4 + Điểm thi × 0.6, làm tròn 1 chữ số.
              Đạt môn khi điểm tổng kết ≥ 4.0; dưới 4.0 là <strong>F (0.0)</strong>.
            </p>
            <p style={{ marginBottom: '6px' }}>
              <strong>4 quy tắc cảnh báo học vụ</strong> (vi phạm càng nhiều, rủi ro càng cao):
            </p>
            <ul style={listStyle}>
              <li><strong>Rule 1:</strong> số tín chỉ rớt trong kỳ vượt 50% số tín chỉ đăng ký.</li>
              <li><strong>Rule 2:</strong> tổng tín chỉ nợ vượt 24.</li>
              <li><strong>Rule 3:</strong> GPA học kỳ dưới 0.8 (học kỳ đầu) hoặc dưới 1.0 (các học kỳ sau).</li>
              <li><strong>Rule 4:</strong> GPA tích lũy dưới sàn theo năm: năm 1 dưới 1.2, năm 2 dưới 1.4, năm 3 dưới 1.6, từ năm 4 dưới 1.8.</li>
            </ul>
            <p style={{ marginTop: '6px' }}>
              Sinh viên bị cảnh báo học vụ <strong>2 lần liên tiếp</strong> thuộc nhóm <strong>nguy cơ buộc thôi học</strong>.
              Môn Giáo dục thể chất và Giáo dục quốc phòng – an ninh không tính vào GPA tích lũy.
            </p>
          </div>
        </div>

        <div
          className="modal-footer"
          style={{ borderTop: '1px solid var(--border-color)', padding: '12px 18px', display: 'flex', justifyContent: 'flex-end' }}
        >
          <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
            Đã Hiểu
          </button>
        </div>
      </div>
    </div>
  );
}

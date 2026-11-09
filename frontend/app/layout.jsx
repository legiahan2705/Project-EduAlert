import './globals.css';

export const metadata = {
  title: 'EduAlert - Hệ Thống Cảnh Báo Sớm Học Vụ & Quản Lý Đào Tạo OU',
  description: 'Hệ thống phân tích, dự báo và cảnh báo sớm nguy cơ học tập đa cấp độ theo Thông tư 08/2021 & Quy chế ĐH Mở TP.HCM',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

# WEBSITE CỬA HÀNG THỊT BÒ CHỊ HẰNG

Website giới thiệu và hỗ trợ khách hàng liên hệ đặt mua **Thịt bò đông lạnh nhập khẩu** cho cửa hàng **Thịt bò Chị Hằng**.

Dự án được xây dựng dưới dạng **Website tĩnh (Static Web)** hoàn chỉnh bằng HTML5, CSS3 và JavaScript ES6+ thuần, không cần cơ sở dữ liệu, không cần server backend phức tạp, tải trang siêu nhanh, chuẩn SEO và tối ưu 100% hiển thị trên mọi thiết bị (máy tính, điện thoại, máy tính bảng).

---

## 1. CẤU TRÚC DỰ ÁN

```text
Thịt bò chị Hằng/
├── index.html          # Trang chủ chính (Semantic HTML5, đầy đủ SEO, Responsive)
├── style.css           # Toàn bộ CSS (Design tokens, Flexbox/Grid, Dark/Light accents, Responsive)
├── products.js         # Dữ liệu sản phẩm & thông tin cửa hàng (Dễ dàng sửa giá & thêm món)
├── script.js           # Logic giao diện: Render sản phẩm, lọc danh mục, tìm kiếm, modal chi tiết
├── images/             # Thư mục hình ảnh đã tối ưu chuẩn WebP & JPG fallback
│   ├── logo.svg        # Biểu tượng thương hiệu & Favicon cửa hàng
│   ├── hero-quay-hang.webp / .jpg   # Ảnh toàn cảnh quầy thịt bò thực tế
│   ├── tai-nguyen.webp / .jpg       # Ảnh thực tế: Tái nguyên khối
│   ├── thit-vun.webp / .jpg         # Ảnh thực tế: Thịt bò vụn
│   ├── nam-than.webp / .jpg         # Ảnh thực tế: Nạm thăn
│   ├── thit-tai.webp / .jpg         # Ảnh thực tế: Thịt bò tái
│   ├── gan-lot.webp / .jpg          # Ảnh thực tế: Gân lót
│   ├── bap-bo.webp / .jpg           # Ảnh thực tế: Bắp bò
│   ├── bo-vien.webp / .jpg          # Ảnh thực tế: Bò viên
│   └── bo-vun-xay.webp / .jpg       # Ảnh thực tế: Bò vụn xay
├── Thịt bò chị Hằng.docx  # File tài liệu Word gốc chứa dữ liệu đối chiếu
├── README.md           # Hướng dẫn chi tiết sử dụng & cập nhật
└── .gitignore          # Cấu hình bỏ qua file rác khi đẩy lên Git
```

---

## 2. CÁCH CHẠY THỬ WEBSITE TẠI MÁY CỤC BỘ (LOCAL)

Website hoàn toàn là file tĩnh, có thể chạy theo các cách sau:

### Cách 1: Mở trực tiếp bằng trình duyệt
- Nhấp đúp chuột trực tiếp vào file `index.html` để mở bằng trình duyệt (Chrome, Edge, Firefox, Cốc Cốc, Safari...).

### Cách 2: Chạy qua Local HTTP Server (Khuyên dùng để tối ưu nạp ảnh)
Mở cửa sổ dòng lệnh (Terminal / PowerShell) tại thư mục dự án và gõ lệnh:
```bash
# Sử dụng Python có sẵn trên máy:
python -m http.server 8080
```
Sau đó truy cập trình duyệt theo địa chỉ: `http://localhost:8080`

Hoặc nếu dùng Node.js:
```bash
npx serve .
```

---

## 3. HƯỚNG DẪN CẬP NHẬT DỮ LIỆU & BẢO TRÌ

Tất cả thông tin sản phẩm và liên hệ được gom tập trung trong file `products.js`. Bạn **không cần phải sửa mã HTML** khi thay đổi giá hay thêm sản phẩm.

### 3.1. Cách thay đổi giá sản phẩm
Mở file `products.js`, tìm sản phẩm cần sửa:
```javascript
{
  id: "tai-nguyen",
  name: "Tái nguyên",
  price: 190000,               // Sửa số tiền (đơn vị: VNĐ)
  priceFormatted: "190.000 đ", // Sửa chữ hiển thị trên website
  unit: "kg",
  ...
}
```
Lưu file `products.js` lại và tải lại trang web (F5), giá mới sẽ tự động cập nhật ngay lập tức!

### 3.2. Cách thêm sản phẩm mới
Mở file `products.js`, copy một khối sản phẩm có sẵn và dán thêm vào mảng `PRODUCTS_DATA`:
```javascript
{
  id: "ten-san-pham-moi",
  name: "Tên Sản Phẩm Mới",
  category: "tai", // Chọn 1 trong các mục: "tai", "nam-gan", "vun", "vien"
  categoryName: "Thịt tái & Nạc",
  price: 200000,
  priceFormatted: "200.000 đ",
  unit: "kg",
  spec: "Quy cách đóng gói",
  origin: "Đông lạnh nhập khẩu",
  imageWebp: "images/anh-san-pham.webp",
  imageJpg: "images/anh-san-pham.jpg",
  description: "Mô tả hương vị và các món ăn thích hợp...",
  features: ["Đặc điểm nổi bật 1", "Đặc điểm nổi bật 2", "Món ăn gợi ý: ..."]
}
```

### 3.3. Cách thay ảnh sản phẩm
1. Đặt ảnh mới vào thư mục `images/`.
2. Khuyến khích đổi tên file không dấu, viết liền có dấu gạch ngang (ví dụ: `thit-ba-chi.jpg`).
3. Mở file `products.js` và trỏ đường dẫn `imageJpg` và `imageWebp` tới tên file ảnh mới.

### 3.4. Cách cập nhật số điện thoại Hotline và Zalo
Mở file `products.js`, tìm đoạn `STORE_INFO` ở cuối file:
```javascript
const STORE_INFO = {
  name: "Thịt bò Chị Hằng",
  tagline: "Thịt bò đông lạnh nhập khẩu",
  address: "Chợ Rạch Ông, Quận 8, TP. Hồ Chí Minh",
  addressShort: "Chợ Rạch Ông, Quận 8, TP.HCM",
  phone: "0934035166",              // Số điện thoại gọi (Hotline 1 - Chị Hằng)
  phoneFormatted: "0934 035 166",    // Định dạng hiển thị đẹp
  owner: "Chị Hằng",
  phone2: "0919322979",             // Hotline 2 - Anh Huy
  phone2Formatted: "0919 322 979",
  owner2: "Anh Huy",
  contactNote: "Trong trường hợp số máy bận hoặc chưa nhận được phản hồi ngay, Quý khách vui lòng liên hệ hotline còn lại để được hỗ trợ kịp thời nhất.",
  zaloPhone: "0934035166",          // Số Zalo 1
  zaloLink: "https://zalo.me/0934035166",
  zaloPhone2: "0919322979",         // Số Zalo 2
  zaloLink2: "https://zalo.me/0919322979",
  callLink: "tel:0934035166",
  callLink2: "tel:0919322979"
};
```
Nếu có cập nhật số điện thoại trong `index.html` (ở các nút tĩnh), bạn chỉ cần dùng chức năng Replace để thay thế số cũ sang số mới.

---

## 4. HƯỚNG DẪN ĐẨY LÊN GITHUB & TRIỂN KHAI CLOUDFLARE PAGES (MIỄN PHÍ)

### Bước 1: Khởi tạo và Đẩy code lên GitHub
1. Mở tài khoản [GitHub](https://github.com) và tạo một Repository mới (ví dụ đặt tên: `thit-bo-chi-hang`), chọn chế độ **Public**.
2. Tại máy tính, mở PowerShell trong thư mục dự án và chạy:
```bash
git init
git add .
git commit -m "Khoi tao website Thit bo Chi Hang day du san pham va hinh anh"
git branch -M main
git remote add origin https://github.com/<tai-khoan-cua-ban>/thit-bo-chi-hang.git
git push -u origin main
```

### Bước 2: Kết nối với Cloudflare Pages
1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/) (miễn phí 100%).
2. Vào mục **Workers & Pages** -> chọn **Create application** -> chuyển sang tab **Pages** -> bấm **Connect to Git**.
3. Chọn tài khoản GitHub của bạn và chọn kho lưu trữ `thit-bo-chi-hang`.
4. Thiết lập cấu hình triển khai:
   - **Project name**: `thit-bo-chi-hang`
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: *(Để trống hoàn toàn vì đây là web tĩnh)*
   - **Build output directory**: `.` hoặc để trống (trỏ thẳng vào thư mục chứa `index.html`).
5. Bấm **Save and Deploy**.
6. Sau khoảng 30 giây đến 1 phút, Cloudflare Pages sẽ cấp cho bạn một tên miền miễn phí hoạt động 24/7 có sẵn chứng chỉ bảo mật HTTPS:
   `https://thit-bo-chi-hang.pages.dev`

> [!TIP]
> Sau khi đã kết nối Cloudflare Pages với GitHub, bất cứ khi nào bạn chỉnh sửa giá hoặc hình ảnh trên máy rồi chạy `git push`, Cloudflare Pages sẽ tự động cập nhật website chỉ sau 10 giây!

---

## 5. ĐỊA CHỈ TRUY CẬP WEBSITE CHÍNH THỨC TRÊN INTERNET

🌐 **Website chính thức:** [https://thit-bo-chi-hang.dangluongtheanh.workers.dev](https://thit-bo-chi-hang.dangluongtheanh.workers.dev)

- Hoạt động 24/7, miễn phí vĩnh viễn trên nền tảng Cloudflare.
- Tự động tích hợp chứng chỉ bảo mật HTTPS (SSL).
- Tối ưu hiển thị hoàn hảo trên máy tính, điện thoại di động và máy tính bảng.
- Khách hàng có thể kết nối nhanh qua Hotline & Zalo:
  - **Hotline 1:** Chị Hằng (`0934 035 166`)
  - **Hotline 2:** Anh Huy (`0919 322 979`)
  - **Quầy hàng:** Chợ Rạch Ông, Quận 8, TP. Hồ Chí Minh.

---

## 6. GIỚI HẠN VÀ ĐẶC ĐIỂM KỸ THUẬT CỦA DỰ ÁN
- **Không sử dụng Database**: Dự án lưu trữ danh sách sản phẩm trực tiếp trong file mã nguồn JavaScript, giúp website có tốc độ tải gần như tức thì, không lo bị tấn công SQL Injection hay chi phí thuê máy chủ lưu trữ database.
- **Không lưu trữ dữ liệu cá nhân khách hàng**: Mọi giao dịch và tư vấn đều được chuyển tiếp an toàn trực tiếp qua Zalo hoặc Cuộc gọi điện thoại của chủ cửa hàng.

/**
 * Danh sách sản phẩm cửa hàng Thịt bò Chị Hằng
 * Dữ liệu chuẩn xác 100% từ tài liệu gốc.
 * Dễ dàng cập nhật giá hoặc bổ sung sản phẩm mới tại đây.
 */
const PRODUCTS_DATA = [
  {
    id: "tai-nguyen",
    name: "Tái nguyên",
    category: "tai",
    categoryName: "Thịt tái & Nạc",
    price: 190000,
    priceFormatted: "190.000 đ",
    unit: "kg",
    spec: "Tảng nạc tái nguyên khối",
    origin: "Đông lạnh nhập khẩu",
    imageWebp: "images/tai-nguyen.webp",
    imageJpg: "images/tai-nguyen.jpg",
    description: "Tảng thịt bò tái nguyên khối tươi đỏ thớ thịt mịn, dẻo mềm và ngọt vị thịt. Phù hợp làm bít tết, xào lăn, nhúng lẩu hoặc thái lát theo độ dày mong muốn.",
    features: ["Thịt nạc nguyên khối dày dặn", "Thớ thịt mềm, ngọt tự nhiên", "Thích hợp: Bít tết, nhúng dấm, xào, lẩu"]
  },
  {
    id: "thit-vun",
    name: "Vụn (Thịt bò vụn)",
    category: "vun",
    categoryName: "Thịt vụn & Xay",
    price: 120000,
    priceFormatted: "120.000 đ",
    unit: "kg",
    spec: "Thịt vụn miếng thái sẵn",
    origin: "Đông lạnh nhập khẩu",
    imageWebp: "images/thit-vun.webp",
    imageJpg: "images/thit-vun.jpg",
    description: "Thịt bò vụn miếng nạc xen lẫn chút mỡ mềm thơm, giá cả cực kỳ kinh tế cho gia đình và quán ăn. Phù hợp chế biến các món bò kho, sốt vang, xào dưa cải chua.",
    features: ["Giá cực tốt, tiết kiệm chi phí", "Nạc mỡ đan xen thơm ngậy", "Thích hợp: Bò kho, bò sốt vang, nấu canh, xào dưa"]
  },
  {
    id: "nam-than",
    name: "Nạm thăn",
    category: "nam-gan",
    categoryName: "Nạm & Gân",
    price: 165000,
    priceFormatted: "165.000 đ",
    unit: "kg",
    spec: "Tảng nạm thăn có màng mỡ nạc",
    origin: "Đông lạnh nhập khẩu",
    imageWebp: "images/nam-than.webp",
    imageJpg: "images/nam-than.jpg",
    description: "Phần nạm thăn hảo hạng với thớ thịt săn chắc, xen lớp màng mỡ nạc ngậy thơm khi nấu chín mà không hề ngấy. Đây là nguyên liệu chuẩn vị cho phở bò truyền thống.",
    features: ["Thớ thịt dày, lớp mỡ mỏng thơm lừng", "Không bị khô xơ khi hầm", "Thích hợp: Phở bò nạm, bò kho, lẩu riêu cua bắp bò"]
  },
  {
    id: "thit-tai",
    name: "Tái (Thịt bò tái)",
    category: "tai",
    categoryName: "Thịt tái & Nạc",
    price: 190000,
    priceFormatted: "190.000 đ",
    unit: "kg",
    spec: "Dải thịt nạc tái thăn dài",
    origin: "Đông lạnh nhập khẩu",
    imageWebp: "images/thit-tai.webp",
    imageJpg: "images/thit-tai.jpg",
    description: "Thịt bò nạc thăn mềm dẻo, màu đỏ tươi bắt mắt, vị ngọt đậm đà. Thích hợp nhất cho món phở tái lăn, tái chanh, nhúng giấm hoặc nhúng lẩu ăn liền.",
    features: ["Thịt đỏ tươi, thớ mỏng dẻo mềm", "Chín nhanh, giữ trọn vị ngọt", "Thích hợp: Phở tái, bò né, nhúng lẩu, xào cần tỏi"]
  },
  {
    id: "gan-lot",
    name: "Gân lót",
    category: "nam-gan",
    categoryName: "Nạm & Gân",
    price: 140000,
    priceFormatted: "140.000 đ",
    unit: "kg",
    spec: "Dải thịt gân lót giòn dẻo",
    origin: "Đông lạnh nhập khẩu",
    imageWebp: "images/gan-lot.webp",
    imageJpg: "images/gan-lot.jpg",
    description: "Gân lót với độ giòn sần sật đặc trưng, giàu collagen, khi ninh vừa tới tạo độ dẻo mềm hấp dẫn. Lựa chọn tuyệt vời cho các món hầm, phở gân bò và lẩu bò.",
    features: ["Giòn sần sật, dẻo thơm ngậy", "Giàu collagen tự nhiên", "Thích hợp: Phở bò gân, gân hầm tiêu xanh, lẩu bò"]
  },
  {
    id: "bap-bo",
    name: "Bắp bò",
    category: "tai",
    categoryName: "Thịt tái & Nạc",
    price: 190000,
    priceFormatted: "190.000 đ",
    unit: "kg",
    spec: "Bắp bò nạc hoa nguyên củ",
    origin: "Đông lạnh nhập khẩu",
    imageWebp: "images/bap-bo.webp",
    imageJpg: "images/bap-bo.jpg",
    description: "Bắp bò thịt săn chắc, xen kẽ các đường vân gân hoa trong suốt tuyệt đẹp. Khi luộc hoặc hấp, thịt giữ nguyên độ giòn ngọt thơm lừng không thể cưỡng lại.",
    features: ["Vân gân hoa giòn rụm đẹp mắt", "Thịt chắc nịch, thơm đặc trưng", "Thích hợp: Bắp bò ngâm mắm, luộc mắm gừng, nhúng lẩu"]
  },
  {
    id: "bo-vien",
    name: "Bò viên",
    category: "vien",
    categoryName: "Bò viên chế biến",
    price: 130000,
    priceFormatted: "130.000 đ",
    unit: "kg",
    spec: "Viên tròn đóng gói tiện lợi",
    origin: "Đông lạnh nhập khẩu",
    imageWebp: "images/bo-vien.webp",
    imageJpg: "images/bo-vien.jpg",
    description: "Bò viên thơm lừng, viên chắc dai giòn tự nhiên từ thịt bò thật, không pha tạp. Thích hợp cho cả gia đình và các quán bún bò, phở bò, hủ tiếu bò viên.",
    features: ["Dai giòn tự nhiên, vị đậm đà", "Tiện lợi, chế biến siêu nhanh", "Thích hợp: Nấu hủ tiếu, phở bò, ăn lẩu, chiên chấm tương"]
  },
  {
    id: "bo-vun-xay",
    name: "Bò vụn say (Bò xay)",
    category: "vun",
    categoryName: "Thịt vụn & Xay",
    price: 120000,
    priceFormatted: "120.000 đ",
    unit: "kg",
    spec: "Thịt bò vụn xay nhuyễn dẻo",
    origin: "Đông lạnh nhập khẩu",
    imageWebp: "images/bo-vun-xay.webp",
    imageJpg: "images/bo-vun-xay.jpg",
    description: "Thịt bò vụn xay nhuyễn với tỷ lệ nạc mỡ hài hòa, thịt dẻo mịn giữ được độ ẩm tự nhiên, không bị khô khi chế biến các món xào, viên hoặc làm nhân bánh.",
    features: ["Xay tươi nhuyễn mịn, dẻo thịt", "Tỷ lệ nạc mỡ hài hòa không khô", "Thích hợp: Mì Ý sốt bò băm, bò viên, cháo thịt bò, nhân bánh"]
  }
];

// Thông tin cửa hàng chuẩn hóa
const STORE_INFO = {
  name: "Thịt bò Chị Hằng",
  tagline: "Thịt bò đông lạnh nhập khẩu",
  phone: "0934035166",
  phoneFormatted: "0934 035 166",
  zaloPhone: "0934035166",
  zaloLink: "https://zalo.me/0934035166",
  callLink: "tel:0934035166"
};

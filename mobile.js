/**
 * THỊT BÒ CHỊ HẰNG - SCRIPT CHO GIAO DIỆN ĐIỆN THOẠI
 * Tối ưu cảm ứng chạm, Bottom Sheet ngăn kéo mượt mà
 */

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("mobile-product-list");
  const catPills = document.querySelectorAll(".m-cat-pill");
  const searchInput = document.getElementById("m-search-input");
  const sheetBackdrop = document.getElementById("sheet-backdrop");
  const sheetContent = document.getElementById("sheet-content");
  const sheetCloseBtn = document.getElementById("sheet-close-btn");

  let currentCategory = "all";
  let currentSearch = "";

  /**
   * Render danh sách sản phẩm kiểu điện thoại
   */
  function renderMobileProducts() {
    if (!productList) return;

    const filtered = PRODUCTS_DATA.filter((product) => {
      const matchCat =
        currentCategory === "all" || product.category === currentCategory;
      const q = currentSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.spec.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      productList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; background: #fff; border-radius: 12px; border: 1px dashed #E5E7EB;">
          <p style="font-weight: 700; color: #1F2937; margin-bottom: 0.35rem;">Không tìm thấy sản phẩm</p>
          <p style="font-size: 0.8rem; color: #6B7280; margin-bottom: 1rem;">Vui lòng thử tìm với từ khóa khác</p>
          <button id="m-reset-btn" style="background: #8B1E1E; color: #fff; padding: 0.45rem 1rem; border-radius: 999px; font-size: 0.825rem; font-weight: 700;">Xem tất cả</button>
        </div>
      `;

      const resetBtn = document.getElementById("m-reset-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          currentCategory = "all";
          currentSearch = "";
          if (searchInput) searchInput.value = "";
          catPills.forEach((p) => p.classList.toggle("active", p.dataset.category === "all"));
          renderMobileProducts();
        });
      }
      return;
    }

    productList.innerHTML = filtered
      .map((item) => {
        return `
        <article class="m-product-card" onclick="openBottomSheet('${item.id}')">
          <div class="m-card-thumb">
            <picture>
              <source srcset="${item.imageWebp}" type="image/webp">
              <img src="${item.imageJpg}" alt="${item.name}" loading="lazy" width="105" height="105">
            </picture>
            <span class="m-card-badge">${item.origin}</span>
          </div>
          <div class="m-card-info">
            <div>
              <h4 class="m-card-name">${item.name}</h4>
              <p class="m-card-spec">${item.spec}</p>
            </div>
            <div class="m-card-price-row">
              <span class="m-card-price">${item.priceFormatted}</span>
              <span class="m-card-unit">/ ${item.unit}</span>
            </div>
            <div class="m-card-actions">
              <button type="button" class="btn-m-detail">
                Xem chi tiết & món ngon
              </button>
              <a href="tel:${STORE_INFO.phone}" onclick="event.stopPropagation();" class="btn-m-quick-call" title="Gọi mua ${item.name}">
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </a>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }

  /**
   * Mở Bottom Sheet (Ngăn kéo vuốt từ dưới lên)
   */
  window.openBottomSheet = function (productId) {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!product || !sheetContent || !sheetBackdrop) return;

    sheetContent.innerHTML = `
      <div class="sheet-scroll-body">
        <div class="sheet-img-wrap">
          <picture>
            <source srcset="${product.imageWebp}" type="image/webp">
            <img src="${product.imageJpg}" alt="${product.name}" width="400" height="200">
          </picture>
        </div>
        <div class="sheet-origin-tag">${product.origin}</div>
        <h3 class="sheet-title">${product.name}</h3>
        <div class="sheet-price-row">
          <span class="sheet-price">${product.priceFormatted}</span>
          <span class="sheet-unit">/ ${product.unit}</span>
        </div>
        <div class="sheet-spec"><strong>Quy cách:</strong> ${product.spec}</div>
        <p class="sheet-desc">${product.description}</p>

        <div style="font-size: 0.825rem; font-weight: 700; color: #8B1E1E; margin-bottom: 0.4rem;">
          Đặc điểm & Gợi ý chế biến:
        </div>
        <ul class="sheet-features">
          ${product.features
            .map(
              (f) => `
            <li>
              <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              <span>${f}</span>
            </li>
          `
            )
            .join("")}
        </ul>

        <div class="sheet-contact-secondary">
          <div>Quầy hàng trực tiếp: <strong>${STORE_INFO.addressShort}</strong></div>
          <div style="margin-top: 0.25rem;">Hotline 1 (Chị Hằng): <strong>${STORE_INFO.phoneFormatted}</strong></div>
          <div style="margin-top: 0.15rem;">Hotline 2 (Anh Huy): <strong>${STORE_INFO.phone2Formatted}</strong></div>
          <div style="font-size: 0.75rem; color: #92400E; margin-top: 0.35rem; font-style: italic;">
            * Vui lòng liên hệ số còn lại nếu một trong hai đầu số bận.
          </div>
        </div>
      </div>

      <!-- THANH NÚT BẤM DÍNH CHẶT Ở ĐÁY BOTTOM SHEET - KHÔNG BAO GIỜ BỊ CHE -->
      <div class="sheet-sticky-footer">
        <a href="${STORE_INFO.zaloLink}" target="_blank" rel="noopener noreferrer" class="btn-sheet-zalo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.84 7.08L5 22l4.13-1.35c.92.23 1.89.35 2.87.35 5.52 0 10-4.03 10-9s-4.48-9-10-9z"/></svg>
          <span>Chat Zalo đặt mua</span>
        </a>
        <a href="${STORE_INFO.callLink}" class="btn-sheet-call">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          <span>Gọi đặt ngay</span>
        </a>
      </div>
    `;

    sheetBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  /**
   * Đóng Bottom Sheet
   */
  window.closeBottomSheet = function () {
    if (!sheetBackdrop) return;
    sheetBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (sheetCloseBtn) {
    sheetCloseBtn.addEventListener("click", window.closeBottomSheet);
  }

  if (sheetBackdrop) {
    sheetBackdrop.addEventListener("click", (e) => {
      if (e.target === sheetBackdrop) {
        window.closeBottomSheet();
      }
    });
  }

  // Categories Event
  catPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      catPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.category;
      renderMobileProducts();
    });
  });

  // Search Event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      renderMobileProducts();
    });
  }

  // Khởi tạo
  renderMobileProducts();
});

/**
 * THỊT BÒ CHỊ HẰNG - MAIN SCRIPT
 * JavaScript thuần ES6+, tối ưu hiệu năng, không phụ thuộc thư viện bên ngoài.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const productsGrid = document.getElementById("products-grid");
  const filterPills = document.querySelectorAll(".filter-pill");
  const searchInput = document.getElementById("search-input");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalContainer = document.getElementById("modal-content");

  // State
  let currentCategory = "all";
  let currentSearch = "";

  /**
   * Render danh sách sản phẩm
   */
  function renderProducts() {
    if (!productsGrid) return;

    // Filter by category & search
    const filtered = PRODUCTS_DATA.filter((product) => {
      const matchCategory =
        currentCategory === "all" || product.category === currentCategory;
      const query = currentSearch.trim().toLowerCase();
      const matchSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.spec.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-products">
          <svg class="empty-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <h3 class="empty-title">Không tìm thấy sản phẩm phù hợp</h3>
          <p class="empty-text">Vui lòng thử tìm kiếm với từ khóa khác hoặc bấm xem tất cả sản phẩm.</p>
          <button id="reset-filter-btn" class="btn btn-primary btn-sm">Xem tất cả sản phẩm</button>
        </div>
      `;

      const resetBtn = document.getElementById("reset-filter-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          currentCategory = "all";
          currentSearch = "";
          if (searchInput) searchInput.value = "";
          filterPills.forEach((p) => {
            p.classList.toggle("active", p.dataset.category === "all");
          });
          renderProducts();
        });
      }
      return;
    }

    productsGrid.innerHTML = filtered
      .map((item) => {
        return `
        <article class="product-card" data-id="${item.id}">
          <div class="product-media" onclick="openProductModal('${item.id}')">
            <picture>
              <source srcset="${item.imageWebp}" type="image/webp">
              <img src="${item.imageJpg}" alt="${item.name} - Thịt bò Chị Hằng" loading="lazy" width="400" height="300">
            </picture>
            <span class="badge-origin">${item.origin}</span>
            <div class="quick-view-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              <span>Chi tiết</span>
            </div>
          </div>
          <div class="product-body">
            <div class="product-spec">${item.spec}</div>
            <h3 class="product-name" onclick="openProductModal('${item.id}')" style="cursor: pointer;">${item.name}</h3>
            <div class="product-price-box">
              <span class="price-main">${item.priceFormatted}</span>
              <span class="price-unit">/ ${item.unit}</span>
            </div>
            <p class="product-desc">${item.description}</p>
            <div class="product-actions">
              <a href="${STORE_INFO.zaloLink}" target="_blank" rel="noopener noreferrer" class="btn btn-card-zalo" title="Liên hệ Zalo đặt ${item.name}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.84 7.08L5 22l4.13-1.35c.92.23 1.89.35 2.87.35 5.52 0 10-4.03 10-9s-4.48-9-10-9z"/>
                </svg>
                <span>Đặt Zalo</span>
              </a>
              <a href="${STORE_INFO.callLink}" class="btn btn-card-call" title="Gọi Hotline đặt ${item.name}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>Gọi điện</span>
              </a>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }

  /**
   * Mở Modal xem chi tiết sản phẩm
   */
  window.openProductModal = function (productId) {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!product || !modalContainer || !modalBackdrop) return;

    modalContainer.innerHTML = `
      <div class="modal-body-grid">
        <div class="modal-img-col">
          <picture>
            <source srcset="${product.imageWebp}" type="image/webp">
            <img src="${product.imageJpg}" alt="${product.name} - Thịt bò Chị Hằng" width="600" height="450">
          </picture>
        </div>
        <div class="modal-content-col">
          <div class="modal-origin">${product.origin}</div>
          <h2 class="modal-title">${product.name}</h2>
          <div class="modal-price-box">
            <span class="price-main">${product.priceFormatted}</span>
            <span class="price-unit">/ ${product.unit}</span>
          </div>
          <div class="modal-spec"><strong>Quy cách:</strong> ${product.spec}</div>
          <p class="modal-desc">${product.description}</p>
          <ul class="modal-features">
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
          <div class="modal-actions">
            <a href="${STORE_INFO.zaloLink}" target="_blank" rel="noopener noreferrer" class="btn btn-zalo">
              <svg class="btn-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.84 7.08L5 22l4.13-1.35c.92.23 1.89.35 2.87.35 5.52 0 10-4.03 10-9s-4.48-9-10-9z"/></svg>
              <span>Liên hệ Zalo đặt ${product.name}</span>
            </a>
            <a href="${STORE_INFO.callLink}" class="btn btn-hotline">
              <svg class="btn-icon" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              <span>Gọi hotline: ${STORE_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>
    `;

    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  /**
   * Đóng Modal
   */
  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Filter Pills Event
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.category;
      renderProducts();
    });
  });

  // Search Input Event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      renderProducts();
    });
  }

  // Mobile Menu Toggle
  if (menuToggle && mobileNavDrawer) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNavDrawer.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Đóng drawer khi click link bên trong
    mobileNavDrawer.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNavDrawer.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Khởi tạo hiển thị ban đầu
  renderProducts();
});

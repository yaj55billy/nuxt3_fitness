# Fitspace 健身空間作品 復刻

此作品原先是跟著六角學院的 Vue 直播班所做（2020），那時採取 Vue2 串接課程所提供的前後台 API；此次使用 Nuxt3 + Composition api 來做復刻。

[原先 Vue2 版本連結](https://www.billyji.com/vue_fitness/#/)

[Nuxt3 復刻連結](https://nuxt3-fitness.vercel.app/)

## Folder List

以下條列專案開發的資料夾跟檔案內容：
- assets：Scss 檔案放置處，客製樣式加上引入 Bootstrap5
- components：
  - Footer.vue：前台所用 Footer 元件
  - Navbar.vue：前台所用 Navbar 元件
  - LoadingAdmin.vue：後台畫面 Loading 所使用元件
  - LoadingCustom.vue：前台畫面 Loading 所使用元件
  - PageBanner.vue：前台 Banner 元件
  - Pagination.vue：頁碼元件，主要為後台所用
  - Toast.vue：整個網站使用，為使用者操作的回饋訊息
- composables：
  - useAdminCoupons.js：後台優惠券頁面所用邏輯，包含優惠券相關狀態，以及優惠券的讀取、編輯、刪除等功能
  - useAdminOrder.js：後台訂單頁面所用邏輯，包含訂單相關狀態，以及訂單的讀取、編輯
  - useAdminProducts.js：後台產品頁面所用邏輯，包含產品相關狀態，以及產品的讀取、編輯、刪除，跟上傳圖片的功能
  - useAdminStorages.js：後台圖片列表頁所用邏輯，包括圖片相關狀態，以及圖片的讀取跟刪除功能
  - useApiPath.js：整個網站的 API 路徑定義處
  - useOrder.js：前台訂單的所用邏輯，包括狀態以及訂單的讀取、創建、付款等功能
  - useUser.js：登入、登出、驗證等相關功能
- layouts
  - default.vue：前台預設樣板
- pages
  - admin
    - coupons.vue：後台優惠券列表頁面
    - order.vue：後台訂單列表頁面
    - products.vue：後台產品列表頁面
    - storages.vue：後台圖片列表頁面
  - checkout/[id].vue：前台付款頁面（動態路由）
  - complete/[id].vue：前台付款完成頁面（動態路由）
  - product/[id].vue：前台課程細節頁面（動態路由）
  - [...slug].vue：404頁面定義
  - about.vue：前台關於我們頁面
  - admin.vue：後台進入點頁面，會先經過驗證
  - cart.vue：前台購物車頁面
  - contact.vue：前台聯絡我們頁面
  - index.vue：前台首頁
  - login.vue：登入頁面
  - products.vue：前台課程列表頁面
  - qa.vue：前台常見問題頁面
- plugins
  - useBootstrap.client.js：將 Bootstrap 的 js 註冊到 Nuxt 
  - useToThousands.js：自定義千位分隔符 directive
  - useVeeValidateRules.client.js：vee-validate 套件的規則 config 定義
- stores
  - useCart.js：購物車狀態，以及購物車的讀取、新增、編輯、刪除等功能
  - useStatus.js：網站全局的 isLoading 狀態
  - useToast.js：toast 狀態以及顯示功能




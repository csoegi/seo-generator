import { SeoFormState } from "@/store/use-seo-form-store";

type MetaTagsProps = Omit<
  SeoFormState,
  "setSiteName" | "setTitle" | "setDescription" | "setIconImageFile" | "setLogoImageFile" | "setImageFile" | "setUrl" | "setAmpUrl" | "setRegisterUrl" | "setLoginUrl" | "getIsFormComplete"
>;
export function getMetaTagsCode(props: MetaTagsProps) {
  const vercelBlobBaseUrl = `${process.env.NEXT_PUBLIC_BLOB_BASE_URL}`;

  const defaultIconUrl = `${vercelBlobBaseUrl + process.env.NEXT_PUBLIC_DEFAULT_ICON}`;
  const defaultLogoUrl = `${vercelBlobBaseUrl + process.env.NEXT_PUBLIC_DEFAULT_LOGO}`;
  const defaultBannerUrl = `${vercelBlobBaseUrl + process.env.NEXT_PUBLIC_DEFAULT_BANNER}`;

  const iconImageUrl = `${props.iconImageFile ? props.iconImageFile.preview : defaultIconUrl}`;
  const logoImageUrl = `${props.logoImageFile ? props.logoImageFile.preview : defaultLogoUrl}`;
  const bannerImageUrl = `${props.imageFile ? props.imageFile.preview : defaultBannerUrl}`;
  
  return `
    <!DOCTYPE html>
    <html lang="en-US">
    <head>
        <!-- Charset & Viewport -->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <!-- Primary Meta Tags -->
        <title>${props.title}</title>
        <meta name="title" content="${props.title}" />
        <meta name="description" content="${props.description}" />

        <!-- Canonical -->
        ${props.url ? `<link rel="canonical" href="${props.url}" />` : ""}
        ${props.ampUrl ? `<link rel="amphtml" href="${props.ampUrl}" />` :"" }

        <!-- Robots -->
        <meta name="robots" content="index, follow" />

        <!-- Theme color -->
        <meta name="theme-color" content="#ffffff" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        ${props.url ? `<meta property="og:url" content="${props.url}" />` : ""}
        <meta property="og:title" content="${props.title}" />
        <meta property="og:description" content="${props.description}" />
        <meta property="og:image" content="${bannerImageUrl}" />
        <meta property="og:image:alt" content="${props.title}" />
        <meta property="og:site_name" content="${props.siteName}" />

        <!-- X (Twitter) -->
        <meta name="twitter:card" content="summary_large_image" />
        ${props.url ? `<meta name="twitter:url" content="${props.url}" />` : ""}
        <meta name="twitter:title" content="${props.title}" />
        <meta name="twitter:description" content="${props.description}" />
        <meta name="twitter:image" content="${bannerImageUrl}" />
        <meta name="twitter:image:alt" content="${props.title}" />

        <!-- Schema.org -->
        <meta itemprop="name" content="${props.title}" />
        <meta itemprop="url" content="${props.url}" />
        <meta itemprop="description" content="${props.description}" />
        <meta itemprop="thumbnailUrl" content="${bannerImageUrl}" />
        <link rel="image_src" href="${bannerImageUrl}" />
        <meta itemprop="image" content="${bannerImageUrl}" />
        
        <!-- Icon -->
        <link rel="icon" type="image/x-icon" href="${iconImageUrl}" />

        <!-- Language -->
        <meta http-equiv="content-language" content="en" />
                        
        <link id="showcase-cta" rel="stylesheet" type="text/css" media="all" href="${vercelBlobBaseUrl}/assets/css/style-main.css">
        <link id="showcase-cta-google-fonts" rel="stylesheet" type="text/css" media="all" href="${vercelBlobBaseUrl}/assets/css/css">
        <link rel="stylesheet" id="astra-theme-css-css" href="${vercelBlobBaseUrl}/assets/css/main.min.css" media="all">
        <link rel="stylesheet" id="astra-theme-css-inlinecss" href="${vercelBlobBaseUrl}/assets/css/astra-theme-inline.css">
        <link rel="stylesheet" id="hfe-widgets-style-css" href="${vercelBlobBaseUrl}/assets/css/frontend.css" media="all">
        <link rel="stylesheet" id="wp-block-library-css" href="${vercelBlobBaseUrl}/assets/css/style.min.css" media="all">
        <link rel="stylesheet" id="photoswipe-css" href="${vercelBlobBaseUrl}/assets/css/photoswipe.min.css" media="all">
        <link rel="stylesheet" id="photoswipe-default-skin-css" href="${vercelBlobBaseUrl}/assets/css/default-skin.min.css" media="all">
        <link rel="stylesheet" id="woocommerce-layout-css" href="${vercelBlobBaseUrl}/assets/css/woocommerce-layout-grid.min.css" media="all">
        <link rel="stylesheet" id="woocommerce-smallscreen-css" href="${vercelBlobBaseUrl}/assets/css/woocommerce-smallscreen-grid.min.css" media="only screen and (max-width: 921px)">
        <link rel="stylesheet" id="woocommerce-general-css" href="${vercelBlobBaseUrl}/assets/css/woocommerce-grid.min.css" media="all">
        <link rel="stylesheet" id="sticky-add-to-cart-css" href="${vercelBlobBaseUrl}/assets/css/sticky-add-to-cart.min.css" media="all">
        <link rel="stylesheet" id="hfe-style-css" href="${vercelBlobBaseUrl}/assets/css/header-footer-elementor.css" media="all">
        <link rel="stylesheet" id="elementor-frontend-css" href="${vercelBlobBaseUrl}/assets/css/frontend.min.css" media="all">
        <link rel="stylesheet" id="elementor-post-4-css" href="${vercelBlobBaseUrl}/assets/css/post-4.css" media="all">
        <link rel="stylesheet" id="moderncart-cart-css-css" href="${vercelBlobBaseUrl}/assets/css/cart.css" media="all">
        <link rel="stylesheet" id="dashicons-css" href="${vercelBlobBaseUrl}/assets/css/dashicons.min.css" media="all">
        <link rel="stylesheet" id="cfvsw_swatches_product-css" href="${vercelBlobBaseUrl}/assets/css/swatches.css" media="all">
        <link id="google-fonts-domain" rel="preconnect" href="https://fonts.gstatic.com/">
        <link id="google-fonts-url" rel="stylesheet" href="${vercelBlobBaseUrl}/assets/css/css2">

        <!-- Redirect to mobile page -->
        <script type="text/javascript">
            (function() {
                var mobile_url = '${props.ampUrl}'; 
                var userAgent = navigator.userAgent || navigator.vendor || window.opera;

                // Check for common mobile keywords (iOS, Android, BlackBerry, etc.)
                if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|operamini/i.test(userAgent)) {
                // Check that the user is not already on the mobile site to prevent redirect loops
                if (window.location.href.indexOf(mobile_url) === -1) {
                    window.location.href = mobile_url;
                    }
                }
            })();
        </script>
    </head>

    <body class="wp-singular product-template-default single single-product postid-187 wp-custom-logo wp-embed-responsive wp-theme-astra theme-astra woocommerce woocommerce-page woocommerce-demo-store woocommerce-js ehf-template-astra ehf-stylesheet-astra cfvsw-label-none cfvsw-product-page ast-desktop ast-plain-container ast-no-sidebar astra-4.11.13 ast-blog-single-style-1 ast-custom-post-type ast-single-post ast-inherit-site-logo-transparent ast-hfb-header ast-normal-title-enabled elementor-default elementor-kit-4"
    style="">
        <div class="hfeed site" id="page">
            <header class="site-header header-main-layout-1 ast-primary-menu-enabled ast-logo-title-inline ast-hide-custom-menu-mobile ast-builder-menu-toggle-icon ast-mobile-header-inline" id="masthead" itemtype="https://schema.org/WPHeader" itemscope="itemscope"
            itemid="#masthead">
                <div id="ast-desktop-header" data-toggle-type="off-canvas">
                    <div class="ast-main-header-wrap main-header-bar-wrap ">
                        <div class="ast-primary-header-bar ast-primary-header main-header-bar site-header-focus-item" data-section="section-primary-header-builder">
                            <div class="site-primary-header-wrap ast-builder-grid-row-container site-header-focus-item ast-container" data-section="section-primary-header-builder">
                                <div class="ast-builder-grid-row ast-builder-grid-row-has-sides ast-grid-center-col-layout">
                                    <div class="site-header-primary-section-left site-header-section ast-flex site-header-section-left">
                                        <div class="ast-builder-menu-1 ast-builder-menu ast-flex ast-builder-menu-1-focus-item ast-builder-layout-element site-header-focus-item" data-section="section-hb-menu-1">
                                            <div class="ast-main-header-bar-alignment">
                                                <div class="main-header-bar-navigation">
                                                    <nav class="site-navigation ast-flex-grow-1 navigation-accessibility site-header-focus-item" id="primary-site-navigation-desktop" aria-label="Primary Site Navigation" itemtype="https://schema.org/SiteNavigationElement" itemscope="itemscope">
                                                        <div class="main-navigation ast-inline-flex">
                                                            <ul id="ast-hf-menu-1" class="main-header-menu ast-menu-shadow ast-nav-menu ast-flex  submenu-with-border stack-on-mobile">
                                                                <li id="menu-item-22" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-22"><a href="#" class="menu-link">${props.siteName}</a></li>
                                                                <li id="menu-item-23" class="menu-item menu-item-type-post_type menu-item-object-page current_page_parent menu-item-23"><a href="#" class="menu-link">${props.siteName} Daftar</a></li>
                                                                <li id="menu-item-21" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-21"><a href="#" class="menu-link">${props.siteName} Login</a></li>
                                                            </ul>
                                                        </div>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="site-header-primary-section-left-center site-header-section ast-flex ast-grid-left-center-section">
                                        </div>
                                    </div>
                                    <div class="site-header-primary-section-center site-header-section ast-flex ast-grid-section-center">
                                        <div class="ast-builder-layout-element ast-flex site-header-focus-item" data-section="title_tagline">
                                            <div class="site-branding ast-site-identity" itemtype="https://schema.org/Organization" itemscope="itemscope">
                                                <span>
                                                    <a href="#" rel="home">
                                                        <img width="200" height="60" src="${logoImageUrl}" alt="[SITE_NAME]" decoding="async">
                                                    </a>
                                                </span>	
                                            </div>
                                            <!-- .site-branding -->
                                        </div>
                                    </div>
                                    <div class="site-header-primary-section-right site-header-section ast-flex ast-grid-right-section">
                                        <div class="site-header-primary-section-right-center site-header-section ast-flex ast-grid-right-center-section">
                                        </div>
                                        <div class="ast-builder-layout-element ast-flex site-header-focus-item ast-header-search" data-section="section-header-search">
                                            <div class="ast-search-menu-icon slide-search">
                                                <form role="search" method="get" class="search-form" action="#">
                                                    <label for="search-field">
                                                        <span class="screen-reader-text">Search for:</span>
                                                        <input type="search" id="search-field" class="search-field" placeholder="Search..." value="" name="s" tabindex="-1">
                                                        <button class="search-submit ast-search-submit" aria-label="Search Submit">
                                                            <span hidden="">Search</span>
                                                            <i>
                                                    <span class="ast-icon icon-search">
                                                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-893 477 142 142" enable-background="new -888 480 142 142" xml:space="preserve">
                                                          <path d="M-787.4,568.7h-6.3l-2.4-2.4c7.9-8.7,12.6-20.5,12.6-33.1c0-28.4-22.9-51.3-51.3-51.3  c-28.4,0-51.3,22.9-51.3,51.3c0,28.4,22.9,51.3,51.3,51.3c12.6,0,24.4-4.7,33.1-12.6l2.4,2.4v6.3l39.4,39.4l11.8-11.8L-787.4,568.7  L-787.4,568.7z M-834.7,568.7c-19.7,0-35.5-15.8-35.5-35.5c0-19.7,15.8-35.5,35.5-35.5c19.7,0,35.5,15.8,35.5,35.5  C-799.3,553-815,568.7-834.7,568.7L-834.7,568.7z"></path>
                                                      </svg>
                                                    </span>
                                                </i>
                                                        </button>
                                                    </label>
                                                </form>
                                                <div class="ast-search-icon">
                                                    <a class="slide-search astra-search-icon" role="button" tabindex="0" aria-label="Search button" href="#?customize=template#">
                                                        <span class="screen-reader-text">Search</span>
                                                        <span class="ast-icon icon-search">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-893 477 142 142" enable-background="new -888 480 142 142" xml:space="preserve">
                                                    <path d="M-787.4,568.7h-6.3l-2.4-2.4c7.9-8.7,12.6-20.5,12.6-33.1c0-28.4-22.9-51.3-51.3-51.3  c-28.4,0-51.3,22.9-51.3,51.3c0,28.4,22.9,51.3,51.3,51.3c12.6,0,24.4-4.7,33.1-12.6l2.4,2.4v6.3l39.4,39.4l11.8-11.8L-787.4,568.7  L-787.4,568.7z M-834.7,568.7c-19.7,0-35.5-15.8-35.5-35.5c0-19.7,15.8-35.5,35.5-35.5c19.7,0,35.5,15.8,35.5,35.5  C-799.3,553-815,568.7-834.7,568.7L-834.7,568.7z"></path>
                                                </svg>
                                              </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ast-builder-layout-element site-header-focus-item ast-header-woo-cart" data-section="section-header-woo-cart">
                                            <div class="ast-site-header-cart ast-menu-cart-with-border  modern-cart-for-wc-available ast-menu-cart-outline">
                                                <div class="ast-site-header-cart-li ">
                                                    <a href="#cart/" class="cart-container ast-cart-desktop-position- ast-cart-mobile-position- ast-cart-tablet-position-" aria-label="View Shopping Cart, empty">
                                                        <div class="ast-addon-cart-wrap ast-desktop-cart-position- ast-cart-mobile-position- ast-cart-tablet-position- ">
                                                            <i class="astra-icon ast-icon-shopping-bag " data-cart-total="0">
                                                    <span class="ast-icon icon-bag">
                                                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="ast-bag-icon-svg" x="0px" y="0px" width="100" height="100" viewBox="826 826 140 140" enable-background="new 826 826 140 140" xml:space="preserve">
                                                          <path d="M960.758,934.509l2.632,23.541c0.15,1.403-0.25,2.657-1.203,3.761c-0.953,1.053-2.156,1.579-3.61,1.579H833.424  c-1.454,0-2.657-0.526-3.61-1.579c-0.952-1.104-1.354-2.357-1.203-3.761l2.632-23.541H960.758z M953.763,871.405l6.468,58.29H831.77  l6.468-58.29c0.15-1.203,0.677-2.218,1.58-3.045c0.903-0.827,1.981-1.241,3.234-1.241h19.254v9.627c0,2.658,0.94,4.927,2.82,6.807  s4.149,2.82,6.807,2.82c2.658,0,4.926-0.94,6.807-2.82s2.821-4.149,2.821-6.807v-9.627h28.882v9.627  c0,2.658,0.939,4.927,2.819,6.807c1.881,1.88,4.149,2.82,6.807,2.82s4.927-0.94,6.808-2.82c1.879-1.88,2.82-4.149,2.82-6.807v-9.627  h19.253c1.255,0,2.332,0.414,3.235,1.241C953.086,869.187,953.612,870.202,953.763,871.405z M924.881,857.492v19.254  c0,1.304-0.476,2.432-1.429,3.385s-2.08,1.429-3.385,1.429c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.43-2.081-1.43-3.385  v-19.254c0-5.315-1.881-9.853-5.641-13.613c-3.76-3.761-8.298-5.641-13.613-5.641s-9.853,1.88-13.613,5.641  c-3.761,3.76-5.641,8.298-5.641,13.613v19.254c0,1.304-0.476,2.432-1.429,3.385c-0.953,0.953-2.081,1.429-3.385,1.429  c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.429-2.081-1.429-3.385v-19.254c0-7.973,2.821-14.779,8.461-20.42  c5.641-5.641,12.448-8.461,20.42-8.461c7.973,0,14.779,2.82,20.42,8.461C922.062,842.712,924.881,849.519,924.881,857.492z"></path>
                                                      </svg>
                                                    </span>
                                                </i>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="ast-site-header-cart-data"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Main Header Bar Wrap -->
                <div id="ast-mobile-header" class="ast-mobile-header-wrap " data-type="off-canvas">
                    <div class="ast-main-header-wrap main-header-bar-wrap">
                        <div class="ast-primary-header-bar ast-primary-header main-header-bar site-primary-header-wrap site-header-focus-item ast-builder-grid-row-layout-default ast-builder-grid-row-tablet-layout-default ast-builder-grid-row-mobile-layout-default" data-section="section-primary-header-builder">
                            <div class="ast-builder-grid-row ast-builder-grid-row-has-sides ast-grid-center-col-layout">
                                <div class="site-header-primary-section-left site-header-section ast-flex site-header-section-left">
                                </div>
                                <div class="site-header-primary-section-center site-header-section ast-flex ast-grid-section-center">
                                    <div class="ast-builder-layout-element ast-flex site-header-focus-item" data-section="title_tagline">
                                        <div class="site-branding ast-site-identity" itemtype="https://schema.org/Organization" itemscope="itemscope">
                                            <span class="site-logo-img"><a href="#" class="custom-logo-link" rel="home"><img width="96" height="50" src="${vercelBlobBaseUrl}/assets/css/logo-01.svg" class="custom-logo" alt="${props.siteName}" decoding="async"></a></span>
                                        </div>
                                        <!-- .site-branding -->
                                    </div>
                                </div>
                                <div class="site-header-primary-section-right site-header-section ast-flex ast-grid-right-section">
                                    <div class="ast-builder-layout-element ast-flex site-header-focus-item" data-section="section-header-mobile-trigger">
                                        <div class="ast-button-wrap">
                                            <button type="button" class="menu-toggle main-header-menu-toggle ast-mobile-menu-trigger-outline" aria-expanded="false" aria-label="Main menu toggle" data-index="0">
                                                <span class="screen-reader-text">Main Menu</span>
                                                <span class="mobile-menu-toggle-icon">
                                          <span aria-hidden="true" class="ahfb-svg-iconset ast-inline-flex svg-baseline">
                                              <svg class="ast-mobile-svg ast-menu-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
                                              </svg>
                                          </span>
                                                <span aria-hidden="true" class="ahfb-svg-iconset ast-inline-flex svg-baseline">
                                              <svg class="ast-mobile-svg ast-close-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
                                              </svg>
                                          </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <!-- #masthead -->
            <div id="content" class="site-content">
                <div class="ast-container">
                    <div id="primary" class="content-area primary">
                        <main id="main" class="site-main">
                            <div class="ast-woocommerce-container">
                                <div class="woocommerce-notices-wrapper"></div>
                                <div id="product-187" class="ast-article-single ast-woo-product-no-review desktop-align-center tablet-align-center mobile-align-center product type-product post-187 status-publish first instock product_cat-evening-dresses has-post-thumbnail featured shipping-taxable purchasable product-type-variable has-default-attributes">
                                    <div class="woocommerce-product-gallery woocommerce-product-gallery--with-images woocommerce-product-gallery--columns-4 images" data-columns="4" style="opacity: 1; transition: opacity 0.25s ease-in-out;">
                                        <a href="#?customize=template#" role="button" class="woocommerce-product-gallery__trigger" aria-haspopup="dialog" aria-controls="photoswipe-fullscreen-dialog" aria-label="View full-screen image gallery"><span aria-hidden="true">🔍</span></a>
                                        <div class="woocommerce-product-gallery__wrapper">
                                            <div data-thumb="${bannerImageUrl}" data-thumb-alt="${props.siteName}" data-thumb-srcset="${bannerImageUrl} 100w, 
                                            ${bannerImageUrl} 150w" data-thumb-sizes="(max-width: 100px) 100vw, 100px" class="woocommerce-product-gallery__image" data-o_data-thumb="${bannerImageUrl}"
                                            style="position: relative; overflow: hidden;">
                                                <a href="${bannerImageUrl}" data-o_href="${bannerImageUrl}">
                                                    <img fetchpriority="high" width="600" height="731" src="${bannerImageUrl}" class="wp-post-image" alt="img-05-a-white" data-caption="" data-src="${bannerImageUrl}"
                                                    data-large_image="${bannerImageUrl}" data-large_image_width="960" data-large_image_height="1170" decoding="async" srcset="${bannerImageUrl} 600w, 
                                                    ${bannerImageUrl} 246w, 
                                                    ${bannerImageUrl} 840w, 
                                                    ${bannerImageUrl} 768w, 
                                                    ${bannerImageUrl} 300w, 
                                                    ${bannerImageUrl} 400w, 
                                                    ${bannerImageUrl} 960w" sizes="(max-width: 600px) 100vw, 600px" data-o_src="${bannerImageUrl}"
                                                                data-o_height="731" data-o_width="600" data-o_srcset="${bannerImageUrl} 600w, 
                                                    ${bannerImageUrl} 246w, 
                                                    ${bannerImageUrl} 840w, 
                                                    ${bannerImageUrl} 768w, 
                                                    ${bannerImageUrl} 300w, 
                                                    ${bannerImageUrl} 400w, 
                                                    ${bannerImageUrl} 960w" data-o_sizes="(max-width: 600px) 100vw, 600px" data-o_title="" title="img-05-a-white" data-o_data-caption="" data-o_alt="${props.siteName}"
                                                    data-o_data-src="${bannerImageUrl}" data-o_data-large_image="${bannerImageUrl}"
                                                    data-o_data-large_image_width="960" data-o_data-large_image_height="1170"></a>
                                                <img alt="${props.siteName}" src="${bannerImageUrl}" class="zoomImg" style="position: absolute; top: -259.2px; left: -323.1px; opacity: 0; width: 960px; height: 1170px; border: none; max-width: none; max-height: none;"
                                                aria-hidden="true"></div>
                                        </div>
                                    </div>
                                    <div class="summary entry-summary">
                                        <nav class="woocommerce-breadcrumb" aria-label="Breadcrumb">
                                            <a href="#">${props.siteName}</a>&nbsp;/&nbsp;
                                            <a href="#">${props.siteName} Daftar</a>&nbsp;/&nbsp; ${props.siteName} Login</nav>
                                        <span class="single-product-category"><a href="#" rel="tag">${props.siteName}</a></span>
                                        <h1 class="product_title entry-title">${props.title}</h1>
                                        <p class="price"><span class="woocommerce-Price-amount amount" aria-hidden="true"><bdi><span class="woocommerce-Price-currencySymbol">$</span>175.00</bdi>
                                            </span> <span aria-hidden="true">–</span> <span class="woocommerce-Price-amount amount" aria-hidden="true"><bdi><span class="woocommerce-Price-currencySymbol">$</span>185.00</bdi>
                                            </span><span class="screen-reader-text">Price range: $175.00 through $185.00</span></p>
                                        <span class="ast-shipping-text">&amp; Free Shipping</span>
                                        <div class="woocommerce-product-details__short-description">
                                            <p>${props.description}</p>
                                        </div>
                                        <form class="variations_form cart" action="#" method="post" enctype="multipart/form-data" current-image="490">
                                            <table class="variations cfvsw-variation-disable-logic" cellspacing="0" role="presentation">
                                                <tbody>
                                                    <tr>
                                                        <th class="label">
                                                            <label for="pa_size">Size<span class="cfvsw-selected-label">M</span></label>
                                                        </th>
                                                        <td class="value">
                                                            <div class="cfvsw-hidden-select">
                                                                <select id="pa_size" class="" name="attribute_pa_size" data-attribute_name="attribute_pa_size" data-show_option_none="yes">
                                                                    <option value="">Choose an option</option>
                                                                    <option value="l" class="attached enabled">L</option>
                                                                    <option value="m" selected="selected" class="attached enabled">M</option>
                                                                    <option value="s" class="attached enabled">S</option>
                                                                    <option value="xs" class="attached enabled">XS</option>
                                                                </select>
                                                            </div>
                                                            <div class="cfvsw-swatches-container cfvsw-product-container" swatches-attr="attribute_pa_size">
                                                                <div class="cfvsw-swatches-option cfvsw-label-option" data-slug="l" data-title="L" style="min-width:24px;min-height:24px;border-radius:3px;">
                                                                    <div class="cfvsw-swatch-inner">L</div>
                                                                </div>
                                                                <div class="cfvsw-swatches-option cfvsw-label-option cfvsw-selected-swatch" data-slug="m" data-title="M" style="min-width:24px;min-height:24px;border-radius:3px;">
                                                                    <div class="cfvsw-swatch-inner">M</div>
                                                                </div>
                                                                <div class="cfvsw-swatches-option cfvsw-label-option" data-slug="s" data-title="S" style="min-width:24px;min-height:24px;border-radius:3px;">
                                                                    <div class="cfvsw-swatch-inner">S</div>
                                                                </div>
                                                                <div class="cfvsw-swatches-option cfvsw-label-option" data-slug="xs" data-title="XS" style="min-width:24px;min-height:24px;border-radius:3px;">
                                                                    <div class="cfvsw-swatch-inner">XS</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th class="label">
                                                            <label for="pa_color">Color<span class="cfvsw-selected-label">White</span></label>
                                                        </th>
                                                        <td class="value disable-to-select">
                                                            <div class="cfvsw-hidden-select">
                                                                <select id="pa_color" class="" name="attribute_pa_color" data-attribute_name="attribute_pa_color" data-show_option_none="yes">
                                                                    <option value="">Choose an option</option>
                                                                    <option value="black" class="attached enabled">Black</option>
                                                                    <option value="green" class="attached enabled">Green</option>
                                                                    <option value="red" class="attached enabled">Red</option>
                                                                    <option value="white" selected="selected" class="attached enabled">White</option>
                                                                </select>
                                                            </div>
                                                            <div class="cfvsw-swatches-container cfvsw-product-container" swatches-attr="attribute_pa_color">
                                                                <div class="cfvsw-swatches-option" data-slug="black" data-title="Black" data-tooltip="Black" style="min-width:24px;min-height:24px;border-radius:100%;">
                                                                    <div class="cfvsw-swatch-inner" style="background-color:#000000;"></div>
                                                                </div>
                                                                <div class="cfvsw-swatches-option" data-slug="green" data-title="Green" data-tooltip="Green" style="min-width:24px;min-height:24px;border-radius:100%;">
                                                                    <div class="cfvsw-swatch-inner" style="background-color:#01a367;"></div>
                                                                </div>
                                                                <div class="cfvsw-swatches-option" data-slug="red" data-title="Red" data-tooltip="Red" style="min-width:24px;min-height:24px;border-radius:100%;">
                                                                    <div class="cfvsw-swatch-inner" style="background-color:#dd3333;"></div>
                                                                </div>
                                                                <div class="cfvsw-swatches-option cfvsw-selected-swatch" data-slug="white" data-title="White" data-tooltip="White" style="min-width:24px;min-height:24px;border-radius:100%;">
                                                                    <div class="cfvsw-swatch-inner" style="background-color:#ffffff;"></div>
                                                                </div>
                                                            </div>
                                                            <a class="reset_variations" href="#?customize=template#" aria-label="Clear options" style="visibility: visible;">Clear</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="reset_variations_alert screen-reader-text" role="alert" aria-live="polite" aria-relevant="all"></div>
                                            <div class="single_variation_wrap">
                                                <div class="woocommerce-variation single_variation" role="alert" aria-relevant="additions">
                                                    <div class="woocommerce-variation-description"></div>
                                                    <div class="woocommerce-variation-price"><span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>175.00</bdi>
                                                        </span>
                                                        </span>
                                                    </div>
                                                    <div class="woocommerce-variation-availability"></div>
                                                </div>
                                                <div class="woocommerce-variation-add-to-cart variations_button woocommerce-variation-add-to-cart-enabled">
                                                    <div class="quantity buttons_added"><span class="screen-reader-text">Minus Quantity</span><a href="javascript:void(0)" id="minus_qty-0" class="minus ">-</a>
                                                        <label class="screen-reader-text" for="quantity_69419779849ba">${props.siteName}</label>
                                                        <input type="number" id="quantity_69419779849ba" class="input-text qty text" name="quantity" value="1" aria-label="Product quantity" min="1" step="1" placeholder="" inputmode="numeric" autocomplete="off" max="">
                                                        <span class="screen-reader-text">Plus Quantity</span><a href="javascript:void(0)" id="plus_qty-0" class="plus ">+</a>
                                                    </div>
                                                    <a href="${props.registerUrl}" class="button" style="background: linear-gradient(to bottom, #ff00e6 0, #ff00e6 100%);margin-right: 1em;" rel="nofollow noreferrer">Daftar</a>
                                                    <a href="${props.loginUrl}" class="button" style="background: linear-gradient(to bottom, #ff00e6 0, #ff00e6 100%);" rel="nofollow noreferrer">Login</a>
                                                    <input type="hidden" name="customize" value="template">
                                                    <input type="hidden" name="add-to-cart" value="187">
                                                    <input type="hidden" name="product_id" value="187">
                                                    <input type="hidden" name="variation_id" class="variation_id" value="188">
                                                </div>
                                            </div>
                                        </form>
                                        <div class="product_meta">
                                            <span class="sku_wrapper">SKU: <span class="sku">N/A</span></span>
                                            <span class="posted_in">Category: <a href="#" rel="tag">${props.siteName}</a></span>
                                        </div>
                                        <fieldset class="ast-single-product-payments ast-inherit-color-version">
                                            <legend>Guaranteed Safe Checkout</legend>
                                            <ul>
                                                <li class="ast-custom-payment">
                                                    <span aria-hidden="true" class="ahfb-svg-iconset ast-inline-flex">
                                              <svg width="100%" height="100%" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                                                <g>
                                                    <path d="M750,40c0,-22.077 -17.923,-40 -40,-40l-670,0c-22.077,0 -40,17.923 -40,40l0,391c0,22.077 17.923,40 40,40l670,0c22.077,0 40,-17.923 40,-40l0,-391Z" style="fill:rgb(14,69,149);"></path>
                                                    <path d="M278.197,334.228l33.361,-195.763l53.36,0l-33.385,195.763l-53.336,0Zm246.11,-191.54c-10.572,-3.966 -27.136,-8.222 -47.822,-8.222c-52.725,0 -89.865,26.55 -90.18,64.603c-0.298,28.13 26.513,43.822 46.753,53.186c20.77,9.594 27.752,15.714 27.654,24.283c-0.132,13.121 -16.587,19.116 -31.923,19.116c-21.357,0 -32.703,-2.966 -50.226,-10.276l-6.876,-3.111l-7.49,43.824c12.464,5.464 35.51,10.198 59.438,10.443c56.09,0 92.501,-26.246 92.916,-66.882c0.2,-22.268 -14.016,-39.216 -44.8,-53.188c-18.65,-9.055 -30.072,-15.099 -29.951,-24.268c0,-8.137 9.667,-16.839 30.556,-16.839c17.45,-0.27 30.089,3.535 39.937,7.5l4.781,2.26l7.234,-42.43m137.307,-4.222l-41.231,0c-12.774,0 -22.332,3.487 -27.942,16.234l-79.245,179.404l56.032,0c0,0 9.161,-24.123 11.233,-29.418c6.124,0 60.554,0.084 68.337,0.084c1.596,6.853 6.491,29.334 6.491,29.334l49.513,0l-43.188,-195.638Zm-65.418,126.407c4.413,-11.279 21.26,-54.723 21.26,-54.723c-0.316,0.522 4.38,-11.334 7.075,-18.684l3.606,16.879c0,0 10.217,46.728 12.352,56.528l-44.293,0Zm-363.293,-126.406l-52.24,133.496l-5.567,-27.13c-9.725,-31.273 -40.025,-65.155 -73.898,-82.118l47.766,171.203l56.456,-0.065l84.004,-195.386l-56.521,0Z" style="fill:white;"></path>
                                                    <path d="M131.92,138.465l-86.041,0l-0.681,4.073c66.938,16.204 111.231,55.363 129.618,102.414l-18.71,-89.96c-3.23,-12.395 -12.597,-16.094 -24.186,-16.526" style="fill:rgb(242,174,20);"></path>
                                                </g>
                                              </svg>
                                          </span>
                                                </li>
                                                <li class="ast-custom-payment">
                                                    <span aria-hidden="true" class="ahfb-svg-iconset ast-inline-flex">
                                              <svg width="100%" height="100%" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                                                <g>
                                                    <path d="M750,40c0,-22.077 -17.923,-40 -40,-40l-670,0c-22.077,0 -40,17.923 -40,40l0,391c0,22.077 17.923,40 40,40l670,0c22.077,0 40,-17.923 40,-40l0,-391Z" style="fill:rgb(244,244,244);"></path>
                                                    <path d="M618.579,422.143c-1.213,0.03 -2.213,0.432 -2.998,1.207c-0.785,0.776 -1.192,1.746 -1.22,2.911c0.028,1.157 0.435,2.125 1.22,2.904c0.785,0.78 1.785,1.184 2.998,1.215c1.185,-0.03 2.171,-0.436 2.96,-1.215c0.787,-0.78 1.196,-1.747 1.226,-2.904c-0.03,-1.165 -0.437,-2.135 -1.223,-2.91c-0.786,-0.776 -1.774,-1.179 -2.963,-1.208Zm0,7.329c-0.925,-0.023 -1.687,-0.336 -2.287,-0.94c-0.6,-0.602 -0.91,-1.36 -0.932,-2.27c0.021,-0.916 0.332,-1.672 0.932,-2.27c0.6,-0.599 1.362,-0.909 2.287,-0.93c0.904,0.021 1.655,0.331 2.25,0.93c0.596,0.598 0.905,1.354 0.927,2.27c-0.022,0.91 -0.33,1.668 -0.926,2.27c-0.596,0.604 -1.347,0.917 -2.251,0.94Zm0.242,-5.139l-1.766,0l0,3.826l0.817,0l0,-1.433l0.374,0l1.16,1.433l0.978,0l-1.25,-1.443c0.39,-0.05 0.69,-0.176 0.901,-0.38c0.21,-0.204 0.317,-0.465 0.32,-0.781c-0.004,-0.378 -0.137,-0.675 -0.4,-0.891c-0.264,-0.216 -0.642,-0.326 -1.134,-0.33l0,-0.001Zm-0.01,0.717c0.219,0 0.39,0.043 0.515,0.127c0.124,0.084 0.197,0.228 0.19,0.378c0.007,0.153 -0.065,0.298 -0.19,0.386c-0.124,0.086 -0.296,0.129 -0.515,0.129l-0.939,0l0,-1.02l0.939,0Zm-458.605,2.703l-8.755,0l0,-40.883l8.584,0l0,4.982c0,0 7.539,-6.089 12.017,-6.013c8.706,0.148 13.905,7.559 13.905,7.559c0,0 4.217,-7.559 13.733,-7.559c14.073,0 16.137,12.884 16.137,12.884l0,28.857l-8.412,0l0,-25.422c0,0 0.03,-7.73 -9.098,-7.73c-9.44,0 -10.3,7.73 -10.3,7.73l0,25.423l-8.755,0l0,-25.595c0,0 -0.841,-8.073 -8.756,-8.073c-10.278,0 -10.471,8.245 -10.471,8.245l0.171,25.595Zm266.254,-41.92c-4.478,-0.075 -12.016,6.013 -12.016,6.013l0,-4.971l-8.593,0l0,40.874l8.76,0l-0.167,-25.593c0,0 0.193,-8.228 10.472,-8.228c1.909,0 3.391,0.463 4.565,1.175l0,-0.033l2.853,-7.96c-1.722,-0.725 -3.68,-1.239 -5.874,-1.276l0,-0.001Zm123.33,0c-4.477,-0.075 -12.015,6.013 -12.015,6.013l0,-4.971l-8.593,0l0,40.874l8.76,0l-0.167,-25.593c0,0 0.193,-8.228 10.472,-8.228c1.909,0 3.391,0.463 4.565,1.175l0,-0.033l2.853,-7.96c-1.722,-0.725 -3.68,-1.239 -5.874,-1.276l-0.001,-0.001Zm-305.653,-0.167c-13.103,0 -20.037,11.784 -20.072,21.629c-0.036,10.091 7.894,21.73 20.44,21.73c7.32,0 13.334,-5.407 13.334,-5.407l-0.016,4.164l8.618,0l0,-40.922l-8.648,0l0,5.155c0,0 -5.647,-6.348 -13.656,-6.348l0,-0.001Zm1.678,8.33c7.04,0 12.754,6.126 12.754,13.668c0,7.543 -5.715,13.636 -12.754,13.636c-7.04,0 -12.721,-6.093 -12.721,-13.636c0,-7.542 5.681,-13.669 12.72,-13.669l0.001,0.001Zm249.646,-8.33c-13.103,0 -20.037,11.784 -20.072,21.629c-0.036,10.091 7.894,21.73 20.44,21.73c7.32,0 13.334,-5.407 13.334,-5.407l-0.016,4.164l8.618,0l0,-40.922l-8.648,0l0,5.155c0,0 -5.647,-6.348 -13.656,-6.348l0,-0.001Zm1.678,8.33c7.04,0 12.754,6.126 12.754,13.668c0,7.543 -5.715,13.636 -12.754,13.636c-7.04,0 -12.721,-6.093 -12.721,-13.636c0,-7.542 5.681,-13.669 12.72,-13.669l0.001,0.001Zm81.066,-8.33c-13.102,0 -20.036,11.784 -20.071,21.629c-0.036,10.091 7.893,21.73 20.44,21.73c7.32,0 13.334,-5.407 13.334,-5.407l-0.016,4.164l8.618,0l0,-57.078l-8.648,0l0,21.31c0,0 -5.648,-6.348 -13.657,-6.348Zm1.678,8.33c7.04,0 12.755,6.126 12.755,13.668c0,7.543 -5.715,13.636 -12.755,13.636c-7.04,0 -12.72,-6.093 -12.72,-13.636c0,-7.542 5.68,-13.669 12.72,-13.669l0,0.001Zm-287.148,35.13c-8.926,0 -17.167,-5.497 -17.167,-5.497l3.777,-5.84c0,0 7.797,3.607 13.39,3.607c3.634,0 9.712,-1.174 9.785,-4.81c0.078,-3.842 -10.214,-4.981 -10.214,-4.981c0,0 -15.364,-0.21 -15.364,-12.883c0,-7.97 7.673,-13.055 17.51,-13.055c5.684,0 16.308,4.981 16.308,4.981l-4.291,6.7c0,0 -8.204,-3.28 -12.532,-3.436c-3.655,-0.132 -8.069,1.62 -8.069,4.81c0,8.668 25.58,-0.676 25.58,16.834c0,11.487 -10.418,13.57 -18.713,13.57Zm32.93,-54.108l0,11.892l-7.619,0l0,8.597l7.62,0l0,20.555c0,0 -0.675,13.904 14.264,13.904c4.13,0 12.218,-3.056 12.218,-3.056l-3.457,-8.934c0,0 -3.217,2.745 -6.848,2.653c-6.904,-0.174 -6.713,-4.6 -6.713,-4.6l0,-20.524l14.233,0l0,-8.595l-14.232,0l0,-11.891l-9.465,0l-0.001,-0.001Zm51.858,11.15c-14.05,0 -21.07,11.58 -21.012,21.63c0.06,10.335 6.392,21.965 21.85,21.965c6.617,0 15.91,-5.81 15.91,-5.81l-3.994,-6.953c0,0 -6.341,4.5 -11.915,4.5c-11.16,0 -11.882,-10.915 -11.882,-10.915l29.872,0c0,0 2.229,-24.416 -18.83,-24.416l0.001,-0.001Zm-1.276,8.028c0.331,-0.02 0.687,0 1.04,0c10.514,0 10.44,9.94 10.44,9.94l-21.247,0c0,0 -0.503,-9.356 9.767,-9.94Zm90.132,22.699l4.006,8.017c0,0 -6.349,4.13 -13.474,4.13c-14.751,0 -22.943,-11.11 -22.943,-21.621c0,-16.52 13.036,-21.378 21.85,-21.378c8.001,0 14.931,4.616 14.931,4.616l-4.491,8.016c0,0 -2.723,-4.25 -10.682,-4.25c-7.946,0 -12.14,6.854 -12.14,13.36c0,7.291 4.881,13.483 12.261,13.483c5.79,0 10.682,-4.373 10.682,-4.373Z"></path>
                                                    <path d="M624.508,278.631l0,-5.52l-1.44,0l-1.658,3.796l-1.657,-3.796l-1.44,0l0,5.52l1.017,0l0,-4.164l1.553,3.59l1.055,0l1.553,-3.6l0,4.174l1.017,0Zm-9.123,0l0,-4.578l1.845,0l0,-0.933l-4.698,0l0,0.933l1.845,0l0,4.578l1.008,0Zm9.412,-82.071c0,85.425 -69.077,154.676 -154.288,154.676c-85.21,0 -154.288,-69.25 -154.288,-154.676c0,-85.426 69.077,-154.677 154.289,-154.677c85.21,0 154.288,69.251 154.288,154.677l-0.001,0Z" style="fill:rgb(247,159,26);"></path>
                                                    <path d="M434.46,196.56c0,85.425 -69.078,154.676 -154.288,154.676c-85.212,0 -154.288,-69.25 -154.288,-154.676c0,-85.426 69.076,-154.677 154.288,-154.677c85.21,0 154.287,69.251 154.287,154.677l0.001,0Z" style="fill:rgb(234,0,27);"></path>
                                                    <path d="M375.34,74.797c-35.999,28.317 -59.107,72.318 -59.107,121.748c0,49.43 23.108,93.466 59.108,121.782c35.999,-28.316 59.107,-72.352 59.107,-121.782c0,-49.43 -23.108,-93.431 -59.107,-121.748l-0.001,0Z" style="fill:rgb(255,95,1);"></path>
                                                </g>
                                              </svg>
                                          </span>
                                                </li>
                                                <li class="ast-custom-payment">
                                                    <span aria-hidden="true" class="ahfb-svg-iconset ast-inline-flex">
                                              <svg width="100%" height="100%" viewBox="0 0 752 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                                                <g>
                                                    <path d="M751,40c0,-22.077 -17.923,-40 -40,-40l-670,0c-22.077,0 -40,17.923 -40,40l0,391c0,22.077 17.923,40 40,40l670,0c22.077,0 40,-17.923 40,-40l0,-391Z" style="fill:rgb(37,87,214);"></path>
                                                    <path d="M1,221.185l36.027,0l8.123,-19.51l18.185,0l8.101,19.51l70.88,0l0,-14.915l6.327,14.98l36.796,0l6.327,-15.202l0,15.138l176.151,0l-0.082,-32.026l3.408,0c2.386,0.083 3.083,0.302 3.083,4.226l0,27.8l91.106,0l0,-7.455c7.349,3.92 18.779,7.455 33.819,7.455l38.328,0l8.203,-19.51l18.185,0l8.021,19.51l73.86,0l0,-18.532l11.186,18.532l59.187,0l0,-122.508l-58.576,0l0,14.468l-8.202,-14.468l-60.105,0l0,14.468l-7.532,-14.468l-81.188,0c-13.59,0 -25.536,1.889 -35.186,7.153l0,-7.153l-56.026,0l0,7.153c-6.14,-5.426 -14.508,-7.153 -23.812,-7.153l-204.686,0l-13.734,31.641l-14.104,-31.641l-64.47,0l0,14.468l-7.083,-14.468l-54.983,0l-25.534,58.246l0,64.261Zm227.399,-17.67l-21.614,0l-0.08,-68.794l-30.573,68.793l-18.512,0l-30.652,-68.854l0,68.854l-42.884,0l-8.101,-19.592l-43.9,0l-8.183,19.592l-22.9,0l37.756,-87.837l31.326,0l35.859,83.164l0,-83.164l34.412,0l27.593,59.587l25.347,-59.587l35.104,0l0,87.837l0.003,0l-0.001,0.001Zm-159.622,-37.823l-14.43,-35.017l-14.35,35.017l28.78,0Zm245.642,37.821l-70.433,0l0,-87.837l70.433,0l0,18.291l-49.348,0l0,15.833l48.165,0l0,18.005l-48.166,0l0,17.542l49.348,0l0,18.166l0.001,0Zm99.256,-64.18c0,14.004 -9.386,21.24 -14.856,23.412c4.613,1.748 8.553,4.838 10.43,7.397c2.976,4.369 3.49,8.271 3.49,16.116l0,17.255l-21.266,0l-0.08,-11.077c0,-5.285 0.508,-12.886 -3.328,-17.112c-3.081,-3.09 -7.777,-3.76 -15.368,-3.76l-22.633,0l0,31.95l-21.084,0l0,-87.838l48.495,0c10.775,0 18.714,0.283 25.53,4.207c6.67,3.924 10.67,9.652 10.67,19.45Zm-26.652,13.042c-2.898,1.752 -6.324,1.81 -10.43,1.81l-25.613,0l0,-19.51l25.962,0c3.674,0 7.508,0.164 9.998,1.584c2.735,1.28 4.427,4.003 4.427,7.765c0,3.84 -1.61,6.929 -4.344,8.351Zm60.466,51.138l-21.513,0l0,-87.837l21.513,0l0,87.837Zm249.74,0l-29.879,0l-39.964,-65.927l0,65.927l-42.94,0l-8.204,-19.592l-43.799,0l-7.96,19.592l-24.673,0c-10.248,0 -23.224,-2.257 -30.572,-9.715c-7.41,-7.458 -11.265,-17.56 -11.265,-33.533c0,-13.027 2.304,-24.936 11.366,-34.347c6.816,-7.01 17.49,-10.242 32.02,-10.242l20.412,0l0,18.821l-19.984,0c-7.694,0 -12.039,1.14 -16.224,5.203c-3.594,3.699 -6.06,10.69 -6.06,19.897c0,9.41 1.878,16.196 5.797,20.628c3.245,3.476 9.144,4.53 14.694,4.53l9.469,0l29.716,-69.076l31.592,0l35.696,83.081l0,-83.08l32.103,0l37.062,61.174l0,-61.174l21.596,0l0,87.834l0.001,-0.001Zm-128.159,-37.82l-14.591,-35.017l-14.51,35.017l29.101,0Zm181.885,178.074c-5.121,7.458 -15.101,11.239 -28.611,11.239l-40.718,0l0,-18.84l40.553,0c4.022,0 6.837,-0.527 8.532,-2.175c1.602,-1.472 2.508,-3.555 2.493,-5.73c0,-2.56 -1.024,-4.592 -2.575,-5.81c-1.53,-1.341 -3.757,-1.95 -7.429,-1.95c-19.797,-0.67 -44.495,0.609 -44.495,-27.194c0,-12.743 8.125,-26.157 30.25,-26.157l41.998,0l0,-17.48l-39.02,0c-11.776,0 -20.33,2.808 -26.388,7.174l0,-7.175l-57.715,0c-9.23,0 -20.063,2.279 -25.187,7.175l0,-7.175l-103.065,0l0,7.175c-8.203,-5.892 -22.043,-7.175 -28.431,-7.175l-67.983,0l0,7.175c-6.49,-6.258 -20.92,-7.175 -29.716,-7.175l-76.085,0l-17.41,18.763l-16.307,-18.763l-113.656,0l0,122.592l111.516,0l17.94,-19.06l16.9,19.06l68.739,0.061l0,-28.838l6.757,0c9.12,0.14 19.878,-0.226 29.368,-4.31l0,33.085l56.697,0l0,-31.952l2.735,0c3.49,0 3.834,0.143 3.834,3.616l0,28.333l172.234,0c10.935,0 22.365,-2.787 28.695,-7.845l0,7.845l54.632,0c11.369,0 22.471,-1.587 30.918,-5.651l0,-22.838Zm-341.503,-47.154c0,24.406 -18.286,29.445 -36.716,29.445l-26.306,0l0,29.469l-40.98,0l-25.962,-29.085l-26.981,29.085l-83.517,0l0,-87.859l84.8,0l25.941,28.799l26.819,-28.799l67.371,0c16.732,0 35.532,4.613 35.532,28.945l-0.001,0Zm-167.625,40.434l-51.839,0l0,-17.481l46.289,0l0,-17.926l-46.289,0l0,-15.973l52.86,0l23.062,25.604l-24.083,25.776Zm83.526,10.06l-32.37,-35.788l32.37,-34.651l0,70.439Zm47.875,-39.066l-27.248,0l0,-22.374l27.492,0c7.612,0 12.896,3.09 12.896,10.773c0,7.598 -5.04,11.601 -13.14,11.601Zm142.741,-40.373l70.37,0l0,18.17l-49.372,0l0,15.973l48.167,0l0,17.925l-48.167,0l0,17.481l49.372,0.08l0,18.23l-70.37,0l0,-87.859Zm-27.053,47.03c4.693,1.724 8.53,4.816 10.329,7.375c2.977,4.29 3.408,8.293 3.493,16.037l0,17.417l-21.168,0l0,-10.992c0,-5.286 0.511,-13.112 -3.408,-17.198c-3.08,-3.147 -7.777,-3.9 -15.468,-3.9l-22.533,0l0,32.09l-21.186,0l0,-87.859l48.678,0c10.674,0 18.448,0.47 25.369,4.146c6.654,4.004 10.839,9.488 10.839,19.51c-0.003,14.024 -9.395,21.18 -14.945,23.373l0,0.001Zm-11.916,-11.108c-2.82,1.667 -6.308,1.81 -10.41,1.81l-25.614,0l0,-19.733l25.962,0c3.754,0 7.51,0.08 10.062,1.587c2.732,1.423 4.366,4.144 4.366,7.903c0,3.76 -1.634,6.788 -4.366,8.433Zm190.336,5.597c4.106,4.23 6.306,9.572 6.306,18.614c0,18.9 -11.858,27.723 -33.122,27.723l-41.065,0l0,-18.84l40.9,0c4,0 6.836,-0.527 8.613,-2.175c1.45,-1.359 2.49,-3.333 2.49,-5.73c0,-2.56 -1.125,-4.592 -2.573,-5.81c-1.612,-1.34 -3.836,-1.95 -7.508,-1.95c-19.717,-0.67 -44.41,0.61 -44.41,-27.193c0,-12.744 8.04,-26.158 30.144,-26.158l42.269,0l0,18.7l-38.677,0c-3.834,0 -6.327,0.143 -8.447,1.587c-2.31,1.422 -3.166,3.534 -3.166,6.32c0,3.315 1.96,5.57 4.613,6.545c2.224,0.77 4.613,0.996 8.205,0.996l11.35,0.305c11.446,0.278 19.303,2.249 24.078,7.066Zm83.664,-23.52l-38.427,0c-3.836,0 -6.385,0.143 -8.532,1.587c-2.224,1.423 -3.081,3.534 -3.081,6.322c0,3.314 1.878,5.569 4.61,6.544c2.225,0.77 4.614,0.996 8.126,0.996l11.427,0.304c11.531,0.284 19.228,2.258 23.921,7.072c0.855,0.67 1.368,1.422 1.956,2.175l0,-25Z" style="fill:white;"></path>
                                                </g>
                                              </svg>
                                          </span>
                                                </li>
                                                <li class="ast-custom-payment">
                                                    <span aria-hidden="true" class="ahfb-svg-iconset ast-inline-flex">
                                              <svg width="100%" height="100%" viewBox="0 0 780 501" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                                                <g>
                                                    <path d="M54.992,0c-30.365,0 -54.992,24.63 -54.992,55.004l0,390.992c0,30.38 24.619,55.004 54.992,55.004l670.016,0c30.365,0 54.992,-24.63 54.992,-55.004l0,-390.992c0,-30.38 -24.619,-55.004 -54.992,-55.004l-670.016,0Z" style="fill:rgb(77,77,77);"></path>
                                                    <path d="M415.13,161.213c30.941,0 56.022,23.58 56.022,52.709l0,0.033c0,29.13 -25.081,52.742 -56.021,52.742c-30.94,0 -56.022,-23.613 -56.022,-52.742l0,-0.033c0,-29.13 25.082,-52.71 56.022,-52.71l-0.001,0.001Zm-87.978,0.68c8.837,0 16.248,1.784 25.268,6.09l0,22.751c-8.544,-7.863 -15.955,-11.154 -25.756,-11.154c-19.264,0 -34.414,15.015 -34.414,34.05c0,20.075 14.681,34.196 35.37,34.196c9.312,0 16.586,-3.12 24.8,-10.857l0,22.763c-9.341,4.14 -16.911,5.776 -25.756,5.776c-31.278,0 -55.582,-22.596 -55.582,-51.737c0,-28.826 24.951,-51.878 56.07,-51.878Zm-97.113,0.627c11.546,0 22.11,3.72 30.943,10.994l-10.748,13.248c-5.35,-5.646 -10.41,-8.028 -16.564,-8.028c-8.853,0 -15.3,4.745 -15.3,10.989c0,5.354 3.619,8.188 15.944,12.482c23.365,8.044 30.29,15.176 30.29,30.926c0,19.193 -14.976,32.553 -36.32,32.553c-15.63,0 -26.994,-5.795 -36.458,-18.872l13.268,-12.03c4.73,8.61 12.622,13.222 22.42,13.222c9.163,0 15.947,-5.952 15.947,-13.984c0,-4.164 -2.055,-7.734 -6.158,-10.258c-2.066,-1.195 -6.158,-2.977 -14.2,-5.647c-19.291,-6.538 -25.91,-13.527 -25.91,-27.185c0,-16.225 14.214,-28.41 32.846,-28.41Zm234.723,1.728l22.437,0l28.084,66.592l28.446,-66.592l22.267,0l-45.494,101.686l-11.053,0l-44.687,-101.686Zm-397.348,0.152l30.15,0c33.312,0 56.534,20.382 56.534,49.641c0,14.59 -7.104,28.696 -19.118,38.057c-10.108,7.901 -21.626,11.445 -37.574,11.445l-29.992,0l0,-99.143Zm96.135,0l20.54,0l0,99.143l-20.54,0l0,-99.143Zm411.734,0l58.252,0l0,16.8l-37.725,0l0,22.005l36.336,0l0,16.791l-36.336,0l0,26.762l37.726,0l0,16.785l-58.252,0l0,-99.143l-0.001,0Zm71.858,0l30.455,0c23.69,0 37.265,10.71 37.265,29.272c0,15.18 -8.514,25.14 -23.986,28.105l33.148,41.766l-25.26,0l-28.429,-39.828l-2.678,0l0,39.828l-20.515,0l0,-99.143Zm20.515,15.616l0,30.025l6.002,0c13.117,0 20.069,-5.362 20.069,-15.328c0,-9.648 -6.954,-14.697 -19.745,-14.697l-6.326,0Zm-579.716,1.183l0,65.559l5.512,0c13.273,0 21.656,-2.394 28.11,-7.88c7.103,-5.955 11.376,-15.465 11.376,-24.98c0,-9.499 -4.273,-18.725 -11.376,-24.681c-6.785,-5.78 -14.837,-8.018 -28.11,-8.018l-5.512,0Z" style="fill:white;"></path>
                                                    <path d="M779.982,288.361c-26.05,18.33 -221.077,149.34 -558.754,212.623l503.762,0c30.365,0 54.992,-24.63 54.992,-55.004l0,-157.619Z" style="fill:rgb(244,114,22);"></path>
                                                </g>
                                              </svg>
                                          </span>
                                                </li>
                                            </ul>
                                        </fieldset>
                                    </div>
                                    <div class="woocommerce-tabs wc-tabs-wrapper">
                                        <ul class="tabs wc-tabs" role="tablist">
                                            <li role="presentation" class="description_tab active" id="tab-title-description">
                                                <a href="#" role="tab" aria-controls="tab-description" aria-selected="true" tabindex="0">
                                        Description					</a>
                                            </li>
                                            <li role="presentation" class="additional_information_tab" id="tab-title-additional_information">
                                                <a href="#" role="tab" aria-controls="tab-additional_information" aria-selected="false" tabindex="-1">
                                        Additional information					</a>
                                            </li>
                                            <li role="presentation" class="reviews_tab" id="tab-title-reviews">
                                                <a href="#" role="tab" aria-controls="tab-reviews" aria-selected="false" tabindex="-1">
                                        Reviews (0)					</a>
                                            </li>
                                        </ul>
                                        <div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--description panel entry-content wc-tab" id="tab-description" role="tabpanel" aria-labelledby="tab-title-description" style="">
                                            <p>${props.description}</p>
                                        </div>
                                        <div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--additional_information panel entry-content wc-tab" id="tab-additional_information" role="tabpanel" aria-labelledby="tab-title-additional_information" style="display: none;">
                                        </div>
                                        <div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--reviews panel entry-content wc-tab" id="tab-reviews" role="tabpanel" aria-labelledby="tab-title-reviews" style="display: none;">

                                        </div>
                                    </div>
                                    <section class="related products">
                                        <h2>Related products</h2>
                                        <ul class="products columns-4">
                                            <li class="ast-article-single ast-woo-product-no-review desktop-align-center tablet-align-center mobile-align-center product type-product post-197 status-publish first instock product_cat-evening-dresses has-post-thumbnail shipping-taxable purchasable product-type-simple">
                                                <div class="astra-shop-thumbnail-wrap">
                                                    <a href="#" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                                                        <img width="300" height="366" src="${bannerImageUrl}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="${props.siteName}" decoding="async" srcset="${bannerImageUrl} 400w,
                                                        ${bannerImageUrl} 246w, 
                                                        ${bannerImageUrl} 840w, 
                                                        ${bannerImageUrl} 768w, 
                                                        ${bannerImageUrl} 600w, 
                                                        ${bannerImageUrl} 960w" sizes="(max-width: 300px) 100vw, 300px"></a>
                                                    <a href="#" data-quantity="1" class="ast-on-card-button ast-select-options-trigger product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="197" data-product_sku="" aria-label="Add to cart: “Urban Chic Ensemble”" rel="nofollow">
                                                        <span class="ast-card-action-tooltip"> Add to cart </span>
                                                        <span class="ahfb-svg-iconset">
                                                <span class="ast-icon icon-bag">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="ast-bag-icon-svg" x="0px" y="0px" width="100" height="100" viewBox="826 826 140 140" enable-background="new 826 826 140 140" xml:space="preserve">
                                                      <path d="M960.758,934.509l2.632,23.541c0.15,1.403-0.25,2.657-1.203,3.761c-0.953,1.053-2.156,1.579-3.61,1.579H833.424  c-1.454,0-2.657-0.526-3.61-1.579c-0.952-1.104-1.354-2.357-1.203-3.761l2.632-23.541H960.758z M953.763,871.405l6.468,58.29H831.77  l6.468-58.29c0.15-1.203,0.677-2.218,1.58-3.045c0.903-0.827,1.981-1.241,3.234-1.241h19.254v9.627c0,2.658,0.94,4.927,2.82,6.807  s4.149,2.82,6.807,2.82c2.658,0,4.926-0.94,6.807-2.82s2.821-4.149,2.821-6.807v-9.627h28.882v9.627  c0,2.658,0.939,4.927,2.819,6.807c1.881,1.88,4.149,2.82,6.807,2.82s4.927-0.94,6.808-2.82c1.879-1.88,2.82-4.149,2.82-6.807v-9.627  h19.253c1.255,0,2.332,0.414,3.235,1.241C953.086,869.187,953.612,870.202,953.763,871.405z M924.881,857.492v19.254  c0,1.304-0.476,2.432-1.429,3.385s-2.08,1.429-3.385,1.429c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.43-2.081-1.43-3.385  v-19.254c0-5.315-1.881-9.853-5.641-13.613c-3.76-3.761-8.298-5.641-13.613-5.641s-9.853,1.88-13.613,5.641  c-3.761,3.76-5.641,8.298-5.641,13.613v19.254c0,1.304-0.476,2.432-1.429,3.385c-0.953,0.953-2.081,1.429-3.385,1.429  c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.429-2.081-1.429-3.385v-19.254c0-7.973,2.821-14.779,8.461-20.42  c5.641-5.641,12.448-8.461,20.42-8.461c7.973,0,14.779,2.82,20.42,8.461C922.062,842.712,924.881,849.519,924.881,857.492z"></path>
                                                    </svg>
                                                </span>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div class="astra-shop-summary-wrap">
                                                    <a href="#" class="ast-loop-product__link">
                                                        <h2 class="woocommerce-loop-product__title">${props.siteName}</h2>
                                                    </a>
                                                    <span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>224.95</bdi>
                                                    </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li class="ast-article-single ast-woo-product-no-review desktop-align-center tablet-align-center mobile-align-center product type-product post-197 status-publish first instock product_cat-evening-dresses has-post-thumbnail shipping-taxable purchasable product-type-simple">
                                                <div class="astra-shop-thumbnail-wrap">
                                                    <a href="#" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                                                        <img width="300" height="366" src="${bannerImageUrl}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="${props.siteName}" decoding="async" srcset="${bannerImageUrl} 400w,
                                                        ${bannerImageUrl} 246w, 
                                                        ${bannerImageUrl} 840w, 
                                                        ${bannerImageUrl} 768w, 
                                                        ${bannerImageUrl} 600w, 
                                                        ${bannerImageUrl} 960w" sizes="(max-width: 300px) 100vw, 300px"></a>
                                                    <a href="#" data-quantity="1" class="ast-on-card-button ast-select-options-trigger product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="197" data-product_sku="" aria-label="Add to cart: “Urban Chic Ensemble”" rel="nofollow">
                                                        <span class="ast-card-action-tooltip"> Add to cart </span>
                                                        <span class="ahfb-svg-iconset">
                                                <span class="ast-icon icon-bag">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="ast-bag-icon-svg" x="0px" y="0px" width="100" height="100" viewBox="826 826 140 140" enable-background="new 826 826 140 140" xml:space="preserve">
                                                      <path d="M960.758,934.509l2.632,23.541c0.15,1.403-0.25,2.657-1.203,3.761c-0.953,1.053-2.156,1.579-3.61,1.579H833.424  c-1.454,0-2.657-0.526-3.61-1.579c-0.952-1.104-1.354-2.357-1.203-3.761l2.632-23.541H960.758z M953.763,871.405l6.468,58.29H831.77  l6.468-58.29c0.15-1.203,0.677-2.218,1.58-3.045c0.903-0.827,1.981-1.241,3.234-1.241h19.254v9.627c0,2.658,0.94,4.927,2.82,6.807  s4.149,2.82,6.807,2.82c2.658,0,4.926-0.94,6.807-2.82s2.821-4.149,2.821-6.807v-9.627h28.882v9.627  c0,2.658,0.939,4.927,2.819,6.807c1.881,1.88,4.149,2.82,6.807,2.82s4.927-0.94,6.808-2.82c1.879-1.88,2.82-4.149,2.82-6.807v-9.627  h19.253c1.255,0,2.332,0.414,3.235,1.241C953.086,869.187,953.612,870.202,953.763,871.405z M924.881,857.492v19.254  c0,1.304-0.476,2.432-1.429,3.385s-2.08,1.429-3.385,1.429c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.43-2.081-1.43-3.385  v-19.254c0-5.315-1.881-9.853-5.641-13.613c-3.76-3.761-8.298-5.641-13.613-5.641s-9.853,1.88-13.613,5.641  c-3.761,3.76-5.641,8.298-5.641,13.613v19.254c0,1.304-0.476,2.432-1.429,3.385c-0.953,0.953-2.081,1.429-3.385,1.429  c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.429-2.081-1.429-3.385v-19.254c0-7.973,2.821-14.779,8.461-20.42  c5.641-5.641,12.448-8.461,20.42-8.461c7.973,0,14.779,2.82,20.42,8.461C922.062,842.712,924.881,849.519,924.881,857.492z"></path>
                                                    </svg>
                                                </span>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div class="astra-shop-summary-wrap">
                                                    <a href="#" class="ast-loop-product__link">
                                                        <h2 class="woocommerce-loop-product__title">${props.siteName} Datar</h2>
                                                    </a>
                                                    <span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>224.95</bdi>
                                                    </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li class="ast-article-single ast-woo-product-no-review desktop-align-center tablet-align-center mobile-align-center product type-product post-197 status-publish first instock product_cat-evening-dresses has-post-thumbnail shipping-taxable purchasable product-type-simple">
                                                <div class="astra-shop-thumbnail-wrap">
                                                    <a href="#" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                                                        <img width="300" height="366" src="${bannerImageUrl}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="${props.siteName}" decoding="async" srcset="${bannerImageUrl} 400w,
                                                        ${bannerImageUrl} 246w, 
                                                        ${bannerImageUrl} 840w, 
                                                        ${bannerImageUrl} 768w, 
                                                        ${bannerImageUrl} 600w, 
                                                        ${bannerImageUrl} 960w" sizes="(max-width: 300px) 100vw, 300px"></a>
                                                    <a href="#" data-quantity="1" class="ast-on-card-button ast-select-options-trigger product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="197" data-product_sku="" aria-label="Add to cart: “Urban Chic Ensemble”" rel="nofollow">
                                                        <span class="ast-card-action-tooltip"> Add to cart </span>
                                                        <span class="ahfb-svg-iconset">
                                                <span class="ast-icon icon-bag">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="ast-bag-icon-svg" x="0px" y="0px" width="100" height="100" viewBox="826 826 140 140" enable-background="new 826 826 140 140" xml:space="preserve">
                                                      <path d="M960.758,934.509l2.632,23.541c0.15,1.403-0.25,2.657-1.203,3.761c-0.953,1.053-2.156,1.579-3.61,1.579H833.424  c-1.454,0-2.657-0.526-3.61-1.579c-0.952-1.104-1.354-2.357-1.203-3.761l2.632-23.541H960.758z M953.763,871.405l6.468,58.29H831.77  l6.468-58.29c0.15-1.203,0.677-2.218,1.58-3.045c0.903-0.827,1.981-1.241,3.234-1.241h19.254v9.627c0,2.658,0.94,4.927,2.82,6.807  s4.149,2.82,6.807,2.82c2.658,0,4.926-0.94,6.807-2.82s2.821-4.149,2.821-6.807v-9.627h28.882v9.627  c0,2.658,0.939,4.927,2.819,6.807c1.881,1.88,4.149,2.82,6.807,2.82s4.927-0.94,6.808-2.82c1.879-1.88,2.82-4.149,2.82-6.807v-9.627  h19.253c1.255,0,2.332,0.414,3.235,1.241C953.086,869.187,953.612,870.202,953.763,871.405z M924.881,857.492v19.254  c0,1.304-0.476,2.432-1.429,3.385s-2.08,1.429-3.385,1.429c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.43-2.081-1.43-3.385  v-19.254c0-5.315-1.881-9.853-5.641-13.613c-3.76-3.761-8.298-5.641-13.613-5.641s-9.853,1.88-13.613,5.641  c-3.761,3.76-5.641,8.298-5.641,13.613v19.254c0,1.304-0.476,2.432-1.429,3.385c-0.953,0.953-2.081,1.429-3.385,1.429  c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.429-2.081-1.429-3.385v-19.254c0-7.973,2.821-14.779,8.461-20.42  c5.641-5.641,12.448-8.461,20.42-8.461c7.973,0,14.779,2.82,20.42,8.461C922.062,842.712,924.881,849.519,924.881,857.492z"></path>
                                                    </svg>
                                                </span>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div class="astra-shop-summary-wrap">
                                                    <a href="#" class="ast-loop-product__link">
                                                        <h2 class="woocommerce-loop-product__title">${props.siteName} Login</h2>
                                                    </a>
                                                    <span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>224.95</bdi>
                                                    </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li class="ast-article-single ast-woo-product-no-review desktop-align-center tablet-align-center mobile-align-center product type-product post-197 status-publish first instock product_cat-evening-dresses has-post-thumbnail shipping-taxable purchasable product-type-simple">
                                                <div class="astra-shop-thumbnail-wrap">
                                                    <a href="#" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                                                        <img width="300" height="366" src="${bannerImageUrl}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="${props.siteName}" decoding="async" srcset="${bannerImageUrl} 400w,
                                                        ${bannerImageUrl} 246w, 
                                                        ${bannerImageUrl} 840w, 
                                                        ${bannerImageUrl} 768w, 
                                                        ${bannerImageUrl} 600w, 
                                                        ${bannerImageUrl} 960w" sizes="(max-width: 300px) 100vw, 300px"></a>
                                                    <a href="#" data-quantity="1" class="ast-on-card-button ast-select-options-trigger product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="197" data-product_sku="" aria-label="Add to cart: “Urban Chic Ensemble”" rel="nofollow">
                                                        <span class="ast-card-action-tooltip"> Add to cart </span>
                                                        <span class="ahfb-svg-iconset">
                                                <span class="ast-icon icon-bag">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="ast-bag-icon-svg" x="0px" y="0px" width="100" height="100" viewBox="826 826 140 140" enable-background="new 826 826 140 140" xml:space="preserve">
                                                      <path d="M960.758,934.509l2.632,23.541c0.15,1.403-0.25,2.657-1.203,3.761c-0.953,1.053-2.156,1.579-3.61,1.579H833.424  c-1.454,0-2.657-0.526-3.61-1.579c-0.952-1.104-1.354-2.357-1.203-3.761l2.632-23.541H960.758z M953.763,871.405l6.468,58.29H831.77  l6.468-58.29c0.15-1.203,0.677-2.218,1.58-3.045c0.903-0.827,1.981-1.241,3.234-1.241h19.254v9.627c0,2.658,0.94,4.927,2.82,6.807  s4.149,2.82,6.807,2.82c2.658,0,4.926-0.94,6.807-2.82s2.821-4.149,2.821-6.807v-9.627h28.882v9.627  c0,2.658,0.939,4.927,2.819,6.807c1.881,1.88,4.149,2.82,6.807,2.82s4.927-0.94,6.808-2.82c1.879-1.88,2.82-4.149,2.82-6.807v-9.627  h19.253c1.255,0,2.332,0.414,3.235,1.241C953.086,869.187,953.612,870.202,953.763,871.405z M924.881,857.492v19.254  c0,1.304-0.476,2.432-1.429,3.385s-2.08,1.429-3.385,1.429c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.43-2.081-1.43-3.385  v-19.254c0-5.315-1.881-9.853-5.641-13.613c-3.76-3.761-8.298-5.641-13.613-5.641s-9.853,1.88-13.613,5.641  c-3.761,3.76-5.641,8.298-5.641,13.613v19.254c0,1.304-0.476,2.432-1.429,3.385c-0.953,0.953-2.081,1.429-3.385,1.429  c-1.303,0-2.432-0.477-3.384-1.429c-0.953-0.953-1.429-2.081-1.429-3.385v-19.254c0-7.973,2.821-14.779,8.461-20.42  c5.641-5.641,12.448-8.461,20.42-8.461c7.973,0,14.779,2.82,20.42,8.461C922.062,842.712,924.881,849.519,924.881,857.492z"></path>
                                                    </svg>
                                                </span>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div class="astra-shop-summary-wrap">
                                                    <a href="#" class="ast-loop-product__link">
                                                        <h2 class="woocommerce-loop-product__title">${props.siteName} RTP</h2>
                                                    </a>
                                                    <span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>224.95</bdi>
                                                    </span>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </section>
                                </div>
                            </div>
                            <!-- .ast-woocommerce-container -->
                        </main>
                        <!-- #main -->
                    </div>
                    <!-- #primary -->
                </div>
                <!-- ast-container -->
            </div>
            <!-- #content -->
            <div id="ast-mobile-popup-wrapper">
                <div id="ast-mobile-popup" class="ast-mobile-popup-drawer content-align-center ast-mobile-popup-full-width">
                    <div class="ast-mobile-popup-overlay"></div>
                    <div class="ast-mobile-popup-inner">
                        <div class="ast-mobile-popup-header">
                            <button type="button" id="menu-toggle-close" class="menu-toggle-close" aria-label="Close menu" tabindex="0">
                                <span class="ast-svg-iconset">
                              <span aria-hidden="true" class="ahfb-svg-iconset ast-inline-flex svg-baseline">
                                  <svg class="ast-mobile-svg ast-close-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
                                  </svg>
                              </span>
                                </span>
                            </button>
                        </div>
                        <div class="ast-mobile-popup-content">
                            <div class="ast-builder-menu-mobile ast-builder-menu ast-builder-menu-mobile-focus-item ast-builder-layout-element site-header-focus-item" data-section="section-header-mobile-menu">
                                <div class="ast-main-header-bar-alignment">
                                    <div class="main-header-bar-navigation">
                                        <nav class="site-navigation ast-flex-grow-1 navigation-accessibility site-header-focus-item" id="ast-mobile-site-navigation" aria-label="Site Navigation: Menu" itemtype="https://schema.org/SiteNavigationElement" itemscope="itemscope">
                                            <div class="main-navigation">
                                                <ul id="ast-hf-mobile-menu" class="main-header-menu ast-nav-menu ast-flex  submenu-with-border astra-menu-animation-fade  stack-on-mobile">
                                                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-22"><a href="#" class="menu-link">${props.siteName}</a></li>
                                                    <li class="menu-item menu-item-type-post_type menu-item-object-page current_page_parent menu-item-23"><a href="#" class="menu-link">${props.siteName} Daftar</a></li>
                                                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-21"><a href="#" class="menu-link">${props.siteName} Login</a></li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ast-desktop-popup-content">
                        </div>
                    </div>
                </div>
            </div>

            <!-- #colophon -->
        </div>
        <!-- #page -->
        <script type="speculationrules">
            {"prefetch":[{"source":"document","where":{"and":[{"href_matches":"\/clothing-store-02\/*"},{"not":{"href_matches":["\/clothing-store-02\/wp-*.php","\/clothing-store-02\/wp-admin\/*","\/clothing-store-02\/wp-content\/uploads\/sites\/1447\/*","\/clothing-store-02\/wp-content\/*","\/clothing-store-02\/wp-content\/plugins\/*","\/clothing-store-02\/wp-content\/themes\/astra\/*","\/clothing-store-02\/*\\?(.+)"]}},{"not":{"selector_matches":"a[rel~=\"nofollow\"]"}},{"not":{"selector_matches":".no-prefetch,
            .no-prefetch a"}}]},"eagerness":"conservative"}]}
        </script>
        <div id="moderncart-slide-out-modal" class="moderncart-plugin moderncart-modal moderncart-cart-style-slideout moderncart-recommendation-style-style1 moderncart-cart-theme-style1 moderncart-slide-right" aria-hidden="true" role="dialog" aria-modal="true">
            <div id="moderncart-slide-out" class="moderncart-default-slide-out moderncart-modal-wrap moderncart-animation-simple moderncart-style1-order-summary-style moderncart-image-size-medium">
                <div class="moderncart-panel">
                    <div class="moderncart-slide-out-header">
                        <div class="moderncart-slide-out-header-heading sample">
                            <button type="button" class="moderncart-slide-out-header-close" data-dismiss="moderncart-modal" aria-expanded="true" aria-label="Close cart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="57.48" height="28.003" viewBox="0 0 57.48 28.003" aria-hidden="true" focusable="false">
                                    <path d="M57.481 14a1.725 1.725 0 0 0-.415-1.013L45.275.461a1.475 1.475 0 0 0-2.084-.058 1.52 1.52 0 0 0-.058 2.084L52.6 12.528H1.474a1.474 1.474 0 1 0 0 2.948H52.6l-9.466 10.04a1.545 1.545 0 0 0 .058 2.084 1.476 1.476 0 0 0 2.084-.058l11.79-12.527A1.313 1.313 0 0 0 57.481 14z"></path>
                                </svg>
                                <span class="moderncart-sr-only">Close cart</span>
                            </button>
                            <div class="moderncart-slide-out-header-title">
                                <span>Your Cart Is Empty</span>
                            </div>
                            <div class="moderncart-slide-out-header-quantity" aria-live="polite" aria-atomic="true">
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                    <div class="moderncart-slide-out-cart">
                        <div class="moderncart-slide-out-cart-inner moderncart-slide-out-cart-empty" role="list">
                            <div class="moderncart-empty-cart simple">
                                <span></span>
                                <p>Check out our shop to see what's available</p>
                            </div>
                        </div>
                    </div>
                    <div class="moderncart-slide-out-footer">
                        <div class="moderncart-cart-total sample moderncart-order-summary-style-style1">
                            <div class="moderncart-cart-line-items">
                                <div class="moderncart-cart-line-items-item moderncart-cart-line-items__total" role="row" aria-label="Cart Total" aria-live="polite"><span class="moderncart-cart-line-items-label moderncart-cart-line-items__total-label" role="cell"><span class="screen-reader-text">Cart Total: </span>Total</span><span class="moderncart-cart-line-items-value moderncart-cart-line-items__total-value"
                                    role="cell" aria-label="Cart Total: $0.00"><strong><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>0.00</span>
                                    </strong>
                                    </span>
                                </div>
                            </div>
                            <div class="wc-proceed-to-checkout">
                                <a class="checkout-button wc-forward" href="#">
                            Your cart is empty. Shop now				→			</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="live-region" aria-live="polite"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0" focusable="false" role="none" style="visibility: hidden; position: absolute; left: -9999px; overflow: hidden;">
            <defs>
                <filter id="ast-img-color-filter">
                    <fecolormatrix color-interpolation-filters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 "></fecolormatrix>
                    <fecomponenttransfer color-interpolation-filters="sRGB">
                        <fefuncr type="table" tableValues="0 0"></fefuncr>
                        <fefuncg type="table" tableValues="0 0"></fefuncg>
                        <fefuncb type="table" tableValues="0 0"></fefuncb>
                        <fefunca type="table" tableValues="1 1"></fefunca>
                    </fecomponenttransfer>
                    <fecomposite in2="SourceGraphic" operator="in"></fecomposite>
                </filter>
            </defs>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0" focusable="false" role="none" style="visibility: hidden; position: absolute; left: -9999px; overflow: hidden;">
            <defs>
                <filter id="ast-img-color-filter-2">
                    <fecolormatrix color-interpolation-filters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 "></fecolormatrix>
                    <fecomponenttransfer color-interpolation-filters="sRGB">
                        <fefuncr type="table" tableValues="1 1"></fefuncr>
                        <fefuncg type="table" tableValues="1 1"></fefuncg>
                        <fefuncb type="table" tableValues="1 1"></fefuncb>
                        <fefunca type="table" tableValues="1 1"></fefunca>
                    </fecomponenttransfer>
                    <fecomposite in2="SourceGraphic" operator="in"></fecomposite>
                </filter>
            </defs>
        </svg>
        <div class="ast-sticky-add-to-cart top">
            <div class="ast-container">
                <div class="ast-sticky-add-to-cart-content">
                    <div class="ast-sticky-add-to-cart-title-wrap"><img loading="lazy" width="300" height="366" src="${vercelBlobBaseUrl}/assets/css/img-05-a-white-300x366.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="${props.siteName}">
                        <span
                        class="ast-sticky-add-to-cart-title">${props.siteName}</span>
                    </div>
                    <div class="ast-sticky-add-to-cart-action-wrap"><span class="ast-sticky-add-to-cart-action-price price"><span class="woocommerce-Price-amount amount" aria-hidden="true"><span class="woocommerce-Price-currencySymbol">$</span>175.00</span> <span aria-hidden="true">–</span> <span class="woocommerce-Price-amount amount"
                        aria-hidden="true"><span class="woocommerce-Price-currencySymbol">$</span>185.00</span><span class="screen-reader-text">Price range: $175.00 through $185.00</span></span>
                        <a href="#?customize=template#product-187" class="single_link_to_cart_button button alt">Select options</a></div>
                </div>
            </div>
        </div>
        <div id="ast-scroll-top" tabindex="0" class="ast-scroll-top-icon ast-scroll-to-top-right" data-on-devices="both" style="display: none;">
            <span class="ast-icon icon-arrow">
                <svg class="ast-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="26px" height="16.043px" viewBox="57 35.171 26 16.043" enable-background="new 57 35.171 26 16.043" xml:space="preserve">
                  <path d="M57.5,38.193l12.5,12.5l12.5-12.5l-2.5-2.5l-10,10l-10-10L57.5,38.193z"></path>
                </svg>
            </span>
            <span class="screen-reader-text">Scroll to Top</span>
        </div>
        <div id="photoswipe-fullscreen-dialog" class="pswp" tabindex="-1" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Full screen image">
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap">
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                        <div class="pswp__counter"></div>
                        <button class="pswp__button pswp__button--zoom" aria-label="Zoom in/out"></button>
                        <button class="pswp__button pswp__button--fs" aria-label="Toggle fullscreen"></button>
                        <button class="pswp__button pswp__button--share" aria-label="Share"></button>
                        <button class="pswp__button pswp__button--close" aria-label="Close (Esc)"></button>
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                                <div class="pswp__preloader__cut">
                                    <div class="pswp__preloader__donut"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div>
                    </div>
                    <button class="pswp__button pswp__button--arrow--left" aria-label="Previous (arrow left)"></button>
                    <button class="pswp__button pswp__button--arrow--right" aria-label="Next (arrow right)"></button>
                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
                </div>
            </div>
        </div>
        <link rel="stylesheet" id="wc-blocks-style-css" href="${vercelBlobBaseUrl}/assets/css/wc-blocks.css" media="all">
    </body>

    </html>
  `;
}

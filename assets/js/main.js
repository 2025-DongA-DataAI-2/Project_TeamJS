/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    const header = document.querySelector('#header');
    if (!header || !headerToggleBtn) return;

    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show') && headerToggleBtn) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  /**
 * Scroll control button (subpage)
 */
  const scrollBtn = document.querySelector('#scroll-control');
  const sections = document.querySelectorAll('section[data-scroll-step]');

  function updateScrollButton() {
    if (!scrollBtn || sections.length === 0) return;

    const current = window.scrollY + window.innerHeight;
    const last = sections[sections.length - 1];

    const isLast = current >= last.offsetTop + last.offsetHeight - 50;

    if (isLast) {
      scrollBtn.dataset.mode = 'top';
      scrollBtn.innerHTML = `<i class="bi bi-arrow-up-short"></i>`;
    } else {
      scrollBtn.dataset.mode = 'next';
      scrollBtn.innerHTML = `<i class="bi bi-arrow-down-short"></i>`;
    }

    scrollBtn.classList.add('active');
  }

  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (scrollBtn.dataset.mode === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const y = window.scrollY + 10;
      for (const sec of sections) {
        if (sec.offsetTop > y) {
          window.scrollTo({ top: sec.offsetTop, behavior: 'smooth' });
          return;
        }
      }
    });

    window.addEventListener('load', updateScrollButton);
    window.addEventListener('scroll', updateScrollButton);
  }


  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    const container = isotopeItem.querySelector('.isotope-container');
    if (!container) return;

    imagesLoaded(container, function () {
      initIsotope = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {

      // ✅ 1) code-result-swiper는 공통 설정 사용 (swiper-config 필요 없음)
      if (swiperElement.classList.contains("code-result-swiper")) {
        new Swiper(swiperElement, {
          loop: false,
          speed: 450,
          slidesPerView: 1,
          spaceBetween: 16,
          navigation: {
            nextEl: swiperElement.querySelector(".swiper-button-next"),
            prevEl: swiperElement.querySelector(".swiper-button-prev")
          },
          pagination: {
            el: swiperElement.querySelector(".swiper-pagination"),
            clickable: true
          }
        });
        return;
      }

      // ✅ 2) 나머지 swiper(기존 템플릿 슬라이더)는 swiper-config 기반 유지
      const cfgEl = swiperElement.querySelector(".swiper-config");
      if (!cfgEl) return;

      let config = JSON.parse(cfgEl.innerHTML.trim());

      // 버튼/페이지네이션 충돌 방지: 현재 swiper 내부 요소로 고정
      if (config.navigation) {
        config.navigation.nextEl = swiperElement.querySelector(config.navigation.nextEl)
          || swiperElement.querySelector(".swiper-button-next");
        config.navigation.prevEl = swiperElement.querySelector(config.navigation.prevEl)
          || swiperElement.querySelector(".swiper-button-prev");
      }
      if (config.pagination) {
        config.pagination.el = swiperElement.querySelector(config.pagination.el)
          || swiperElement.querySelector(".swiper-pagination");
      }

      new Swiper(swiperElement, config);
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a[href^="#"]');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 120;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // 여기 아래부터는 가내수공업으로 만든 기능들  

  // Highlight.js init
  hljs.highlightAll();

  // Copy button logic
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.closest('.code-container').querySelector('code').innerText;

      navigator.clipboard.writeText(code).then(() => {
        const original = btn.innerText;
        btn.innerText = "Copied!";
        setTimeout(() => {
          btn.innerText = original;
        }, 1500);
      });
    });
  });


  // highlight init (페이지 로드시)
  if (window.hljs) hljs.highlightAll();

  // Copy 버튼: 이벤트 위임(슬라이드 안에서도 OK)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;

    const codeEl = btn.closest('.code-container')?.querySelector('code');
    if (!codeEl) return;

    navigator.clipboard.writeText(codeEl.innerText).then(() => {
      const old = btn.innerText;
      btn.innerText = 'Copied!';
      setTimeout(() => (btn.innerText = old), 1200);
    });
  });

  window.addEventListener("load", () => {
    // ✅ HTML body에 data-subpage="sub1" / "sub2" 로 되어 있으니 subpage를 읽어야 함
    const pageKey = document.body.dataset.subpage;

    const slideRankDataMap = {
      sub1: [
        {
          top5: ["로맨스(27.98점)", "드라마(25.27점)", "미스터리(22.21점)", "코미디(21.82점)", "스릴러(21.63점)"],
          bottom5: ["모험(5.89점)", "공포(5.96점)", "우정(6.03점)", "청춘(6.31점)", "의학(9.12점)"],
        },
        {
          top5: ["로맨스(31.11점)➖", "드라마(30.60점)➖", "코미디(29.29점)🔼", "미스터리(28.20점)🔽", "스릴러(27.48점)➖"],
          bottom5: ["시트콤(5.75점)🆕", "학원(5.96점)🆕", "군대(6.17점)🆕", "음악(9.23점)🆕", "정치(9.34점)🆕"],
        },
        {
          top5: ["드라마(38.78점)🔼", "로맨스(36.15점)🔽", "미스터리(33.59점)🔼", "스릴러(33.55점)🔼", "코미디(32.60점)🔽"],
          bottom5: ["모험(5.75점)↩️", "학원(5.89점)➖", "음악(9.17점)🔼", "군대(12.11점)🔽", "비즈니스(13.60점)🆕"],
        },
      ],

      sub2: [
        {
          top5: ["로맨스(30.74점)", "드라마(28.25점)", "코미디(25.53점)", "스릴러(22.96점)", "미스터리(22.90점)"],
          bottom5: ["SF(6.24점)", "스포츠(6.10점)", "공포(5.96점)", "모험(5.89점)", "시트콤(5.75점)"],
        },
        {
          top5: ["드라마(36.42점)", "로맨스(35.61점)", "미스터리(33.79점)", "스릴러(33.46점)", "코미디(32.78점)"],
          bottom5: ["스포츠(11.78점)", "군대(9.83점)", "학원(9.39점)", "음악(9.23점)", "모험(5.75점)"],
        },
        {
          top5: ["드라마(33.49점)", "로맨스(29.63점)", "미스터리(27.43점)", "스릴러(26.88점)", "코미디(26.74점)"],
          bottom5: ["초자연(9.28점)", "공포(9.23점)", "음악(9.17점)", "정치(5.89점)", "비즈니스(5.89점)"],
        },
      ],
    };

    const slideRankData = slideRankDataMap[pageKey];
    if (!slideRankData) return;

    const topGenres = document.querySelectorAll("#top5Box .genre");
    const bottomGenres = document.querySelectorAll("#bottom5Box .genre");

    const setGenres = (realIndex) => {
      const data = slideRankData[realIndex] ?? slideRankData[0];
      topGenres.forEach((el, i) => (el.textContent = data.top5[i] ?? ""));
      bottomGenres.forEach((el, i) => (el.textContent = data.bottom5[i] ?? ""));
    };

    // ✅ 이 페이지의 결과 swiper만 잡기
    const sliderEl = document.querySelector("main .portfolio-details-slider.swiper");
    if (!sliderEl) return;

    const waitForSwiper = (triesLeft = 180) => {
      const swiper = sliderEl.swiper;

      if (swiper) {
        setGenres(swiper.realIndex);
        swiper.on("realIndexChange", () => setGenres(swiper.realIndex));
        swiper.on("slideChange", () => setGenres(swiper.realIndex));
        return;
      }

      if (triesLeft <= 0) return;
      requestAnimationFrame(() => waitForSwiper(triesLeft - 1));
    };

    waitForSwiper();
  });


  (() => {
    "use strict";

    // ✅ subPage에서만 실행
    if (!document.body.classList.contains("portfolio-details-page")) return;

    const scrollBtn = document.querySelector("#scroll-control"); // id는 scroll-control로 통일
    const sections = document.querySelectorAll("section[data-scroll-step]");

    if (!scrollBtn || sections.length === 0) return;

    function updateScrollButton() {
      const currentBottom = window.scrollY + window.innerHeight;
      const last = sections[sections.length - 1];

      const isLast =
        currentBottom >= last.offsetTop + last.offsetHeight - 50;

      if (isLast) {
        scrollBtn.dataset.mode = "top";
        scrollBtn.innerHTML = `<i class="bi bi-arrow-up-short"></i>`;
      } else {
        scrollBtn.dataset.mode = "next";
        scrollBtn.innerHTML = `<i class="bi bi-arrow-down-short"></i>`;
      }

      scrollBtn.classList.add("active");
    }

    scrollBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (scrollBtn.dataset.mode === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // ✅ 다음 섹션으로 이동
      const y = window.scrollY + 10;
      for (const sec of sections) {
        if (sec.offsetTop > y) {
          window.scrollTo({ top: sec.offsetTop, behavior: "smooth" });
          return;
        }
      }
    });

    window.addEventListener("load", updateScrollButton);
    window.addEventListener("scroll", updateScrollButton);
  })();

  document.querySelectorAll('#navmenu a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();

      const offset = 20; // page-title 보정
      const y = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: y, behavior: 'smooth' });

      // 모바일 메뉴 닫기
      if (document.querySelector('.header-show') && headerToggleBtn) {
        headerToggle();
      }
    });
  });




})();
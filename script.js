// 動態設定基礎路徑 (由 HTML 中的 script 定義)
const baseUrl = window.basePath || '';
const pages = [
  baseUrl + "/assets/pages/page-01.webp",
  baseUrl + "/assets/pages/page-02.webp",
  baseUrl + "/assets/pages/page-03.webp",
  baseUrl + "/assets/pages/page-04.webp",
  baseUrl + "/assets/pages/page-05.webp",
  baseUrl + "/assets/pages/page-06.webp",
  baseUrl + "/assets/pages/page-07.webp",
  baseUrl + "/assets/pages/page-08.webp",
  baseUrl + "/assets/pages/page-09.webp",
  baseUrl + "/assets/pages/page-10.webp",
  baseUrl + "/assets/pages/page-11.webp",
  baseUrl + "/assets/pages/page-12.webp",
  baseUrl + "/assets/pages/page-13.webp",
  baseUrl + "/assets/pages/page-14.webp",
  baseUrl + "/assets/pages/page-15.webp",
  baseUrl + "/assets/pages/page-16.webp",
  baseUrl + "/assets/pages/page-17.webp",
  baseUrl + "/assets/pages/page-18.webp",
  baseUrl + "/assets/pages/page-19.webp",
  baseUrl + "/assets/pages/page-20.webp",
  baseUrl + "/assets/pages/page-21.webp",
  baseUrl + "/assets/pages/page-22.webp",
  baseUrl + "/assets/pages/page-23.webp",
  baseUrl + "/assets/pages/page-24.webp"
];
const totalPages = pages.length;
let currentPage = 1;
let isAnimating = false;
const book = document.getElementById('book');
const leftSlot = document.getElementById('leftSlot');
const rightSlot = document.getElementById('rightSlot');
const leftPage = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');
const pageInput = document.getElementById('pageInput');
const spreadLabel = document.getElementById('spreadLabel');
const themeToggle = document.getElementById('themeToggle');

function isMobile() { return window.matchMedia('(max-width: 780px)').matches; }
function clampPage(n) { return Math.min(Math.max(1, Number(n) || 1), totalPages); }
function pageSrc(n) { return pages[n - 1]; }
function spreadStart(page) {
  if (isMobile()) return clampPage(page);
  if (page <= 1) return 1;
  return page % 2 === 0 ? page : page - 1;
}
function render() {
  currentPage = clampPage(spreadStart(currentPage));
  pageInput.value = currentPage;
  const mobile = isMobile();
  const coverMode = mobile || currentPage === 1 || currentPage === totalPages;
  book.classList.toggle('cover-mode', coverMode);
  leftSlot.classList.toggle('hidden', coverMode);
  rightSlot.classList.toggle('hidden', false);
  if (mobile || coverMode) {
    rightPage.src = pageSrc(currentPage);
    rightPage.alt = `第 ${currentPage} 頁`;
    spreadLabel.textContent = `Page ${currentPage} / ${totalPages}`;
  } else {
    leftPage.src = pageSrc(currentPage);
    leftPage.alt = `第 ${currentPage} 頁`;
    const right = Math.min(currentPage + 1, totalPages);
    rightPage.src = pageSrc(right);
    rightPage.alt = `第 ${right} 頁`;
    spreadLabel.textContent = `Pages ${currentPage}-${right} / ${totalPages}`;
  }
  document.getElementById('prevBtn').disabled = currentPage <= 1;
  document.getElementById('firstBtn').disabled = currentPage <= 1;
  document.getElementById('nextBtn').disabled = currentPage >= totalPages;
  document.getElementById('lastBtn').disabled = currentPage >= totalPages;
}
function goTo(page, direction = 'next') {
  const target = clampPage(page);
  if (target === currentPage || isAnimating) return;
  isAnimating = true;
  book.classList.add(direction === 'prev' ? 'turn-prev' : 'turn-next');
  setTimeout(() => {
    currentPage = spreadStart(target);
    render();
    book.classList.remove('turn-prev', 'turn-next');
    isAnimating = false;
  }, 230);
}
function nextPage() {
  const step = isMobile() || currentPage === 1 ? 1 : 2;
  goTo(currentPage + step, 'next');
}
function prevPage() {
  const step = isMobile() || currentPage <= 2 ? 1 : 2;
  goTo(currentPage - step, 'prev');
}

document.getElementById('nextBtn').addEventListener('click', nextPage);
document.getElementById('prevBtn').addEventListener('click', prevPage);
document.getElementById('stageNext').addEventListener('click', nextPage);
document.getElementById('stagePrev').addEventListener('click', prevPage);
document.getElementById('firstBtn').addEventListener('click', () => goTo(1, 'prev'));
document.getElementById('lastBtn').addEventListener('click', () => goTo(totalPages, 'next'));
pageInput.addEventListener('change', (e) => goTo(e.target.value, Number(e.target.value) < currentPage ? 'prev' : 'next'));
window.addEventListener('resize', render);
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
});
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  themeToggle.textContent = dark ? '日間模式' : '夜間模式';
  localStorage.setItem('flipbook-theme', dark ? 'dark' : 'light');
});
if (localStorage.getItem('flipbook-theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '日間模式';
}

// 設定 PDF 連結
const pdfLink = document.getElementById('pdfLink');
const pdfLink2 = document.getElementById('pdfLink2');
if (pdfLink) pdfLink.href = baseUrl + '/assets/report.pdf';
if (pdfLink2) pdfLink2.href = baseUrl + '/assets/report.pdf';

render();

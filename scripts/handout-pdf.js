/* Prints handout.html to handout.pdf (A4, page numbers) with the preinstalled
   Playwright Chromium. Not a site dependency: run only when the facilitator
   wants the PDF refreshed, after `node scripts/build-handout.mjs`.
     node scripts/handout-pdf.js */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const pg = await b.newPage();
  await pg.goto('file:///home/user/BookingSystem/handout.html', { waitUntil: 'load' });
  await pg.emulateMedia({ media: 'print' });
  await pg.pdf({ path: '/home/user/BookingSystem/handout.pdf', format: 'A4', printBackground: true,
    margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' },
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;font-size:9px;color:#505a5f;text-align:center;font-family:Arial,sans-serif;">Introduction to Business Analysis &middot; page <span class="pageNumber"></span> of <span class="totalPages"></span></div>' });
  await b.close();
})();

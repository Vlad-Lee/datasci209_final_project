// Chart tab switching: each .chart-tabs button carries data-sheet matching a
// sheet/dashboard name exactly as published in the Tableau workbook. Clicking
// a tab calls activateSheetAsync() on the tableau-viz in the same
// .figure-block, and toggles the .active class for styling.
//
// Standalone embeds (e.g. a future intro chart) can still auto-activate a
// default sheet once interactive via [data-default-sheet], independent of
// the tab-click wiring below.

document.addEventListener('DOMContentLoaded', () => {
  const readyVizzes = new WeakSet();
  document.querySelectorAll('tableau-viz').forEach((viz) => {
    viz.addEventListener('firstinteractive', () => readyVizzes.add(viz));
  });

  function activateSheet(viz, sheetName) {
    if (!viz || !sheetName) return;
    if (!readyVizzes.has(viz) || !viz.workbook || typeof viz.workbook.activateSheetAsync !== 'function') {
      console.warn('Viz not ready yet, skipping activateSheetAsync for', sheetName);
      return;
    }
    viz.workbook.activateSheetAsync(sheetName).catch((err) => {
      console.warn('Could not activate sheet', sheetName, err);
    });
  }

  document.querySelectorAll('tableau-viz[data-default-sheet]').forEach((viz) => {
    viz.addEventListener('firstinteractive', () => {
      activateSheet(viz, viz.dataset.defaultSheet);
    });
  });

  document.querySelectorAll('.figure-block').forEach((block) => {
    const viz = block.querySelector('tableau-viz');
    const tabs = block.querySelectorAll('.chart-tabs button');

    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabs.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activateSheet(viz, btn.dataset.sheet);
      });
    });
  });

  // Sidebar scroll-spy: highlight the link for whichever section is in view
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('section[id]');

  if (sidebarLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sidebarLinks.forEach((link) => link.classList.remove('active'));
          const match = document.querySelector(`.sidebar-link[data-section="${entry.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }
});

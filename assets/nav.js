// Shared navigation for the Process as Provenance mini-site.
// Injects the left sidebar (desktop) and top select (mobile) into any page
// that includes this script and has <div id="site-nav"></div> at the top of <body>.

(function () {
  const PAGES = [
    { href: 'docs.html', num: '01', title: 'The idea' },
    { href: 'foundation.html', num: '02', title: 'What already exists' },
    { href: 'model.html', num: '03', title: 'The data model' },
    { href: 'standards.html', num: '04', title: 'Fitting it to standards' },
    { href: 'questions.html', num: '05', title: 'Open questions & roadmap' },
  ];

  function currentFile() {
    const path = window.location.pathname.split('/').pop();
    return path === '' ? 'index.html' : path;
  }

  function buildSidebar(current) {
    const links = PAGES.map(p => {
      const isCurrent = p.href === current;
      return `<a href="${p.href}" class="${isCurrent ? 'current' : ''}">` +
        `<span class="num">${p.num}</span><span>${p.title}</span></a>`;
    }).join('');

    return `
      <aside class="side">
        <a class="mark" href="index.html">Process <span>as</span> Provenance</a>
        <div class="subhead">A working concept for research collaboration infrastructure</div>
        <nav>${links}</nav>
        <div class="side-note">
          <strong>Status:</strong> working draft, v0.2.<br>
          Five short documents, meant to be read in order or dipped into on their own.
        </div>
      </aside>`;
  }

  function buildTopbar(current) {
    const options = PAGES.map(p =>
      `<option value="${p.href}" ${p.href === current ? 'selected' : ''}>${p.num} — ${p.title}</option>`
    ).join('');

    return `
      <div class="topbar">
        <a class="mark" href="index.html">Process <span>as</span> Provenance</a>
        <select onchange="window.location.href=this.value">${options}</select>
      </div>`;
  }

  function init() {
    const mount = document.getElementById('site-nav');
    if (!mount) return;
    const current = currentFile();
    mount.innerHTML = buildTopbar(current) + '';
    // Sidebar goes inside .shell, before <main>, so build shell wrapper here isn't needed —
    // pages already place a #sidebar-mount inside .shell.
    const sidebarMount = document.getElementById('sidebar-mount');
    if (sidebarMount) sidebarMount.outerHTML = buildSidebar(current);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

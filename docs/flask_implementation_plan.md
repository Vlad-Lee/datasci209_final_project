# Implementation Plan: Scrollytelling Site in Flask

Builds the revised outline (`docs/scrollytelling_outline.md`) on top of the existing
`app.py` / `templates/w209.html` / `static/` structure. This is one long single-page
site (anchor nav to `#hypothesis-1` etc.), not separate pages per hypothesis - so
Flask's job is mostly to assemble partials and serve static assets; there's no
per-hypothesis routing needed.

---

## 1. File structure additions

```
app.py                        (add one route)
templates/
  base.html                   (new - <head>: Tableau embed JS, scroll JS/CSS)
  index.html                  (new - the scrollytelling page, includes partials)
  partials/
    cover.html
    intro.html
    hypothesis_1.html         (Vlad owns this)
    hypothesis_2.html         (placeholder, teammate owns)
    hypothesis_3.html         (placeholder, teammate owns)
    hypothesis_4.html         (placeholder, teammate owns)
    conclusion.html
  w209.html                   (existing - leave as-is or repurpose as a test route)
static/
  css/scrolly.css             (new - sticky-graphic / scrolling-text layout)
  js/scrolly.js                (new - Intersection Observer scroll-sync)
```

One partial per hypothesis matches the outline's per-teammate ownership and keeps
merge conflicts contained to each person's own file.

## 2. `app.py` route

```python
@app.route('/scrollytelling')
def scrollytelling():
    return render_template('index.html')
```

(Or make this the `/` route once it replaces the placeholder Hello World page -
your call on whether `w209.html` stays as a separate test/demo route.)

## 3. `templates/index.html` - assembly

```html
{% extends "base.html" %}
{% block content %}
  {% include "partials/cover.html" %}
  {% include "partials/intro.html" %}
  {% include "partials/hypothesis_1.html" %}
  {% include "partials/hypothesis_2.html" %}
  {% include "partials/hypothesis_3.html" %}
  {% include "partials/hypothesis_4.html" %}
  {% include "partials/conclusion.html" %}
{% endblock %}
```

## 4. Tableau embedding approach

Publish `final_project.twbx` **once** to Tableau Public as a single workbook
containing all sheets/dashboards (CA Map, Scatter Faceted, Scatter Faceted (TES),
3-city Dashboard, plus each teammate's sheets). One workbook URL, multiple sheets
inside it - avoids juggling separate embed URLs per chart.

Each chart-step gets one `<tableau-viz>` element pointed at `workbook_url#SheetName`:

```html
<div class="sticky-chart" data-step="1">
  <tableau-viz id="viz-h1-step1"
    src="https://public.tableau.com/views/YourWorkbook/ScatterFaceted"
    toolbar="bottom" hide-tabs>
  </tableau-viz>
</div>
```

For **Step 1's poverty toggle** specifically: build it as a Tableau **parameter**
inside the sheet itself (a filter driven by a calculated field referencing the
parameter) so the toggle is native Tableau UI - no custom JS needed to drive it.
Simpler than wiring Flask/JS to change Tableau state.

For the **scroll-triggered swap** between steps 1 → 2 → 3 (if you want one sticky
chart area that swaps content as the user scrolls, rather than 3 separate chart
divs stacking down the page): use the Embedding API v3 JS methods
(`workbook.activateSheetAsync('SheetName')`) inside the Intersection Observer
callback in `scrolly.js`, triggered when a text panel scrolls into view.

Simpler alternative if the JS sheet-switching feels fragile under deadline
pressure: just stack 3 separate `<tableau-viz>` embeds down the page, each sticky
within its own text-panel section (classic scrollytelling pattern, no
cross-chart JS coordination required). Recommend starting here and only adding
the single-sticky-chart-that-swaps version if time allows.

## 5. CSS layout (`static/css/scrolly.css`)

Standard scrollytelling grid: two-column layout per hypothesis section, graphic
column `position: sticky; top: 10vh;`, text column scrolls normally alongside it.

```css
.scrolly-section { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.sticky-chart { position: sticky; top: 10vh; height: 70vh; }
.text-panel { padding: 20vh 0; max-width: 480px; }
```

## 6. Scroll-sync JS (`static/js/scrolly.js`)

Intersection Observer watching each `.text-panel`; on intersect, add an
`.active` class (for any visual highlighting) and, if using the single-sticky
approach from step 4, call `activateSheetAsync` on the corresponding viz.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.text-panel').forEach(el => el.classList.remove('active'));
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.text-panel').forEach(el => observer.observe(el));
```

## 7. Deployment notes

No changes needed to `vercel.json` - it already builds `app.py` and serves
`static/**`. Tableau Embedding API v3 loads from Tableau's CDN (`<script
type="module" src="https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js">`),
so it doesn't count against the 250MB Vercel package limit - it's loaded
client-side, not installed as a Python dependency.

## 8. Suggested build order

1. Publish `final_project.twbx` to Tableau Public (all sheets in one workbook)
2. Build `base.html` + `scrolly.css` + `scrolly.js` skeleton (empty sections, just
   verify sticky-scroll layout works)
3. Build `partials/hypothesis_1.html` fully (you have the content already)
4. Build `cover.html`, `intro.html`, `conclusion.html` (shared, lower effort)
5. Teammates fill in `hypothesis_2/3/4.html` following the H1 pattern
6. Wire up the `/scrollytelling` route, test locally with `flask --app app.py --debug run`
7. Deploy to Vercel, verify Tableau embeds render (Tableau Public embeds can be
   blocked by strict browser tracking-protection settings - test in an
   incognito window too)

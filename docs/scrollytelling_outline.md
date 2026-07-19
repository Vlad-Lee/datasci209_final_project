# Tree Equity Scrollytelling - Full Site Outline (Revised)

> **Revision note (updated):** An earlier version of this doc trimmed H1 to
> 3-4 charts on the assumption that 5-6 per hypothesis across 4 hypotheses
> would be too heavy. Looking at comparable class projects (e.g. the "Mapping
> Food Deserts" site), 5-6 charts per hypothesis, presented as tabs within
> one figure rather than as separate scroll-steps, is normal and reads fine.
> H1 is back to 5 chart-tabs in one Figure block: statewide scatter, faceted
> by city (raw), faceted by city (poverty filter), Tree Equity Score, and the
> 3-city map. Same approach (one Figure, multiple tabs) is recommended for
> H2-H4 rather than the earlier 3-4 chart-step guidance.

---

## SITE STRUCTURE

```
#cover
#intro
#hypothesis-1   ← Vlad (Tree Canopy & Children)
#hypothesis-2
#hypothesis-3
#hypothesis-4
#conclusion
```

Nav bar links to each section. Each hypothesis has its own scroll sequence, aiming for **3–4 chart-steps max**.

---

## COVER

**Heading:** Shaded or Shadowed?
**Subheading:** Tree Equity in California's Neighborhoods

**Hook stat:**
- "16% - California's statewide average tree canopy coverage"
- "1 in 3 California children lives in a neighborhood below that average"

**CTA:** [Begin Reading ↓]

---

## INTRO (shared, ~1 scroll step)

**Text:**
> Tree canopy isn't just scenery. Shade reduces urban heat, improves air quality, and supports child health outcomes. But access to tree cover in California isn't equal - it follows the same fault lines of income, race, and density that shape other environmental burdens. This project asks: who has shade, and who doesn't?

**Visual:** Static CA choropleth (CA Map) - statewide canopy overview, orientation only. Also carries the statewide scatter's headline stat in text form, so H1 doesn't need to repeat it as its own chart.

---

## HYPOTHESIS 1 - "More Children, Less Shade"

*Do neighborhoods with higher child populations have less tree canopy - and does this hold across California's cities?*

---

### Step 1 - Setup + anomaly: faceted breakdown with poverty toggle

**Sticky chart:** Faceted scatter, 5 panels (LA, Riverside, Sacramento, San Diego, San Francisco), raw treecanopy y-axis. Built-in **Tableau parameter control**: "All block groups" / "High-poverty only (≥20%)".

**Text panel:**
> California neighborhoods with more children consistently show less tree canopy - a pattern that holds statewide and across most of the state's five largest urban areas. LA, Riverside, and Sacramento confirm it clearly. But **San Diego and San Francisco appear to break it**, showing flat or positive slopes.
>
> Toggle the filter above to high-poverty block groups only: **San Diego's positive slope collapses**. Its apparent exception was an artifact of wealthy neighborhoods - filtering to poverty removes the noise. San Francisco's slope softens but persists, hinting at something more structural.

*(Replaces old Steps 1–3. One interactive chart instead of three static ones.)*

---

### Step 2 - Resolution: switch to Tree Equity Score

**Sticky chart:** Same faceted scatter, y-axis swapped to AVG(TES).

**Text panel:**
> Raw canopy has a blind spot: it measures trees, not equity. The **Tree Equity Score (TES)** folds in income, urban heat, health outcomes, and density alongside canopy - a neighborhood can have adequate trees and still score low if conditions make shade more critical there.
>
> Switching to TES, the exceptions disappear. **All five cities show a negative relationship** between child share and tree equity. This is the key finding: the tree equity gap for children is universal across California's urban areas.

---

### Step 3 - Geography: mapping the depth of the gap

**Layout:** Side-by-side dashboard - LA + SD + SF maps, colored by Child Canopy Status.

**Text panel:**
> **Los Angeles** is overwhelmingly red in its urban core - deficit concentrated exactly where children are most dense. Green appears only at the wealthy hillside periphery or low-density outer areas.
>
> **San Diego** shows more variation - mature street tree networks inner-city, lagging suburban fringe.
>
> **San Francisco** shows a compressed range, few extreme outliers, but equity gaps persist in the Tenderloin and Bayview.

---

### Step 4 - Takeaway

**No chart - full-width text or pull quote**

> **Finding:** California's tree equity gap for children is structural and citywide. Raw canopy can mislead - the San Diego and San Francisco exceptions disappear once controlling for income or measuring equity directly. Los Angeles's deficit runs deepest. Where a child lives determines not just whether they have shade, but whether their neighborhood is on the path to getting it.

**Callout stats:**
- LA trend line slope: most negative of all 5 cities
- All 5 cities show negative TES slope when measuring equity
- SD exception: vanishes when filtering to poverty ≥ 20%

---

## HYPOTHESIS 2 - [Teammate]

*[Placeholder - aim for same 3–4 step structure: setup/anomaly → resolution → geography/depth → takeaway]*

---

## HYPOTHESIS 3 - [Teammate]

*[Placeholder - same structure]*

---

## HYPOTHESIS 4 - [Teammate]

*[Placeholder - same structure]*

---

## CONCLUSION

**Text:**
> Across four hypotheses, the data tells a consistent story: tree inequity in California follows the same structural patterns as other environmental burdens - concentrated in low-income, high-density, high-child neighborhoods, and deepest in cities with the most severe historical underinvestment.
>
> The good news: Los Angeles, San Diego, and San Francisco all have active equity tree planting programs. The challenge: LA's deficit is too deep for programs to offset in the short term. Investment is happening - but the gap remains structural.

**Data source credit + team names**

---

## TABLEAU SHEETS NEEDED (H1 - revised)

| Step | Chart | Sheet Name | Notes |
|------|-------|-----------|-------|
| Intro | CA overview | CA Map | Static, shared across site |
| 1 | 5-city faceted, poverty toggle | Scatter Faceted | Add a Tableau **parameter** (All / High-poverty ≥0.20) driving a calculated filter field - one sheet instead of two |
| 2 | 5-city faceted (TES) | Scatter Faceted (TES) | Swap y-axis to AVG(TES), save as new sheet |
| 3 | City maps | Dashboard (3-city) | LA Map + SD Map + SF Map side by side |

**Down from 5 unique Tableau objects to 3** (plus the shared CA Map), while keeping every finding in the narrative.

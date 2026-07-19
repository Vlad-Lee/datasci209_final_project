# Midterm Presentation - Hypothesis 1 Slides

3 slides covering: design iteration, prototype walkthrough, testing plan.
Assumes ~3 min of the team's 15-minute slot for this section.

---

## Slide 1 - Design Evolution

**Title:** More Children, Less Shade: How the Design Evolved

**On slide:** Cropped screenshot of the real Statewide Scatter chart (trend
line + points, legend excluded) on the right. Bullet list on the left, one
line per step, parallel phrasing so the progression reads at a glance:

1. Statewide: downward trend, more children, less canopy
2. Faceted by 5 cities: SD and SF appear to break the pattern
3. Filtered to high poverty: SD's exception disappears
4. Switched to Tree Equity Score: all 5 cities align negative
5. Mapped 3 cities: shows where the gap runs deepest

Small callout box: "All 5 steps live in one chart with tabs, so readers can
retrace our analysis instead of seeing only the final result."

**Speaker notes:**
- So as a first real pass, we looked at every census block
  group in California, child share on one axis, tree canopy on the other.
  And pretty clearly the trend line slopes down.
- What got interesting was when we broke that out by city. LA, Riverside,
  and Sacramento all followed the expected trend, but San Diego and
  San Francisco exhibited positive slopes.
- That made us stop and ask, is that a real difference in those two cities,
  or is something else going on? So we filtered down to just the
  high-poverty block groups, defined as neighborhoods with > 20% of people living below the poverty line,
  and San Diego's exception basically vanished,
  turns out it was wealthy neighborhoods pulling the average up. San
  Francisco's softened too, but it didn't fully go away.
- So we realized raw canopy alone wasn't telling the whole story,
  and we switched to the Tree Equity Score instead, which accounts for income,
  heat, and health need along with canopy.
- Once we did that, all five cities lined up negative. Which is really
  the headline finding here, this isn't a one-city problem, it's universal.


---

## Slide 2 - Prototype Walkthrough

**Title:** Prototype: Interactive Chart + Narrative

**On slide:** Screenshot of the live Flask page, chart with the five tab
buttons above it ("Statewide Scatter", "Faceted by City (Raw Canopy)",
"Faceted by City (Poverty Filter)", "Tree Equity Score", "3-City Map") and
prose paragraphs below. Annotate with an arrow: "Click a tab -> chart swaps
sheets live, no page reload."

**Speaker notes:**
- One Tableau workbook, embedded once, the five tabs call Tableau's
  Embedding API to swap sheets instantly.
- Each tab represents a different chart in our analysis, statewide,
  faceted, filtered, equity score, and the maps.
- For the map view, we split every block group into four categories,
  comparing its child share against a 25% cutoff and its canopy against the
  statewide average of about 16%. That gives us high-child/low-canopy,
  high-child/adequate-canopy, and the two low-child equivalents, that's the
  red-versus-green you see on the maps.
- One thing we noticed: because the chart sits above the text, switching
  tabs can mean scrolling back up to see the change and back down to keep
  reading, that's a real friction point for the viewer.
- For the next iteration, we're planning to try giving each chart its own
  scrolling section instead, so the reader never has to jump away from the
  text to see the chart update.

*(If demoing live: click through each tab, pause 2-3 seconds on each so the
audience can see the chart actually change.)*

---

## Slide 3 - Testing Plan & Feedback

**Title:** How We'll Test This

**On slide (bullets, kept short for the room to read at a glance):**
- Peer walkthroughs: can a first-time reader state our TES finding after
  reading H1 alone, without prompting?
- Interaction check: do people notice and use all five chart tabs, or stop
  after the first one or two?
- Readability check: are faceted city labels and the 3-city map legible at
  normal viewing size, or do they need further enlarging/relabeling?
- Mobile/responsive pass: does the chart stay usable below 800px width with
  five tabs instead of three?
- Accuracy pass: cross-check trend line slopes and callout stats against
  the underlying data before final submission

**Feedback:** [your email]

**Speaker notes:**
- Peer walkthroughs: sit someone down with just the H1 section, ask them to
  state the finding back without prompting, tests if the structure
  communicates on its own.
- With five tabs now instead of three, watch whether people explore all
  five or stop partway, tells us if the tab pattern scales.
- Specifically check legibility, some city facet labels were truncating in
  early testing, confirm that's fixed before relying on it.
- Responsive pass needed since this will be viewed on laptops during
  grading and possibly phones.
- Final accuracy check on all stats before submission.
- Feedback welcome anytime at [your email], shown on the last slide.

---

## Notes for assembling into the shared team deck

- Replace `[your email]` with your actual contact email before presenting.
- If teammates want a consistent format, this 3-slide shape (iteration ->
  prototype -> testing) can be reused for H2-H4: swap the chart steps and
  screenshot, keep the structure. Five to six chart-tabs per hypothesis in
  one Figure block is the agreed pattern.
- Since all team members must participate, plan for you to present these 3
  slides while teammates present their own hypothesis sections in between.

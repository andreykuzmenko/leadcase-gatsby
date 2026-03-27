# Leadcase — Test Cases

## 1. Home Page

### 1.1 Page Load
- [ ] Page loads at `/` without errors
- [ ] Title "Leader's toolbox" is visible
- [ ] Subtitle is visible
- [ ] All 54 topic cards are rendered
- [ ] "All" filter button is active by default

### 1.2 Topic Cards
- [ ] Each card shows a thumbnail image (or placeholder letter if image missing)
- [ ] Each card shows a title and description
- [ ] Cards have hover effect (shadow + slight lift)
- [ ] Clicking a card navigates to `/topics/{slug}` (no trailing slash)

### 1.3 Tag Filtering
- [ ] All 10 tag filter pills are visible: Team activation, Communication, Coaching, Self-awareness, Change Management, Decision-Making, Facilitation, Problem solving, Mentoring, People development
- [ ] Clicking a tag filters the grid to show only matching topics
- [ ] Active tag is highlighted in green
- [ ] URL updates to `/?tag={tagId}` when a filter is selected
- [ ] Clicking the active tag again (or "All") clears the filter and shows all topics
- [ ] Loading `/?tag=coaching` directly shows pre-filtered results
- [ ] Invalid tag in URL (e.g. `/?tag=unknown`) shows all topics (no crash)

### 1.4 Navigation
- [ ] Logo click navigates to `/`
- [ ] "Library" nav link navigates to `/`
- [ ] "About" nav link navigates to `/about`
- [ ] Active nav link is visually highlighted

---

## 2. Topic Page

### 2.1 Page Load
- [ ] Page loads at `/topics/{slug}` without errors
- [ ] No trailing slash is added to the URL
- [ ] Navigating to `/topics/{slug}/` (with slash) redirects to `/topics/{slug}`
- [ ] Correct title, description, and tags are shown

### 2.2 Header Card
- [ ] Topic thumbnail image is displayed (90×90px)
- [ ] Topic title is displayed
- [ ] Topic description is displayed
- [ ] Tag pills are displayed below the title

### 2.3 Tag Links
- [ ] Clicking a tag pill on a topic page navigates to `/?tag={tagId}`
- [ ] The home page opens with that tag pre-selected

### 2.4 Content Cards
- [ ] Multiple section cards are rendered below the header
- [ ] Each card shows its section heading
- [ ] Each card shows its image (if present)
- [ ] Each card renders formatted text (lists, bold, links, etc.)

### 2.5 Additional Links
- [ ] External links section is visible (if topic has links)
- [ ] Each link shows a title and opens the correct URL in a new tab

### 2.6 Related Topics
- [ ] Related topics section is visible (if topic has related entries)
- [ ] Related topic cards are displayed in a 2-column grid
- [ ] Clicking a related card navigates to the correct topic page

---

## 3. About Page

- [ ] Page loads at `/about` without errors
- [ ] Author photo, name, and bio are visible
- [ ] Social/contact links are present and correct

---

## 4. Library Page

- [ ] Navigating to `/library` redirects to `/`

---

## 5. 404 Page

- [ ] Navigating to a non-existent URL (e.g. `/does-not-exist`) shows the 404 page
- [ ] 404 page contains a link back to the home page

---

## 6. Analytics & Tracking

### 6.1 Mixpanel — Topic Open
- [ ] Opening a topic page fires a `Topic` event in Mixpanel
- [ ] Event properties include `Id`, `Title`, and `Slug`

### 6.2 Mixpanel — Filter Selection
- [ ] Clicking a tag filter fires a `Filter` event in Mixpanel
- [ ] Event properties include `Id` and `Title`
- [ ] Clicking "All" does NOT fire a Filter event

### 6.3 Google Analytics
- [ ] GA pageview is sent on initial load
- [ ] GA pageview is sent on navigation between pages

---

## 7. SEO & Meta Tags

- [ ] Each topic page has a unique `<title>` tag
- [ ] Each topic page has a `<meta name="description">` tag
- [ ] OG tags (`og:title`, `og:description`, `og:image`) are present on topic pages
- [ ] Twitter card meta tags are present on topic pages
- [ ] `sitemap.xml` is accessible at `/sitemap.xml`

---

## 8. Responsive Design

- [ ] Home page grid adjusts column count on mobile (< 640px)
- [ ] Topic page content is readable on mobile
- [ ] Filter pills wrap to multiple rows on small screens
- [ ] Navigation header is usable on mobile

---

## 9. URL Integrity

- [ ] No topic page URL includes a trailing slash
- [ ] All internal links use correct paths
- [ ] Tag filter URLs are lowercase kebab-case (e.g. `/?tag=decision-making`)
- [ ] 54 topic pages are all reachable without 404

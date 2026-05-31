# i18n Language Switcher Design

## Goal

Add a language switching button to the Gene Pad static website, supporting Chinese (zh), English (en), German (de), and French (fr). The switcher enables instant, no-refresh language switching with user preference persisted to localStorage.

## Scope

Two HTML pages in `docs/`:
- `index.html` — product landing page
- `tech-support.html` — technical reference page

## Approach: Inline Translation Dictionary

A `translations` object is embedded directly in each HTML file's `<script>` block. All translatable elements receive a `data-i18n="key"` attribute. On language switch, JS iterates over these elements and replaces their text content.

### Why inline over external JSON / multi-page

- Zero dependencies, zero extra HTTP requests — fits the existing no-framework, inline-script style
- Single source of truth per page — no file synchronization issues
- Instant switching — no network latency

## UI Design

### Button location

Navigation bar `<nav>`, rightmost position. Rendered as a dropdown button showing the current language name.

### Dropdown content

Four options:
| Code | Display Name |
|------|-------------|
| zh   | 中文        |
| en   | English     |
| de   | Deutsch     |
| fr   | Français    |

Current language is visually highlighted (bold or checkmark).

### Mobile behavior

Inside the hamburger menu, the language options render as a flat link list (no dropdown).

## data-i18n Mechanism

### Standard text elements

```html
<a href="#features" data-i18n="nav.features">功能</a>
```

On switch: `el.textContent = translations[lang]["nav.features"]`

### Special elements

| Attribute | Target |
|-----------|--------|
| `data-i18n` | `textContent` |
| `data-i18n-placeholder` | `placeholder` attribute |
| `data-i18n-aria` | `aria-label` attribute |
| `data-i18n-title` | `<title>` text |
| `data-i18n-meta` | `<meta name="description">` content |

### Translation dictionary structure

```js
const translations = {
  zh: {
    "html.lang": "zh-CN",
    "title": "基因工坊 - 免费基因图谱编辑工具",
    "meta.description": "基因工坊是一款免费的基因图谱编辑工具...",
    "nav.features": "功能",
    // ... all keys
  },
  en: { /* ... */ },
  de: { /* ... */ },
  fr: { /* ... */ }
};
```

## Switching Logic

```js
function setLanguage(lang) {
  document.documentElement.lang = translations[lang]["html.lang"];
  document.title = translations[lang]["title"];
  // update meta description
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  localStorage.setItem('lang', lang);
  updateLangButton(lang);
}

// On page load
const savedLang = localStorage.getItem('lang') || 'zh';
if (savedLang !== 'zh') setLanguage(savedLang);
```

## Files Modified

| File | Change |
|------|--------|
| `docs/index.html` | Add `data-i18n` attrs, translation dict, switcher button, switcher JS |
| `docs/tech-support.html` | Same as above (independent translation dict) |
| `docs/styles.css` | Add `.lang-switcher` and `.lang-dropdown` styles |

## What Is NOT Translated

- Link URLs
- Image filenames
- Code blocks in tech-support.html
- Technical terms used as-is across languages (GeneBank, DNA, AB1, etc.)
- CSS pseudo-element content (e.g., "点击预览" — handled via JS or left in Chinese)

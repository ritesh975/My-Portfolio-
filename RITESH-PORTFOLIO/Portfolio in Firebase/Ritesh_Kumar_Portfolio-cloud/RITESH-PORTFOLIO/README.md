# Ritesh Kumar Kasaudhan — Portfolio

## Folder structure
```
RITESH-PORTFOLIO/
├── index.html
├── css/style.css
├── js/main.js
├── images/                     -> public images (profile photo, certificates used on-page)
├── documents/                  -> PUBLIC downloadable files
│   └── Ritesh_Kumar_Resume.pdf   (placeholder — replace with your real resume)
└── private-documents/          -> PASSWORD-PROTECTED area
    ├── aadhaar.pdf, class-10-result.pdf, class-12-result.pdf, bca-result.pdf
    └── images/                 -> scanned photo/ID documents (kept separate from the PDFs)
        └── aadhaar-front.jpg, aadhaar-back.jpg, passport-photo.jpg
```

## What was added in this version
- **Home page:** a "View Resume" button next to "View Projects".
- **Experience/Internship cards:** a "View Certificate" button on every card — opens the certificate image in an on-page preview (lightbox), no new tab needed.
- **Certificates cards:** a "View" button on every card — same lightbox preview.
- **Project cards:** two buttons per project — "View Demo" and "View Repo" (with icons).
- **Private Documents:** every file now has both a **View** button and a **Download** button. Photo/scanned documents are kept in their own `private-documents/images/` folder, separate from PDFs.
- **Contact section & footer:** LinkedIn, GitHub, Instagram, LeetCode, HackerRank and a Placement-profile icon, each a real clickable link (`<a>` tag).
- General responsiveness pass: buttons, document cards and social icons stack cleanly on mobile.

## Before publishing — what to edit and where

| # | What to change | Where in the code |
|---|---|---|
| 1 | Real email for the contact form | `js/main.js` → search `your-email@example.com` |
| 2 | Resume file | Replace `documents/Ritesh_Kumar_Resume.pdf` with your real resume (same file name = no code change needed) |
| 3 | Project "View Demo" links | `index.html` → search `View Demo`, replace each `href="#"` with the live/hosted link for that project |
| 4 | Project "View Repo" links | `index.html` → search `View Repo`, replace `https://github.com/ritesh975` with that project's **exact repo URL** |
| 5 | LinkedIn link | `index.html` → search `linkedin`, replace both `href="#"` occurrences (Contact section + footer) with your LinkedIn profile URL |
| 6 | Instagram, LeetCode, HackerRank, Placement-profile links | `index.html` → search `Instagram`, `LeetCode`, `HackerRank`, `Placement Profile` — replace the `href="#"` on each with your real profile URL. If "Placement Profile" isn't the right label for what you meant, just rename that one link's text/icon. |
| 7 | Private documents password | `js/main.js` → search `PRIVATE_PASSWORD`, change `'Ritesh@2026'` to your own password |
| 8 | Private PDF files | Drop your real files into `private-documents/` using the exact names listed in `private-documents/README.txt` |
| 9 | Private photo/ID images | Drop your scanned images into `private-documents/images/` using the exact names listed in `private-documents/images/README.txt` |
| 10 | Adding/removing a project, certificate or experience card | Copy an existing `<article class="proj-card">` / `.cert-card` / `.exp-card` block in `index.html` and edit the text, image path and links inside it |

## Run locally
Just open `index.html` in a browser — no build step, no server required.

## Future Enhancement: Firebase Authentication (next version)

The current "Private Documents" area is a **frontend-only password gate**: the password check happens in `js/main.js`, which means anyone who downloads the site's files can read the password or the file paths directly. It's fine for keeping casual visitors out, but it is **not real security** for documents like Aadhaar cards.

For genuine protection, a future version can use:
1. **Firebase Authentication** — real sign-in (email/password or Google), so a document is only shown after Firebase confirms who the visitor is, on Google's servers (not in your JavaScript file).
2. **Firebase Storage / Firestore with Security Rules** — the actual PDF/image files live in Firebase Storage instead of your GitHub repo, and Storage Security Rules only allow a signed-in, approved user (e.g. only your own email) to download them. Nobody can just guess a URL to bypass it.
3. **A small "admin allow-list"** — a Firestore document listing which signed-in email(s) are allowed to view the private documents, checked by the Security Rules.

This is a backend/infrastructure change (needs a free Firebase project, a bit of setup, and rewriting the private-documents JS to call Firebase's SDK instead of comparing a plain-text password). It's a good "v2" upgrade once the static site itself is finalized and published — happy to build that version when you're ready.

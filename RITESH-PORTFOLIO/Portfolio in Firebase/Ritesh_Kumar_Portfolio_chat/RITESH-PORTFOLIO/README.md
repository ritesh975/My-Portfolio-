# Ritesh Kumar Kasaudhan — Portfolio

Responsive personal portfolio built with HTML, CSS and JavaScript, with a Firebase-protected private document area.

## Folder structure

```text
RITESH-PORTFOLIO/
├── index.html                 # Main page: text, links, projects, education, social links
├── css/
│   └── style.css              # Complete website styling + responsive design
├── js/
│   ├── main.js                # Navigation, animations and contact form
│   ├── firebase-config.js      # YOUR Firebase web-app config goes here
│   └── firebase-private.js     # Firebase login + secure document view/download
├── images/                    # Profile, internship and certificate images
├── documents/                 # Public files such as resume
│   └── README.txt
├── private-documents/         # Do NOT deploy sensitive files from here
│   ├── README.txt
│   └── IMG-document/
│       └── README.txt
└── firebase-storage.rules     # Storage security rules
```

## 1. Home page — View Resume

The Home button is already connected to:

`documents/Ritesh_Kumar_Resume.pdf`

Put your resume in `documents/` with exactly this name. If your file has another name, edit the `href` on the **View Resume** button in `index.html`.

## 2. Projects — Demo + Repo

Each project has:

- View Demo button/icon
- View Repo button/icon

The repository links currently point to your GitHub profile because individual repository URLs were not available when this version was prepared.

To add real project links, edit the project card in `index.html` and replace:

```html
href="#" data-project-demo="weather"
```

with:

```html
href="https://your-real-demo-url.com"
```

Also replace the GitHub profile URL with the exact repository URL for that project.

## 3. Experience / Internship — View option

Internship/training cards have a **View Internship / View Training** button. The current buttons open the corresponding certificate image from `images/`.

If you have a PDF certificate or official credential URL, replace the button `href` in `index.html`.

## 4. Certificates — View option

Every certificate card has a **View Certificate** button. Replace an image path with a PDF/official verification URL whenever you have one.

## 5. Education

Education is a normal public section. Update degree names, years, marks and institution names directly in the `#education` section of `index.html`.

## 6. Social links

Current exact profile links included in this build:

- LinkedIn: `https://www.linkedin.com/in/ritesh-kasaudhan`
- GitHub: `https://github.com/ritesh975`
- Instagram: `https://www.instagram.com/its.ritesh_0005`
- HackerRank: `https://www.hackerrank.com/profile/riteshkasaudhan1`

LeetCode and Placecom are intentionally marked as edit points because an exact profile URL was not available.

Edit them in the `social-strip` section of `index.html`.

## 7. REAL secure Private Documents — Firebase

This version does **not** use a JavaScript password stored in the page. It uses:

- Firebase Authentication (Email/Password)
- Firebase Storage
- Firebase Storage Security Rules
- Authenticated view/download using Firebase Storage `getBlob()`

### Step A — Create Firebase project

1. Open Firebase Console.
2. Create a new project.
3. Add a **Web App**.
4. Copy the Web App configuration.
5. Open:

`js/firebase-config.js`

6. Replace all `YOUR_...` values.

The Firebase Web API key is intended to be present in frontend configuration. Security comes from Authentication and Storage Rules, not from hiding that key.

### Step B — Enable Authentication

Firebase Console → Authentication → Sign-in method → enable **Email/Password**.

Create one user for the private documents, preferably the authorized email already configured in:

`js/firebase-config.js`

Current authorized email:

`riteshkasaudhan975@gmail.com`

If you change it, change it in both `firebase-config.js` and `firebase-storage.rules`.

### Step C — Create Storage

Firebase Console → Storage → Get started.

Upload your private files using exactly these paths:

```text
private-documents/IMG-document/aadhaar.pdf
private-documents/IMG-document/class-10-result.pdf
private-documents/IMG-document/class-12-result.pdf
private-documents/IMG-document/bca-result.pdf
```

You can also use JPG/PNG files, but then update the `data-path` values in `index.html` and the file names in Firebase Storage.

### Step D — Apply Storage Rules

Open Firebase Storage Rules and use the rules in:

`firebase-storage.rules`

They allow reads only when:

- the user is signed in, and
- the signed-in email is the authorized private-document email.

Uploads are disabled from the website.

### Step E — Do NOT publish private documents

Never put Aadhaar, marksheets or other sensitive files inside the public website's `private-documents/IMG-document/` folder and deploy that folder to GitHub Pages, Netlify, Vercel or Firebase Hosting.

That local folder exists only to document the Firebase Storage path.

The actual private files belong in Firebase Storage.

## 8. Firebase hosting (optional)

You can host the public portfolio on Firebase Hosting, Vercel, Netlify or GitHub Pages. The private documents remain in Firebase Storage.

For Firebase Hosting:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

During hosting setup, select the portfolio folder as the public directory. Do not select a folder containing actual private documents.

## 9. Contact form

The contact form opens the user's email client and sends to:

`riteshkasaudhan975@gmail.com`

To change the recipient, edit `recipient` in `js/main.js`.

## 10. Quick edit map

| What you want to change | File | Where |
|---|---|---|
| Name / intro | `index.html` | Home section |
| Resume | `documents/Ritesh_Kumar_Resume.pdf` | Add file |
| Project title/description | `index.html` | Projects section |
| Project Demo URL | `index.html` | `data-project-demo` links |
| Project Repo URL | `index.html` | GitHub links in project cards |
| Internship View URL | `index.html` | Experience section buttons |
| Certificate View URL | `index.html` | Certificates section buttons |
| Education details | `index.html` | Education section |
| LinkedIn/GitHub/Instagram | `index.html` | Social strip/contact/footer |
| LeetCode/Placecom | `index.html` | Social strip edit points |
| Private document names | `index.html` | `.secure-doc` cards |
| Firebase config | `js/firebase-config.js` | Firebase Web App config |
| Private document access email | `js/firebase-config.js` + `firebase-storage.rules` | Authorized email |
| Website colors/layout | `css/style.css` | Variables / sections |
| Animations/navigation | `js/main.js` | JavaScript |

## Important security note

A static HTML password screen is not sufficient for Aadhaar or other sensitive documents. This version uses Firebase Authentication + Firebase Storage Rules instead. Keep the actual sensitive files only in the protected Firebase Storage path.

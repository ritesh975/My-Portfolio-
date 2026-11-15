PRIVATE DOCUMENTS
=================

This folder has TWO parts now:

1) PDF documents — put these directly inside private-documents/ with these
   exact file names (each has a View button + a Download button on the site):
   - aadhaar.pdf
   - class-10-result.pdf
   - class-12-result.pdf
   - bca-result.pdf

2) Photo / scanned ID images — put these inside the private-documents/images/
   sub-folder (kept separate from the PDFs above) with these exact names:
   - aadhaar-front.jpg
   - aadhaar-back.jpg
   - passport-photo.jpg

   (See private-documents/images/README.txt for details.)

Want to add another PDF or image?
1. Drop the file in the right folder above.
2. Open index.html, find the "PRIVATE DOCUMENTS" section (search for
   id="private-documents").
3. Copy an existing .doc-card block and change the title, file path
   (in both the View and Download links) and icon class.

IMPORTANT SECURITY NOTE:
This portfolio uses a client-side password gate for the UI only. Anyone who
has access to the website files can bypass it and access files directly.
Do NOT publish Aadhaar or other sensitive identity documents on a public
static website using this method alone.

For real protection, the next version of this site can use:
- Firebase Authentication (real login with email/password or Google sign-in)
- Firebase Storage / Firestore with security rules so only a signed-in,
  approved user can read the private files
See the "Future Enhancement: Firebase Authentication" section in the main
README.md for a short explanation of how that upgrade would work.

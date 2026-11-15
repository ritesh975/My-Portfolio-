PRIVATE DOCUMENT STORAGE

DO NOT put Aadhaar, marksheets, certificates or other sensitive files in this folder when deploying the static website.

Upload private files to Firebase Storage instead, using these paths:
private-documents/IMG-document/aadhaar.pdf
private-documents/IMG-document/class-10-result.pdf
private-documents/IMG-document/class-12-result.pdf
private-documents/IMG-document/bca-result.pdf

The website reads these files only after Firebase Authentication and Storage Security Rules allow the authorized account.

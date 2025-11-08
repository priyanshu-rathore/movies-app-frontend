# 🎬 Movie Manager Frontend (Next.js)

A robust, mobile-first frontend for managing collections of movies, built on Next.js—featuring authentication, image uploads, server-side pagination, and seamless integration with a NestJS backend.

---

## 🚀 Features

- **Authentication:** Supports both persistent (secure local) and session-based login for user flexibility.
- **Responsive Design:** Optimized for mobile, tablet, and desktop experiences.
- **Movie CRUD:** Create, edit, and delete movies. Every movie has a title, year, and poster image.
- **Poster Preview:** Image drop/picker with preview before upload.
- **Pagination:** Fast, server-driven pagination for large data sets.
- **Elegant UI:** TailwindCSS utility classes, modular component structure.

---

## 📦 Getting Started

### Installation

git clone https://github.com/priyanshu-rathore/movies-app-frontend.git
cd movies-app-frontend
npm install


### Environment Setup

Create `.env.local` in your root folder with:

NEXT_PUBLIC_MOVIE_API_URL=http://localhost:4000


Make sure the backend is running and accessible at this address.

---

## 🧑‍💻 Development

Start the app locally:

npm run dev


Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Authentication

- **Login:** On sign-in, tokens are saved either:
  - **React Secure Storage:** If "Remember Me" is ticked (survives browser restarts).
  - **Session Storage:** If "Remember Me" is not ticked (cleared on tab/browser close).
- **Context Provider:** Reads from both locations. All protected routes require a valid token.

Example logic:

if (rememberMe) {
secureLocalStorage.setItem("accessToken", token);
} else {
sessionStorage.setItem("accessToken", token);
}


---

## 🎬 Movie Management & Pagination

- **Create/Edit:** Poster uploaded as a file. Backend converts to base64 as needed.
- **Display:** All images and data retrieved from backend APIs.
- **Pagination:** Calls the endpoint `/movies/user/{userId}?page=<page>&limit=<limit>`, receives `{ movies, totalPages }`.

---

## 🗄️ Folder Structure

/components
/base-comp # Shared UI components
/movies # Movie listing, grid, drop zone, pagination, etc
/auth # Login, register, and context
/pages
/edit-movie # Edit UI
/create-movie # Add form
/movies # Main listing



---

## 📑 API Usage

- Uses Axios for HTTP requests.
- Auth token included in `Authorization` header.
- Poster image sent using `multipart/form-data`.

---

## 📱 Responsive UI

- Layout adapts for phones, tablets, desktops.
- Mobile: grid switches to 2-column, vertical scroll enabled, icon buttons appear where needed.
- Full accessibility and keyboard navigation supported.

---

## 🛡️ Security Notes

- No sensitive data is exposed in logs or UI.
- File uploads protected via backend validation.
- App checks auth state from secure and session storage: user cannot bypass protection.

---

## 📝 Contributing

PRs and issues welcome! Discuss new features or report bugs.

---

## © License

MIT. Use as you wish, commercial or personal.

---

This README covers every facet needed for onboarding, documenting, and scaling your Next.js movie manager frontend.

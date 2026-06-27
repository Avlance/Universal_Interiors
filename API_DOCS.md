# How the App Communicates with the Backend (API Guide)

This guide explains in simple terms what kind of information the website needs from your backend server. Whenever the website needs data or wants to submit a form, it talks to the backend through specific "endpoints" (URLs).

Here is a breakdown of what the website is trying to do, section by section.

---

## 1. Forms & Customer Interaction (Home Page)
When a user visits the home page and tries to contact you, the website sends their information to the backend.

* **Cost Estimation (`POST /cms/api/v1/estimation`)**
  * **What it does:** When a user fills out the "Get an Estimate" form, their details (like name, email, project size) are sent here so you can calculate a price for them.
* **Book a Consultation (`POST /cms/api/v1/book-consultation`)**
  * **What it does:** When a user wants to schedule a meeting, their contact details and preferred time are sent here.
* **Live Consultation (`POST /cms/api/v1/live-consultation`)**
  * **What it does:** Similar to the above, but specifically for booking an immediate or live virtual consultation.
* **OTP Phone Verification (`POST /cms/api/v1/otp/send` & `POST /cms/api/v1/otp/verify`)**
  * **What it does:** When a user enters their phone number, the app asks the backend to send them a text message code (OTP). Then, the app sends the code they typed back to the server to verify it's really them.

## 2. Customer Reviews
The website shows testimonials from happy customers on the home page.

* **Google Reviews (`GET /cms/api/v1/google-reviews`)**
  * **What it does:** The website asks the backend for a list of text reviews (names, star ratings, and comments) to display.
* **YouTube Reviews (`GET /cms/api/v1/youtube-reviews`)**
  * **What it does:** The website asks the backend for video links so it can embed YouTube video testimonials.

## 3. The Design Gallery
This is the portfolio section where users can browse different interior designs (like Kitchens, Bedrooms, etc.).

* **Get Categories (`GET /cms/api/v1/design-gallery`)**
  * **What it does:** The app asks, "What type of rooms do we have?" The backend should reply with categories like "Rooms & Spaces" or "Kitchen Designs".
* **Get Specific Designs (`GET /cms/api/v1/design-gallery/kitchen-designs/modular-kitchen?offset=0`)**
  * **What it does:** When a user clicks on "Modular Kitchen", the app asks the backend for a list of images and titles specifically for modular kitchens. The `offset=0` part is for pagination (loading more images as they scroll).
* **View Single Design (`GET /cms/api/v1/design-gallery/kitchen-designs/modular-kitchen/123`)**
  * **What it does:** If a user clicks on a single image to see more details, the app asks the backend for the specific details of that one design (using its ID, like `123`).

## 4. Guides & Articles
This section contains helpful articles or guides for users.

* **Similar to the Design Gallery**, the app asks for:
  * A list of all guide categories (`GET /cms/api/v1/guides`)
  * A list of guides within a specific category (`GET /cms/api/v1/guides/category/subcategory`)
  * The full article/content for a single guide (`GET /cms/api/v1/guides/category/subcategory/article-id`)

---

### Good to Know:
* All requests are sent in standard JSON format.
* If a user is logged in, the app will automatically attach a secret "Token" to prove who they are.
* **Fallback Mode:** Right now, if your backend isn't ready or these URLs don't exist yet, the website won't crash. Instead, it temporarily shows "fake" placeholder images and data so you can still see how the design looks!

Sambhav Official - Event Registration Frontend
A modern, responsive web interface built to handle high-volume event registrations and secure payment processing for the Sambhav Club.

🚀 Technical Stack
Framework: React.js (or Vite/Next.js as applicable)

Styling: Tailwind CSS / Material UI

State Management: React Context API / Redux (for handling multi-step form data)

Payment Gateway: Razorpay Checkout Integration

API Client: Axios (with withCredentials for session-based admin access)

🛠️ Key Features
1. Multi-Step Registration Flow
The frontend captures attendee information across multiple stages to ensure a clean UX. It utilizes a "Pre-registration" strategy where data is synced to the backend /api/pre-register endpoint before the payment begins. This ensures no user data is lost if a transaction is abandoned.

2. Secure Payment Processing
Integrated with the Razorpay Standard Checkout.

Signature Verification: Upon successful payment, the frontend sends the razorpay_payment_id, razorpay_order_id, and razorpay_signature to the /api/verify-payment endpoint for backend validation.

Real-time Feedback: Displays instant success/failure states based on the cryptographic verification performed by the server.

3. Dynamic Ticket Preview
A dedicated UI component that reflects the data structure used in the generated PDF tickets, including the attendee's name and unique Ticket ID (e.g., TICKET-17XXXXXXXX).

4. Admin Portal
A protected dashboard for club organizers to:

Authenticate via secure session-based login.

View a real-time list of all successful registrations fetched from /api/registrations.

Track payment statuses for Day 1 and Day 2 attendance.

🏗️ Folder Structure
Plaintext
src/
├── components/     # Reusable UI (Buttons, Inputs, Navbar)
├── pages/          # Home, Register, Success, AdminDashboard
├── services/       # API calling logic (Axios instances)
├── hooks/          # Custom hooks for form validation
└── utils/          # Formatting for dates and currency
🔧 Installation
Clone the repo:

Bash
git clone <frontend-repo-url>
Install Dependencies:

Bash
npm install
Configure Environment:
Create a .env file:

Code snippet
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
Run Development Server:

Bash
npm run dev
Developed by Shivanand H. Potle

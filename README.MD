dummy readme

---

## Features

- **Login Page** (`index.html`)  
  - Simple login with default credentials: `admin / root`  
  - Error messages for invalid login  

- **Home Page** (`homepages.html`)  
  - Welcome screen with navigation menu  
  - Background image and styled buttons  

- **Dashboard** (`dashboard.html`)  
  - Doughnut chart showing appointment overview (Completed vs Upcoming)  
  - Chart updates dynamically based on patient data from `patients.html`  
  - Patients list summary  

- **Patients Page** (`patients.html`)  
  - Full **CRUD** functionality (Add, Edit, Delete)  
  - Fields: Name, Phone Number, Appointment Type, Status (Completed / Upcoming)  
  - Updates chart dynamically on dashboard  
  - Stores data in localStorage  

- **Appointments Page** (`appointments.html`)  
  - Lists all appointments in a table  
  - Shows badges for Completed / Upcoming status  
  - Automatically connected with `patients.html` data  

- **Styling**  
  - Consistent, modern look using **Bootstrap 5** and custom CSS  
  - Cards, buttons, tables, and chart designed to be responsive and aesthetic  

- **Chart Integration**  
  - Doughnut chart using **Chart.js**  
  - Reflects current patient appointments (Completed vs Upcoming)  
  - Updates in real-time when adding or removing patients  

---

## Pages Overview

### index.html (Login)
- `bodyindex` class with background GIF  
- Login form with username and password fields  
- Redirects to `homepages.html` after successful login  

### homepages.html
- `bodyhome` class with background image  
- Navigation bar linking to Dashboard, Patients, Appointments  
- Menu buttons linking to management pages  

### dashboard.html
- `body` class with background image  
- Patients list on left  
- Doughnut chart centered  
- Buttons to filter Total / Upcoming / Completed appointments  

### patients.html
- `body` class with background image  
- Table showing all patients and details  
- Add new patients with Name, Phone, Appointment Type, Status  
- Delete or edit existing patients  
- Updates dashboard chart in real-time  

### appointments.html
- Table showing appointment lists  
- Status badges for Completed / Upcoming  
- Connected to `patients.html` data  

---

## Usage

1. Clone the repository:

```bash
git clone https://github.com/PureShinichi/PureClinicManager.git
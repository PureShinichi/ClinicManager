// login function
function Login(e) {
    e.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error-msg');

    errorMsg.classList.remove('show');

    if (!user || !pass) return;

    if (user === "admin" && pass === "root") {
        window.location.href = "homepages.html";
    } else {
        errorMsg.classList.add('show');
    }
}

// Sidebar toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
});

// Patients data
let patientsData = [];
let lastPatientID = 0;

function saveData() {
    localStorage.setItem('patientsData', JSON.stringify(patientsData));
    localStorage.setItem('lastPatientID', lastPatientID);
}

function loadData() {
    try {
        const storedData = JSON.parse(localStorage.getItem('patientsData'));
        lastPatientID = parseInt(localStorage.getItem('lastPatientID')) || 0;

        if (Array.isArray(storedData) && storedData.length > 0) {
            // Ensure each patient has an id
            patientsData = storedData.map((p, index) => ({
                id: p.id || index + 1,
                name: p.name || "Unknown",
                phone: p.phone || "N/A",
                type: p.type || "General Consultation",
                status: p.status || "Upcoming",
                doctor: p.doctor || "Dr.Hariz",
                date: p.date || new Date().toISOString().split('T')[0]
            }));
            // Update lastPatientID if missing
            lastPatientID = Math.max(...patientsData.map(p => p.id));
        } else {
            throw new Error();
        }
    } catch {
        //dummy data
        patientsData = [
            { id: 1, name: "Afiq", phone: "0123314003", type:"General Consultation", status:"Completed", doctor:"Dr.Hariz", date:"2025-12-12" },
            { id: 2, name: "Fatihah", phone: "0123456789", type:"Medical Checkup", status:"Completed", doctor:"Dr.Fatihah", date:"2025-12-15" },
            { id: 3, name: "Diniy", phone: "0152342213", type:"General Consultation", status:"Completed", doctor:"Dr.Granger", date:"2025-12-16" },
            { id: 4, name: "Zaireeq", phone: "0162352264", type:"Blood Test", status:"Completed", doctor:"Dr.Hariz", date:"2025-12-18" },
            { id: 5, name: "Syidi", phone: "0172389942", type:"Urine Test", status:"Completed", doctor:"Dr.Granger", date:"2025-12-19" },
            { id: 6, name: "Hariz", phone: "0192385523", type:"Medicine Collection", status:"Upcoming", doctor:"Dr.Hariz", date:"2025-12-22" },
            { id: 7, name: "Iman", phone: "0195239958", type:"General Consultation", status:"Upcoming", doctor:"Dr.Fatihah", date:"2025-12-24" },
            { id: 8, name: "Mirul", phone: "0165237734", type:"General Consultation", status:"Upcoming", doctor:"Dr.Granger", date:"2025-12-25" },
            { id: 9, name: "Fadhil", phone: "0136326643", type:"Eye Checkup", status:"Upcoming", doctor:"Dr.Hariz", date:"2025-12-26" }
        ];
        lastPatientID = patientsData.length;
        saveData();
    }
}

loadData();

//Render Patients Table (patients.html)
function renderPatientsList() {
  const tbody = document.querySelector('#patientsTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  patientsData.forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.phone}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Delete Patient 
function deletePatient(id) {
    if (!confirm("Are you sure you want to delete this patient?")) return;
    patientsData = patientsData.filter(p => p.id !== id);
    saveData();
    renderPatientsList();
    renderAppointmentsList();
    updateDashboardChart(window.dashboardChart);
}

// edit patient
document.addEventListener('DOMContentLoaded', () => {
    const editId = sessionStorage.getItem('editPatientId');
    if (editId) {
        const patient = patientsData.find(p => p.id === parseInt(editId));
        if (patient) {
            document.getElementById('patientId').value = patient.id;
            document.getElementById('patientName').value = patient.name;
            document.getElementById('patientPhone').value = patient.phone;
            document.getElementById('patientType').value = patient.type;
            document.getElementById('patientStatus').value = patient.status;
            document.getElementById('patientDoctor').value = patient.doctor;
            document.getElementById('patientDate').value = patient.date;
        }
        sessionStorage.removeItem('editPatientId'); // clear after use
    }
});

// Render Patients Table (patients.html)
function renderPatientsList() {
  const tbody = document.querySelector('#patientsTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  patientsData.forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.phone}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Appointments Table (appointments.html) with Edit/Delete
function renderAppointmentsList() {
  const tbody = document.querySelector('#appointmentsTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  patientsData.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td><input type="text" class="form-control form-control-sm" value="${p.name}"></td>
      <td><input type="text" class="form-control form-control-sm" value="${p.phone}"></td>
      <td>
        <select class="form-select form-select-sm">
          <option ${p.type === "General Consultation" ? "selected" : ""}>General Consultation</option>
          <option ${p.type === "Medical Checkup" ? "selected" : ""}>Medical Checkup</option>
          <option ${p.type === "Eye Checkup" ? "selected" : ""}>Eye Checkup</option>
          <option ${p.type === "Blood Test" ? "selected" : ""}>Blood Test</option>
          <option ${p.type === "Urine Test" ? "selected" : ""}>Urine Test</option>
          <option ${p.type === "Medicine Collection" ? "selected" : ""}>Medicine Collection</option>
        </select>
      </td>
      <td>
        <select class="form-select form-select-sm">
          <option ${p.status === "Completed" ? "selected" : ""}>Completed</option>
          <option ${p.status === "Upcoming" ? "selected" : ""}>Upcoming</option>
        </select>
      </td>
      <td>
        <select class="form-select form-select-sm">
          <option ${p.doctor === "Dr.Hariz" ? "selected" : ""}>Dr.Hariz</option>
          <option ${p.doctor === "Dr.Granger" ? "selected" : ""}>Dr.Granger</option>
          <option ${p.doctor === "Dr.Fatihah" ? "selected" : ""}>Dr.Fatihah</option>
        </select>
      </td>
      <td><input type="date" class="form-control form-control-sm" value="${p.date}"></td>
      <td>
        <button class="btn btn-sm btn-success save-btn">Save</button>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
      </td>
    `;
    
    // Save edits
    tr.querySelector('.save-btn').addEventListener('click', () => {
      p.name = tr.children[1].querySelector('input').value;
      p.phone = tr.children[2].querySelector('input').value;
      p.type = tr.children[3].querySelector('select').value;
      p.status = tr.children[4].querySelector('select').value;
      p.doctor = tr.children[5].querySelector('select').value;
      p.date = tr.children[6].querySelector('input').value;

      saveData();
      renderAppointmentsList(); // refresh table
    });

    // Delete patient
    tr.querySelector('.delete-btn').addEventListener('click', () => {
      if (confirm(`Delete patient ${p.name}?`)) {
        patientsData = patientsData.filter(x => x.id !== p.id);
        saveData();
        renderAppointmentsList();
      }
    });

    tbody.appendChild(tr);
  });
}



// Edit patient from appointments table
function editPatient(id) {
    const patient = patientsData.find(p => p.id === id);
    if (!patient) return;

    // Store patient id in sessionStorage to access on patients.html
    sessionStorage.setItem('editPatientId', id);

    // Go to patients.html
    window.location.href = 'patients.html';
}


//Dashboard Chart
function initDashboardChart() {
    const ctx = document.getElementById('appointmentsChart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Upcoming'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#28a745', '#ffc107']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });

    window.dashboardChart = chart;
    updateDashboardChart(chart);
}

function updateDashboardChart(chart) {
    const completed = patientsData.filter(p => p.status === 'Completed').length;
    const upcoming = patientsData.filter(p => p.status === 'Upcoming').length;
    chart.data.datasets[0].data = [completed, upcoming];
    chart.update();
}

// Form Submission (patients.html)
document.addEventListener('DOMContentLoaded', () => {
    renderPatientsList();
    renderAppointmentsList();
    initDashboardChart();

    const form = document.getElementById('patientForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('patientName').value.trim();
        const phone = document.getElementById('patientPhone').value.trim();
        const type = document.getElementById('patientType').value;
        const status = document.getElementById('patientStatus').value;
        const doctor = document.getElementById('patientDoctor').value;
        const date = document.getElementById('patientDate').value;

        if (!name || !phone || !type || !status || !doctor || !date) return;

        lastPatientID++;
        const newPatient = { id: lastPatientID, name, phone, type, status, doctor, date };

        patientsData.push(newPatient);
        saveData();

        form.reset();
        renderPatientsList();
        renderAppointmentsList();
        updateDashboardChart(window.dashboardChart);
    });
});

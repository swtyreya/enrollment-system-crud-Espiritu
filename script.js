// Base API paths
const API_BASE = "api/students/";
const PROGRAMS_API = "api/Programs/getPrograms.php"; 

// Form & table references
const studentForm = document.getElementById("studentForm");
const studentId = document.getElementById("studentId");
const studentFName = document.getElementById("studentFName");
const studentMName = document.getElementById("studentMName");
const studentLName = document.getElementById("studentLName");
const studentProgram = document.getElementById("studentProgram");
const studentAllowance = document.getElementById("studentAllowance");
const cancelEdit = document.getElementById("cancelEdit");
const studentsTableBody = document.querySelector("#studentsTable tbody");

// Fetch & display students
async function loadStudents() {
    try {
        const res = await fetch(API_BASE + "getStudents.php");
        const data = await res.json();

        if (data.success) {
            studentsTableBody.innerHTML = "";
            data.data.forEach(stud => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${stud.firstName}</td>
                    <td>${stud.middleName}</td>
                    <td>${stud.lastName}</td>
                    <td>${stud.program}</td>
                    <td>${stud.allowance}</td>
                    <td>
                        <button onclick="editStudent(${stud.stud_id}, '${stud.firstName}', '${stud.middleName}', '${stud.lastName}', ${stud.program_id}, ${stud.allowance})">Edit</button>
                        <button onclick="deleteStudent(${stud.stud_id})">Delete</button>
                    </td>
                `;
                studentsTableBody.appendChild(tr);
            });
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Failed to load students");
    }
}

// Fetch & load programs into <select>
async function loadPrograms1() {
    try {
        const res = await fetch(PROGRAMS_API);
        const data = await res.json();

        console.log(data);
        
        if (data.success) {
            studentProgram.innerHTML = '<option value="">Select Program</option>';
            data.data.forEach(p => {
                const option = document.createElement("option");
                option.value = p.program_id;
                option.textContent = p.program_name;
                studentProgram.appendChild(option);
            });
        }
    } catch (err) {
        console.error(err);
        alert("Failed to load programs");
    }
}

// Add or update student
studentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        id: studentId.value || null,
        firstName: studentFName.value,
        middleName: studentMName.value,
        lastName: studentLName.value,
        program_id: studentProgram.value,
        allowance: studentAllowance.value
    };

    const endpoint = payload.id ? "updateStudent.php" : "addStudent.php";

    try {
        const res = await fetch(API_BASE + endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success) {
            loadStudents();
            studentForm.reset();
            studentId.value = "";
            cancelEdit.style.display = "none";
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Request failed");
    }
});

// Edit student
function editStudent(id, firstName, middleName, lastName, program_id, allowance) {
    studentId.value = id;
    studentFName.value = firstName;
    studentMName.value = middleName;
    studentLName.value = lastName;
    studentProgram.value = program_id;
    studentAllowance.value = allowance;
    cancelEdit.style.display = "inline";
}

// Cancel edit
cancelEdit.addEventListener("click", () => {
    studentForm.reset();
    studentId.value = "";
    cancelEdit.style.display = "none";
});

// Delete student
async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
        const res = await fetch(API_BASE + "deleteStudent.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        const data = await res.json();

        if (data.success) {
            loadStudents();
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Delete failed");
    }
}


// Program Management

// Base API for programs
const PROGRAMS_BASE = "api/programs/";
const INSTITUTES_API = "api/programs/getInstitutes.php";

// Form & table refs
const programForm = document.getElementById("programForm");
const programId = document.getElementById("programId");
const programName = document.getElementById("programName");
const programInstitute = document.getElementById("programInstitute");
const cancelProgramEdit = document.getElementById("cancelProgramEdit");
const programsTableBody = document.querySelector("#programsTable tbody");

async function loadPrograms() {
    try {
        const res = await fetch(PROGRAMS_BASE + "getPrograms.php");
        const data = await res.json();

        if (data.success) {
            programsTableBody.innerHTML = "";
            data.data.forEach(p => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${p.program_name}</td>
                    <td>${p.ins_name}</td>
                    <td>
                        <button onclick="editProgram(${p.program_id}, '${p.program_name}', ${p.ins_id})">Edit</button>
                        <button onclick="deleteProgram(${p.program_id})">Delete</button>
                    </td>
                `;
                programsTableBody.appendChild(tr);
            });
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Failed to load programs");
    }
}

// Load institutes for dropdown
async function loadInstitutes() {
    try {
        const res = await fetch(INSTITUTES_API);
        const data = await res.json();

        console.log("Institutes API Response:", data); 

        if (data.success) {
            programInstitute.innerHTML = '<option value="">Select Institute</option>';
            data.data.forEach(i => {
                const option = document.createElement("option");
                option.value = i.ins_id;
                option.textContent = i.ins_name;
                programInstitute.appendChild(option);
            });
        }
    } catch (err) {
        console.error(err);
        alert("Failed to load institutes");
    }
}

// Add or update program
programForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        program_id: programId.value || null,
        program_name: programName.value,
        ins_id: programInstitute.value
    };

    const endpoint = payload.program_id ? "updateProgram.php" : "addProgram.php";

    try {
        const res = await fetch(PROGRAMS_BASE + endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success) {
            loadPrograms();
            programForm.reset();
            programId.value = "";
            cancelProgramEdit.style.display = "none";
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Request failed");
    }
});

// Edit program
function editProgram(id, name, ins_id) {
    programId.value = id;
    programName.value = name;
    programInstitute.value = ins_id;
    cancelProgramEdit.style.display = "inline";
}

// Cancel program edit
cancelProgramEdit.addEventListener("click", () => {
    programForm.reset();
    programId.value = "";
    cancelProgramEdit.style.display = "none";
});

// Delete program
async function deleteProgram(id) {
    if (!confirm("Are you sure you want to delete this program?")) return;

    try {
        const res = await fetch(PROGRAMS_BASE + "deleteProgram.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ program_id: id })
        });
        const data = await res.json();

        if (data.success) {
            loadPrograms();
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Delete failed");
    }
}

// =======================
// Year Management
// =======================
const YEAR_BASE = "api/years/";

const yearForm = document.getElementById("yearForm");
const yearId = document.getElementById("yearId");
const yearFrom = document.getElementById("yearFrom");
const yearTo = document.getElementById("yearTo");
const cancelYearEdit = document.getElementById("cancelYearEdit");
const yearsTableBody = document.querySelector("#yearsTable tbody");

async function loadYearsList() {
    try {
        const res = await fetch(YEAR_BASE + "getYears.php");
        const data = await res.json();

        if (data.success) {
            yearsTableBody.innerHTML = "";
            semYear.innerHTML = '<option value="">Select Year</option>'; // refresh dropdown for semesters
            data.data.forEach(y => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${y.year_from} - ${y.year_to}</td>
                    <td>
                        <button onclick="editYear(${y.year_id}, ${y.year_from}, ${y.year_to})">Edit</button>
                        <button onclick="deleteYear(${y.year_id})">Delete</button>
                    </td>
                `;
                yearsTableBody.appendChild(tr);

                // also add to semester dropdown
                const option = document.createElement("option");
                option.value = y.year_id;
                option.textContent = `${y.year_from} - ${y.year_to}`;
                semYear.appendChild(option);
            });
        }
    } catch (err) {
        console.error(err);
        alert("Failed to load years");
    }
}

yearForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        year_id: yearId.value || null,
        year_from: yearFrom.value,
        year_to: yearTo.value
    };

    const endpoint = payload.year_id ? "updateYear.php" : "addYear.php";

    try {
        const res = await fetch(YEAR_BASE + endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
            loadYearsList();
            yearForm.reset();
            yearId.value = "";
            cancelYearEdit.style.display = "none";
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
    }
});

function editYear(id, from, to) {
    yearId.value = id;
    yearFrom.value = from;
    yearTo.value = to;
    cancelYearEdit.style.display = "inline";
}

cancelYearEdit.addEventListener("click", () => {
    yearForm.reset();
    yearId.value = "";
    cancelYearEdit.style.display = "none";
});

async function deleteYear(id) {
    if (!confirm("Are you sure you want to delete this year?")) return;

    try {
        const res = await fetch(YEAR_BASE + "deleteYear.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ year_id: id })
        });
        const data = await res.json();

        if (data.success) {
            loadYearsList();
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
    }
}

// =======================
// Semester Management
// =======================
const SEM_BASE = "api/semesters/";

const semesterForm = document.getElementById("semesterForm");
const semId = document.getElementById("semId");
const semName = document.getElementById("semName");
const semYear = document.getElementById("semYear");
const cancelSemEdit = document.getElementById("cancelSemEdit");
const semestersTableBody = document.querySelector("#semestersTable tbody");

async function loadSemestersList() {
    try {
        const res = await fetch(SEM_BASE + "getSemesters.php");
        const data = await res.json();

        if (data.success) {
            semestersTableBody.innerHTML = "";
            data.data.forEach(s => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${s.sem_name}</td>
                    <td>${s.year_from} - ${s.year_to}</td>
                    <td>
                        <button onclick="editSemester(${s.sem_id}, '${s.sem_name}', ${s.year_id})">Edit</button>
                        <button onclick="deleteSemester(${s.sem_id})">Delete</button>
                    </td>
                `;
                semestersTableBody.appendChild(tr);
            });
        }
    } catch (err) {
        console.error(err);
        alert("Failed to load semesters");
    }
}

semesterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        sem_id: semId.value || null,
        sem_name: semName.value,
        year_id: semYear.value
    };

    const endpoint = payload.sem_id ? "updateSemester.php" : "addSemester.php";

    try {
        const res = await fetch(SEM_BASE + endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
            loadSemestersList();
            semesterForm.reset();
            semId.value = "";
            cancelSemEdit.style.display = "none";
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
    }
});

function editSemester(id, name, year_id) {
    semId.value = id;
    semName.value = name;
    semYear.value = year_id;
    cancelSemEdit.style.display = "inline";
}

cancelSemEdit.addEventListener("click", () => {
    semesterForm.reset();
    semId.value = "";
    cancelSemEdit.style.display = "none";
});

async function deleteSemester(id) {
    if (!confirm("Are you sure you want to delete this semester?")) return;

    try {
        const res = await fetch(SEM_BASE + "deleteSemester.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sem_id: id })
        });
        const data = await res.json();

        if (data.success) {
            loadSemestersList();
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
    }
}

// =======================
// Subject Management
// =======================
const SUB_BASE = "api/subjects/";

const subjectForm = document.getElementById("subjectForm");
const subId = document.getElementById("subId");
const subCode = document.getElementById("subCode");
const subName = document.getElementById("subName");
const subUnits = document.getElementById("subUnits");
const subSemester = document.getElementById("subSemester");
const cancelSubEdit = document.getElementById("cancelSubEdit");
const subjectsTableBody = document.querySelector("#subjectsTable tbody");

// Load subjects
async function loadSubjectsList() {
    try {
        const res = await fetch(SUB_BASE + "getSubjects.php");
        const data = await res.json();

        if (data.success) {
            console.log("Subjects API Response:", data);
            subjectsTableBody.innerHTML = "";
            data.data.forEach(s => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${s.sub_code}</td>
                    <td>${s.subject_name}</td>
                    <td>${s.units}</td>
                    <td>${s.sem_name}</td>
                    <td>${s.year_from} - ${s.year_to}</td>
                    <td>
                        <button onclick="editSubject(${s.subject_id}, '${s.sub_code}', '${s.subject_name}', ${s.units}, ${s.sem_id})">Edit</button>
                        <button onclick="deleteSubject(${s.subject_id})">Delete</button>
                    </td>
                `;
                subjectsTableBody.appendChild(tr);
            });
        }
    } catch (err) {
        console.error(err);
        alert("Failed to load subjects");
    }
}

// Load semesters into dropdown
async function loadSemestersForSubjects() {
    try {
        const res = await fetch("api/semesters/getSemesters.php");
        const data = await res.json();

        if (data.success) {
            subSemester.innerHTML = '<option value="">Select Semester</option>';
            data.data.forEach(s => {
                const option = document.createElement("option");
                option.value = s.sem_id;
                option.textContent = `${s.sem_name} (${s.year_from}-${s.year_to})`;
                subSemester.appendChild(option);
            });
        }
    } catch (err) {
        console.error(err);
        alert("Failed to load semesters");
    }
}

// Add or update subject
subjectForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        sub_id: subId.value || null,
        sub_code: subCode.value,
        sub_name: subName.value,
        units: subUnits.value,
        sem_id: subSemester.value
    };

    const endpoint = payload.sub_id ? "updateSubject.php" : "addSubject.php";

    try {
        const res = await fetch(SUB_BASE + endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
            loadSubjectsList();
            subjectForm.reset();
            subId.value = "";
            cancelSubEdit.style.display = "none";
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
    }
});

function editSubject(id, code, name, units, sem_id) {
    subId.value = id;
    subCode.value = code;
    subName.value = name;
    subUnits.value = units;
    subSemester.value = sem_id;
    cancelSubEdit.style.display = "inline";
}

cancelSubEdit.addEventListener("click", () => {
    subjectForm.reset();
    subId.value = "";
    cancelSubEdit.style.display = "none";
});

async function deleteSubject(id) {
    if (!confirm("Are you sure you want to delete this subject?")) return;

    try {
        const res = await fetch(SUB_BASE + "deleteSubject.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sub_id: id })
        });
        const data = await res.json();

        if (data.success) {
            loadSubjectsList();
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
    }
}
// Base API for enrollments
const ENROLL_BASE = "api/enrollments/";

// Form & table refs
const enrollmentForm = document.getElementById("enrollmentForm");
const loadId = document.getElementById("loadId");
const enrollmentStudent = document.getElementById("enrollmentStudent");
const enrollmentSubject = document.getElementById("enrollmentSubject");
const cancelEnrollmentEdit = document.getElementById("cancelEnrollmentEdit");
const enrollmentsTableBody = document.querySelector("#enrollmentsTable tbody");

// Load students into dropdown
async function loadEnrollmentStudents() {
    const res = await fetch("api/enrollments/getStudName.php");
    const data = await res.json();
    if (data.success) {
        enrollmentStudent.innerHTML = '<option value="">Select Student</option>';
        data.data.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s.stud_id;
            opt.textContent = s.fullName; // buong pangalan na
            enrollmentStudent.appendChild(opt);
        });
    }
}


// Load subjects into dropdown
async function loadEnrollmentSubjects() {
    const res = await fetch("api/subjects/getSubjects.php");
    const data = await res.json();
    if (data.success) {
        enrollmentSubject.innerHTML = '<option value="">Select Subject</option>';
        data.data.forEach(sub => {
            const opt = document.createElement("option");
            opt.value = sub.subject_id;
            opt.textContent = `${sub.sub_code} - ${sub.subject_name}`;
            enrollmentSubject.appendChild(opt);
        });
    }
}

// Load enrollments into table
async function loadEnrollments() {
    const res = await fetch(ENROLL_BASE + "getEnrollments.php");
    const data = await res.json();
    if (data.success) {
        enrollmentsTableBody.innerHTML = "";
        data.data.forEach(e => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${e.firstName} ${e.middleName} ${e.lastName}</td>
            <td>${e.subject_name}</td>
            <td>${e.sub_code}</td>
            <td>
        <button onclick="editEnrollment(${e.load_id}, ${e.stud_id}, ${e.subject_id})">Edit</button>
        <button onclick="deleteEnrollment(${e.load_id})">Remove</button>
        </td>
        `;
            enrollmentsTableBody.appendChild(tr);
        });
    }
}

// Add or update enrollment
enrollmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
        load_id: loadId.value || null,
        stud_id: enrollmentStudent.value,
        subject_id: enrollmentSubject.value
    };
    const endpoint = payload.load_id ? "updateEnrollment.php" : "enrollStudent.php";

    const res = await fetch(ENROLL_BASE + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
        loadEnrollments();
        enrollmentForm.reset();
        loadId.value = "";
        cancelEnrollmentEdit.style.display = "none";
    } else {
        alert(data.message);
    }
});

// Edit enrollment
function editEnrollment(id, stud_id, subject_id) {
    loadId.value = id;
    enrollmentStudent.value = stud_id;
    enrollmentSubject.value = subject_id;
    cancelEnrollmentEdit.style.display = "inline";
}

// Cancel edit
cancelEnrollmentEdit.addEventListener("click", () => {
    enrollmentForm.reset();
    loadId.value = "";
    cancelEnrollmentEdit.style.display = "none";
});

// Delete enrollment
async function deleteEnrollment(id) {
    if (!confirm("Remove this enrollment?")) return;
    const res = await fetch(ENROLL_BASE + "removeEnrollment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ load_id: id })
    });
    const data = await res.json();
    if (data.success) {
        loadEnrollments();
    } else {
        alert(data.message);
    }
}

function showSection(sectionId, link) {
    // hide all
    document.querySelectorAll('.section').forEach(sec => sec.style.display = "none");
    // show selected
    document.getElementById(sectionId).style.display = "block";

    // reset active nav
    document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove("active"));
    // highlight current
    link.classList.add("active");
}






// Initialize
loadSubjectsList();
loadSemestersForSubjects();
loadPrograms();
loadPrograms1();
loadStudents();
loadInstitutes();
loadYearsList();
loadSemestersList();
loadEnrollmentStudents();
loadEnrollmentSubjects();
loadEnrollments();

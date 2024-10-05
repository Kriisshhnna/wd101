const userEmail = document.getElementById('email');
userEmail.addEventListener('input', () => validateEmail(userEmail));

function validateEmail(element) {
    if (element.validity.typeMismatch) {
        element.setCustomValidity("The entered email is not in the right format!!!");
        element.reportValidity();
    } else {
        element.setCustomValidity('');
    }
}

const userName = document.getElementById('name');
userName.addEventListener('input', () => validateName(userName));

function validateName(name) {
    const namePattern = /^[A-Za-z ]+$/; // Allow spaces for full names

    if (namePattern.test(name.value)) {
        name.setCustomValidity('');
    } else {
        name.setCustomValidity("Name can have only English alphabets");
        name.reportValidity();
    }
}

const userPassword = document.getElementById('password');
userPassword.addEventListener('input', () => validatePassword(userPassword));

function validatePassword(password) {
    const p = password.value;
    if (p.length < 8) {
        password.setCustomValidity("Password must be at least 8 characters.");
        password.reportValidity();
    } else {
        password.setCustomValidity('');
    }
}

const userDOB = document.getElementById('dob');
userDOB.addEventListener('input', () => validateDOB(userDOB));

function validateDOB(dob) {
    const tD = new Date();
    const tY = tD.getFullYear();

    const minY = tY - 18;
    const maxY = tY - 55;

    const udob = new Date(dob.value);

    if (udob.getFullYear() <= minY && udob.getFullYear() >= maxY) {
        dob.setCustomValidity('');
    } else {
        dob.setCustomValidity("Your age does not meet the required age");
        dob.reportValidity();
    }
}

// Get the form element
let userForm = document.getElementById("user-form");

// Function to retrieve entries from local storage
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        return JSON.parse(entries);
    }
    return [];
}

// Function to display entries in the user-entries section
const displayEntries = () => {
    const entries = retrieveEntries();
    const entriesContainer = document.getElementById("user-entries");

    // Generate table rows for each entry
    const tableEntries = entries.map((entry) => {
        return `
            <tr>
                <td class="border px-4 py-2">${entry.name}</td>
                <td class="border px-4 py-2">${entry.email}</td>
                <td class="border px-4 py-2">${entry.password}</td>
                <td class="border px-4 py-2">${entry.dob}</td>
                <td class="border px-4 py-2">${entry.acceptedTerms ? 'Yes' : 'No'}</td>
            </tr>`;
    }).join("\n");

    // Create a table to display entries
    const table = `
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">DOB</th>
                    <th class="px-4 py-2">Accepted Terms?</th>
                </tr>
            </thead>
            <tbody>${tableEntries}</tbody>
        </table>`;
    
    // Set the inner HTML of the entries container to the generated table
    entriesContainer.innerHTML = table;
}

// Function to save user form data to local storage
const saveUserForm = (event) => {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptTerms").checked;

    // Create a new entry object
    const newEntry = {
        name,
        email,
        password,
        dob,
        acceptedTerms,
    };

    // Retrieve existing entries, add the new one, and save back to local storage
    const userEntries = retrieveEntries();
    userEntries.push(newEntry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    // Clear form fields
    userForm.reset();

    // Display updated entries immediately after submission
    displayEntries();
}

// Event listener for form submission
userForm.addEventListener("submit", saveUserForm);

// Display entries on initial load
displayEntries();

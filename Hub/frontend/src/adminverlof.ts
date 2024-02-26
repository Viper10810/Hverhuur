// Placeholder TypeScript file for Adminverlof.html
// You can implement logic to fetch and display captain availability data here
// For example, using fetch API to get data from backend

// Fetch captain availability data
async function fetchCaptainAvailability() {
    try {
        const response = await fetch('/getCaptainAvailability');
        if (response.ok) {
            const data = await response.json();
            displayCaptainAvailability(data);
        } else {
            console.error('Failed to fetch captain availability data');
        }
    } catch (error) {
        console.error('Error fetching captain availability data:', error);
    }
}

// Display captain availability data
function displayCaptainAvailability(data) {
    // Example: display captain availability data in a table
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Unavailable Dates</th>
            </tr>
        </thead>
        <tbody>
            ${data.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.unavailableDates.join(', ')}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    document.querySelector('.admin-availability-container').appendChild(table);
}

// Call the fetchCaptainAvailability function when the page loads
window.addEventListener('load', fetchCaptainAvailability);

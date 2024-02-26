// Get the availability form element
const availabilityForm = document.getElementById('availabilityForm') as HTMLFormElement;

// Check if the form element exists
if (availabilityForm) {
    // Fetch the list of captains from the backend
    fetch('/getCaptains')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch captains');
            }
            return response.json();
        })
        .then(captains => {
            // Populate the dropdown with captain names
            const naamDropdown = document.getElementById('name') as HTMLSelectElement;
            naamDropdown.innerHTML = captains.map((captain: any) => `<option value="${captain.CaptainEmail}">${captain.CaptainEmail}</option>`).join('');
        })
        .catch(error => {
            console.error('Error fetching captains:', error);
        });

    // Add event listener for form submission
    availabilityForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
        const startDate = new Date(formData.get('startDate') as string);
        const endDate = new Date(formData.get('endDate') as string);

        // Calculate the current date plus three days
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 3);

        // Check if the start date is at least 3 days ahead
        if (startDate < minDate) {
            alert('Begin verlof moet minimaal 3 dagen in de toekomst zijn.');
            return;
        }

        // Check if all fields are filled out
        if (!name || !startDate || !endDate || startDate >= endDate) {
            alert('Vul alle velden correct in. Begin verlof moet voor eind verlof liggen.');
            return;
        }

        try {
            const response = await fetch('/submitAvailability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, startDate, endDate })
            });

            if (!response.ok) {
                throw new Error('Failed to submit availability');
            }

            alert('Verlof succesvol ingediend!');
        } catch (error) {
            console.error('Fout bij het indienen van verlof:', error);
            alert('Er is een fout opgetreden bij het indienen van verlof');
        }
    });
} else {
    console.error('Element with ID "availabilityForm" not found');
}

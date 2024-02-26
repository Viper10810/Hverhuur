document.getElementById('availabilityForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const unavailableDates = formData.get('unavailableDates');
    
    try {
        const response = await fetch('/submitAvailability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, unavailableDates })
        });
        
        if (response.ok) {
            alert('Verlof succesvol ingediend!');
        } else {
            alert('Verlof indienen mislukt');
        }
    } catch (error) {
        console.error('Fout bij het indienen van verlof:', error);
        alert('Er is een fout opgetreden bij het indienen van verlof');
    }
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const availabilityForm = document.getElementById('availabilityForm');
if (availabilityForm) {
    availabilityForm.addEventListener('submit', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const unavailableDates = formData.get('unavailableDates');
            try {
                const response = yield fetch('/submitAvailability', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, unavailableDates })
                });
                if (!response.ok) {
                    throw new Error('Failed to submit availability');
                }
                alert('Verlof succesvol ingediend!');
            }
            catch (error) {
                console.error('Fout bij het indienen van verlof:', error);
                alert('Er is een fout opgetreden bij het indienen van verlof');
            }
        });
    });
}
else {
    console.error('Element with ID "availabilityForm" not found');
}

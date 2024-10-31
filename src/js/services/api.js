// services/api.js
export class ApiService {
    constructor(baseURL = '/api') {
        this.baseURL = baseURL;
    }

    async getProperties(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${this.baseURL}/properties?${queryString}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }

        return await response.json();
    }

    async getPropertyById(id) {
        const response = await fetch(`${this.baseURL}/properties/${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch property details');
        }

        return await response.json();
    }

    async submitContact(formData) {
        const response = await fetch(`${this.baseURL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit contact form');
        }

        return await response.json();
    }
}
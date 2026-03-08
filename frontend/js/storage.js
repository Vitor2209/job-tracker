/**
 * JobTrack – Storage Layer
 * Handles localStorage persistence
 * Also checks authentication token
 */

const Storage = {

    KEY: 'jobtrack_jobs',
    TOKEN_KEY: 'jobtrack_token',

    /** Check if user is logged in */
    isAuthenticated() {
        const token = localStorage.getItem(this.TOKEN_KEY);
        return !!token;
    },

    /** Redirect to login if not authenticated */
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = "login.html";
        }
    },

    /** Get token */
    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    },

    /** Save token after login */
    saveToken(token) {
        localStorage.setItem(this.TOKEN_KEY, token);
    },

    /** Logout user */
    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        window.location.href = "login.html";
    },

    /** Get all jobs */
    getAll() {
        try {
            const data = localStorage.getItem(this.KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    /** Save all jobs */
    saveAll(jobs) {
        localStorage.setItem(this.KEY, JSON.stringify(jobs));
    },

    /** Get job by ID */
    getById(id) {
        return this.getAll().find(j => j.id === id) || null;
    },

    /** Create job */
    create(job) {
        const jobs = this.getAll();

        job.id = 'job_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        job.createdAt = new Date().toISOString();

        jobs.push(job);
        this.saveAll(jobs);

        return job;
    },

    /** Update job */
    update(id, updates) {
        const jobs = this.getAll();
        const index = jobs.findIndex(j => j.id === id);

        if (index === -1) return null;

        jobs[index] = {
            ...jobs[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        this.saveAll(jobs);

        return jobs[index];
    },

    /** Delete job */
    delete(id) {
        const jobs = this.getAll().filter(j => j.id !== id);
        this.saveAll(jobs);
    },

    /** Seed demo data */
    seed() {

        if (this.getAll().length > 0) return;

        const samples = [
            { company: 'Google', title: 'Front-End Developer', location: 'California', status: 'applied', date: '2024-05-01', url: '', notes: '' },
            { company: 'Spotify', title: 'UI Designer', location: 'Remote', status: 'applied', date: '2024-04-28', url: '', notes: '' },
            { company: 'Amazon', title: 'Marketing Specialist', location: 'New York', status: 'applied', date: '2024-04-25', url: '', notes: '' },
            { company: 'Microsoft', title: 'Product Manager', location: 'Seattle', status: 'interview', date: '2024-04-20', url: '' },
            { company: 'Airbnb', title: 'Data Analyst', location: 'San Francisco', status: 'interview', date: '2024-04-18', notes: 'Second Round' },
            { company: 'Tesla', title: 'Software Engineer', location: 'Austin', status: 'interview', date: '2024-04-15', notes: 'Final Interview' },
            { company: 'Microsoft', title: 'Product Manager', location: 'San Francisco', status: 'offer', date: '2024-04-10' },
            { company: 'Twitter', title: 'Content Writer', location: 'Chicago', status: 'rejected', date: '2024-04-05' },
            { company: 'IBM', title: 'Sales Associate', location: 'Boston', status: 'rejected', date: '2024-04-01' }
        ];

        samples.forEach(job => this.create(job));
    }
};
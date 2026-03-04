/**
 * JobTrack – Storage Layer
 * Handles localStorage persistence.
 * Designed to be swapped with a real API later.
 */

const Storage = {
    KEY: 'jobtrack_jobs',

    /** Get all jobs from localStorage */
    getAll() {
        try {
            const data = localStorage.getItem(this.KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    /** Save all jobs to localStorage */
    saveAll(jobs) {
        localStorage.setItem(this.KEY, JSON.stringify(jobs));
    },

    /** Get a single job by ID */
    getById(id) {
        return this.getAll().find(j => j.id === id) || null;
    },

    /** Create a new job */
    create(job) {
        const jobs = this.getAll();
        job.id = 'job_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        job.createdAt = new Date().toISOString();
        jobs.push(job);
        this.saveAll(jobs);
        return job;
    },

    /** Update an existing job */
    update(id, updates) {
        const jobs = this.getAll();
        const idx = jobs.findIndex(j => j.id === id);
        if (idx === -1) return null;
        jobs[idx] = { ...jobs[idx], ...updates, updatedAt: new Date().toISOString() };
        this.saveAll(jobs);
        return jobs[idx];
    },

    /** Delete a job */
    delete(id) {
        const jobs = this.getAll().filter(j => j.id !== id);
        this.saveAll(jobs);
    },

    /** Seed with sample data if empty */
    seed() {
        if (this.getAll().length > 0) return;

        const samples = [
            { company: 'Google', title: 'Front-End Developer', location: 'California', status: 'applied', date: '2024-05-01', url: '', notes: '' },
            { company: 'Spotify', title: 'UI Designer', location: 'Remote', status: 'applied', date: '2024-04-28', url: '', notes: '' },
            { company: 'Amazon', title: 'Marketing Specialist', location: 'New York', status: 'applied', date: '2024-04-25', url: '', notes: '' },
            { company: 'Microsoft', title: 'Product Manager', location: 'Seattle', status: 'interview', date: '2024-04-20', url: '', notes: '' },
            { company: 'Airbnb', title: 'Data Analyst', location: 'San Francisco', status: 'interview', date: '2024-04-18', url: '', notes: 'Second Round' },
            { company: 'Tesla', title: 'Software Engineer', location: 'Austin', status: 'interview', date: '2024-04-15', url: '', notes: 'Final Interview' },
            { company: 'Microsoft', title: 'Product Manager', location: 'San Francisco', status: 'offer', date: '2024-04-10', url: '', notes: '' },
            { company: 'Twitter', title: 'Content Writer', location: 'Chicago', status: 'rejected', date: '2024-04-05', url: '', notes: 'Rejected' },
            { company: 'IBM', title: 'Sales Associate', location: 'Boston', status: 'rejected', date: '2024-04-01', url: '', notes: 'Application Denied' },
        ];

        samples.forEach(s => {
            this.create({
                company: s.company,
                title: s.title,
                location: s.location,
                status: s.status,
                date: s.date,
                url: s.url,
                notes: s.notes,
            });
        });
    }
};

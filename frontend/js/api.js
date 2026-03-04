/**
 * JobTrack – API Layer
 * Mock API that wraps Storage.
 * 
 * To connect to a real backend, replace the body of each function
 * with fetch() calls to your Express API:
 *   GET    /api/jobs
 *   POST   /api/jobs
 *   PUT    /api/jobs/:id
 *   DELETE /api/jobs/:id
 */

const API = {
    /** Simulate async delay */
    _delay(ms = 50) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /** GET /api/jobs */
    async getJobs() {
        await this._delay();
        return Storage.getAll();
    },

    /** POST /api/jobs */
    async createJob(data) {
        await this._delay();
        return Storage.create(data);
    },

    /** PUT /api/jobs/:id */
    async updateJob(id, data) {
        await this._delay();
        return Storage.update(id, data);
    },

    /** DELETE /api/jobs/:id */
    async deleteJob(id) {
        await this._delay();
        Storage.delete(id);
        return { success: true };
    },

    /** GET /api/jobs/stats */
    async getStats() {
        const jobs = await this.getJobs();
        return {
            applications: jobs.length,
            interviews: jobs.filter(j => j.status === 'interview').length,
            offers: jobs.filter(j => j.status === 'offer').length,
            rejected: jobs.filter(j => j.status === 'rejected').length,
        };
    }
};

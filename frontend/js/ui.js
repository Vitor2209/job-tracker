/**
 * JobTrack – UI Module
 * Handles rendering cards, modals, and UI interactions
 */

const UI = {
    /** Color palette for company logos */
    COLORS: [
        '#4285F4', '#34A853', '#1DB954', '#FF9900',
        '#E1306C', '#00A4EF', '#CC0000', '#5865F2',
        '#1DA1F2', '#0A66C2', '#FF6900', '#7B68EE'
    ],

    /** Get a deterministic color for a company name */
    getCompanyColor(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return this.COLORS[Math.abs(hash) % this.COLORS.length];
    },

    /** Create a job card DOM element */
    createJobCard(job) {
        const card = document.createElement('div');
        card.className = 'job-card';

        const color = this.getCompanyColor(job.company);
        const initial = job.company.charAt(0).toUpperCase();
        const dateStr = job.date || job.createdAt?.split('T')[0] || '';
        const noteTag = job.notes ? `<span class="job-card-tag tag-${job.status}">${job.notes}</span>` : '';
        const statusTag = job.notes ? '' : `<span class="job-card-tag tag-${job.status}">${dateStr}</span>`;

        card.innerHTML = `
            <div class="job-card-actions">
                <button class="card-action-btn edit-btn" data-id="${job.id}" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="card-action-btn delete-btn" data-id="${job.id}" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>
            <div class="job-card-company">
                <div class="company-logo" style="background:${color}">${initial}</div>
                <h4>${job.company}</h4>
            </div>
            <div class="job-card-title">${job.title}</div>
            <div class="job-card-footer">
                <span class="job-card-location">${job.location || '—'}</span>
                ${noteTag || statusTag}
            </div>
        `;

        // Edit button
        card.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            App.openEditModal(job.id);
        });

        // Delete button
        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            App.openDeleteModal(job.id);
        });

        return card;
    },

    /** Render all jobs into kanban columns */
    renderBoard(jobs) {
        const columns = { applied: [], interview: [], offer: [], rejected: [] };
        jobs.forEach(j => {
            if (columns[j.status]) columns[j.status].push(j);
        });

        Object.entries(columns).forEach(([status, list]) => {
            const colId = 'col' + status.charAt(0).toUpperCase() + status.slice(1);
            const container = document.getElementById(colId);
            if (!container) return;
            container.innerHTML = '';

            list.forEach(job => {
                const card = this.createJobCard(job);
                Kanban.makeCardDraggable(card, job.id);
                container.appendChild(card);
            });

            // Update count badges
            const countId = 'count' + status.charAt(0).toUpperCase() + status.slice(1);
            const countEl = document.getElementById(countId);
            if (countEl) countEl.textContent = list.length;
        });
    },

    /** Update stat cards */
    renderStats(stats) {
        document.getElementById('statApplications').textContent = stats.applications;
        document.getElementById('statInterviews').textContent = stats.interviews;
        document.getElementById('statOffers').textContent = stats.offers;
    },

    /** Show modal */
    showModal(id) {
        document.getElementById(id).classList.add('active');
    },

    /** Hide modal */
    hideModal(id) {
        document.getElementById(id).classList.remove('active');
    },

    /** Reset form */
    resetForm() {
        document.getElementById('jobForm').reset();
        document.getElementById('jobId').value = '';
        document.getElementById('modalTitle').textContent = 'Add New Job';
    },

    /** Populate form for editing */
    populateForm(job) {
        document.getElementById('jobId').value = job.id;
        document.getElementById('jobCompany').value = job.company;
        document.getElementById('jobTitle').value = job.title;
        document.getElementById('jobLocation').value = job.location || '';
        document.getElementById('jobStatus').value = job.status;
        document.getElementById('jobUrl').value = job.url || '';
        document.getElementById('jobNotes').value = job.notes || '';
        document.getElementById('modalTitle').textContent = 'Edit Job';
    }
};

/**
 * JobTrack – Main Application
 * Orchestrates all modules
 */

const App = {
    deleteTargetId: null,
    searchQuery: '',

    /** Initialize the application */
    async init() {
        // Seed sample data on first load
        Storage.seed();

        // Initialize kanban drag-and-drop
        Kanban.init();

        // Load theme preference
        this.loadTheme();

        // Bind UI events
        this.bindEvents();

        // Initial render
        await this.renderBoard();
    },

    /** Bind all event listeners */
    bindEvents() {
        // Add Job button
        document.getElementById('addJobBtn').addEventListener('click', () => {
            UI.resetForm();
            UI.showModal('jobModal');
        });

        // Modal close/cancel
        document.getElementById('modalClose').addEventListener('click', () => UI.hideModal('jobModal'));
        document.getElementById('modalCancel').addEventListener('click', () => UI.hideModal('jobModal'));

        // Form submit
        document.getElementById('jobForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Delete modal
        document.getElementById('deleteModalClose').addEventListener('click', () => UI.hideModal('deleteModal'));
        document.getElementById('deleteCancelBtn').addEventListener('click', () => UI.hideModal('deleteModal'));
        document.getElementById('deleteConfirmBtn').addEventListener('click', () => this.handleDelete());

        // Dark mode toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => this.toggleTheme());

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderBoard();
        });

        // Close modals on backdrop click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.classList.remove('active');
            });
        });

        // Keyboard: Escape to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
            }
        });
    },

    /** Render the entire board */
    async renderBoard() {
        let jobs = await API.getJobs();

        // Apply search filter
        if (this.searchQuery) {
            jobs = jobs.filter(j =>
                j.company.toLowerCase().includes(this.searchQuery) ||
                j.title.toLowerCase().includes(this.searchQuery) ||
                (j.location && j.location.toLowerCase().includes(this.searchQuery))
            );
        }

        UI.renderBoard(jobs);

        // Stats always use full dataset
        const stats = await API.getStats();
        UI.renderStats(stats);
    },

    /** Handle form submission (create or update) */
    async handleFormSubmit(e) {
        e.preventDefault();

        const id = document.getElementById('jobId').value;
        const data = {
            company: document.getElementById('jobCompany').value.trim(),
            title: document.getElementById('jobTitle').value.trim(),
            location: document.getElementById('jobLocation').value.trim(),
            status: document.getElementById('jobStatus').value,
            url: document.getElementById('jobUrl').value.trim(),
            notes: document.getElementById('jobNotes').value.trim(),
            date: new Date().toISOString().split('T')[0],
        };

        if (!data.company || !data.title) return;

        if (id) {
            await API.updateJob(id, data);
        } else {
            await API.createJob(data);
        }

        UI.hideModal('jobModal');
        await this.renderBoard();
    },

    /** Open edit modal for a job */
    async openEditModal(id) {
        const jobs = await API.getJobs();
        const job = jobs.find(j => j.id === id);
        if (!job) return;
        UI.populateForm(job);
        UI.showModal('jobModal');
    },

    /** Open delete confirmation */
    openDeleteModal(id) {
        this.deleteTargetId = id;
        UI.showModal('deleteModal');
    },

    /** Confirm delete */
    async handleDelete() {
        if (!this.deleteTargetId) return;
        await API.deleteJob(this.deleteTargetId);
        this.deleteTargetId = null;
        UI.hideModal('deleteModal');
        await this.renderBoard();
    },

    /** Theme management */
    loadTheme() {
        const saved = localStorage.getItem('jobtrack_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
    },

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('jobtrack_theme', next);
    }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());

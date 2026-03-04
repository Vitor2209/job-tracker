/**
 * JobTrack – Kanban Module
 * Handles drag-and-drop between columns
 */

const Kanban = {
    draggedCard: null,
    draggedJobId: null,

    /** Initialize drag-and-drop listeners on all column drop zones */
    init() {
        const columns = document.querySelectorAll('.column-cards');
        columns.forEach(col => {
            col.addEventListener('dragover', this._onDragOver.bind(this));
            col.addEventListener('dragenter', this._onDragEnter.bind(this));
            col.addEventListener('dragleave', this._onDragLeave.bind(this));
            col.addEventListener('drop', this._onDrop.bind(this));
        });
    },

    /** Make a card draggable */
    makeCardDraggable(cardEl, jobId) {
        cardEl.setAttribute('draggable', 'true');
        cardEl.dataset.jobId = jobId;

        cardEl.addEventListener('dragstart', (e) => {
            this.draggedCard = cardEl;
            this.draggedJobId = jobId;
            cardEl.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', jobId);
        });

        cardEl.addEventListener('dragend', () => {
            cardEl.classList.remove('dragging');
            this.draggedCard = null;
            this.draggedJobId = null;
            document.querySelectorAll('.column-cards').forEach(c => c.classList.remove('drag-over'));
        });
    },

    _onDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    },

    _onDragEnter(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    },

    _onDragLeave(e) {
        // Only remove if leaving the container itself
        if (!e.currentTarget.contains(e.relatedTarget)) {
            e.currentTarget.classList.remove('drag-over');
        }
    },

    async _onDrop(e) {
        e.preventDefault();
        const col = e.currentTarget;
        col.classList.remove('drag-over');

        const newStatus = col.closest('.kanban-column').dataset.status;
        const jobId = e.dataTransfer.getData('text/plain');

        if (!jobId || !newStatus) return;

        // Update job status via API
        await API.updateJob(jobId, { status: newStatus });

        // Re-render board
        if (typeof App !== 'undefined' && App.renderBoard) {
            App.renderBoard();
        }
    }
};

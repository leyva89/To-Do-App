/**
 * App Module - Main orchestrator
 */

const App = {
    /**
     * Initialize the application
     */
    init() {
        // Initialize modules
        Tasks.init();
        UI.init();

        // Initialize dark mode
        this.initDarkMode();

        // Render initial tasks
        UI.renderTasks(Tasks.getAll());

        // Bind events
        this.bindEvents();
    },

    /**
     * Initialize dark mode from localStorage
     */
    initDarkMode() {
        const darkModeEnabled = Storage.getDarkMode();
        if (darkModeEnabled) {
            document.documentElement.classList.add('dark');
        }
    },

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Add task button
        UI.elements.addTaskBtn.addEventListener('click', () => this.handleAddTask());

        // Add task on Enter key
        UI.elements.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleAddTask();
            }
        });

        // Event delegation for task list
        UI.elements.taskList.addEventListener('click', (e) => {
            const target = e.target.closest('[data-task-id]');
            if (!target) return;

            const taskId = target.dataset.taskId;

            // Toggle checkbox
            if (target.classList.contains('task-checkbox')) {
                this.handleToggleTask(taskId);
            }
            // Edit button
            else if (target.classList.contains('edit-btn') || target.closest('.edit-btn')) {
                const editBtn = target.classList.contains('edit-btn') ? target : target.closest('.edit-btn');
                this.handleEditTask(editBtn.dataset.taskId);
            }
            // Delete button
            else if (target.classList.contains('delete-btn') || target.closest('.delete-btn')) {
                const deleteBtn = target.classList.contains('delete-btn') ? target : target.closest('.delete-btn');
                this.handleDeleteTask(deleteBtn.dataset.taskId);
            }
        });

        // Clear completed button
        UI.elements.clearCompletedBtn.addEventListener('click', () => this.handleClearCompleted());

        // Modal events
        UI.elements.saveEditBtn.addEventListener('click', () => this.handleSaveEdit());
        UI.elements.cancelEditBtn.addEventListener('click', () => UI.closeEditModal());

        // Close modal on overlay click
        UI.elements.editModal.addEventListener('click', (e) => {
            if (e.target === UI.elements.editModal) {
                UI.closeEditModal();
            }
        });

        // Save edit on Enter key
        UI.elements.editTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSaveEdit();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !UI.elements.editModal.classList.contains('hidden')) {
                UI.closeEditModal();
            }
        });

        // Dark mode toggle
        UI.elements.darkModeToggle.addEventListener('click', () => this.handleToggleDarkMode());
    },

    /**
     * Handle adding a new task
     */
    handleAddTask() {
        const text = UI.getTaskInputValue();
        const newTask = Tasks.addTask(text);

        if (newTask) {
            UI.clearTaskInput();
            UI.renderTasks(Tasks.getAll());
        } else {
            // Optional: Show error notification
            UI.elements.taskInput.focus();
        }
    },

    /**
     * Handle toggling task completion
     * @param {string} taskId - Task ID
     */
    handleToggleTask(taskId) {
        Tasks.toggleTask(taskId);
        UI.renderTasks(Tasks.getAll());
    },

    /**
     * Handle deleting a task
     * @param {string} taskId - Task ID
     */
    handleDeleteTask(taskId) {
        const deleted = Tasks.deleteTask(taskId);
        if (deleted) {
            UI.renderTasks(Tasks.getAll());
        }
    },

    /**
     * Handle editing a task
     * @param {string} taskId - Task ID
     */
    handleEditTask(taskId) {
        const task = Tasks.getTaskById(taskId);
        if (task) {
            UI.openEditModal(taskId, task.text);
        }
    },

    /**
     * Handle saving an edited task
     */
    handleSaveEdit() {
        const taskId = UI.getEditingTaskId();
        const newText = UI.getEditInputValue();

        if (taskId && newText) {
            const updated = Tasks.updateTask(taskId, newText);
            if (updated) {
                UI.closeEditModal();
                UI.renderTasks(Tasks.getAll());
            }
        }
    },

    /**
     * Handle clearing completed tasks
     */
    handleClearCompleted() {
        const removedCount = Tasks.clearCompleted();
        if (removedCount > 0) {
            UI.renderTasks(Tasks.getAll());
        }
    },

    /**
     * Handle toggling dark mode
     */
    handleToggleDarkMode() {
        const isDark = document.documentElement.classList.toggle('dark');
        Storage.saveDarkMode(isDark);
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

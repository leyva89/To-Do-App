/**
 * UI Module - Handles DOM rendering and user interactions
 */

const UI = {
    elements: {},

    /**
     * Initialize UI elements
     */
    init() {
        this.elements = {
            taskInput: document.getElementById('taskInput'),
            addTaskBtn: document.getElementById('addTaskBtn'),
            taskList: document.getElementById('taskList'),
            clearCompletedBtn: document.getElementById('clearCompletedBtn'),
            emptyState: document.getElementById('emptyState'),
            editModal: document.getElementById('editModal'),
            editModalContent: document.getElementById('editModalContent'),
            editTaskInput: document.getElementById('editTaskInput'),
            saveEditBtn: document.getElementById('saveEditBtn'),
            cancelEditBtn: document.getElementById('cancelEditBtn'),
            darkModeToggle: document.getElementById('darkModeToggle')
        };
    },

    /**
     * Sanitize HTML to prevent XSS attacks
     * @param {string} str - String to sanitize
     * @returns {string} Sanitized string
     */
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    /**
     * Render all tasks
     * @param {Array} tasks - Array of task objects
     */
    renderTasks(tasks) {
        const taskList = this.elements.taskList;
        const emptyState = this.elements.emptyState;

        // Clear current list
        taskList.innerHTML = '';

        // Show/hide empty state
        if (tasks.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        } else {
            emptyState.classList.add('hidden');
        }

        // Render each task
        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    },

    /**
     * Create a task list item element
     * @param {Object} task - Task object
     * @returns {HTMLElement} Task list item
     */
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'group p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150';
        li.dataset.taskId = task.id;

        const completedClass = task.completed
            ? 'line-through text-gray-400 dark:text-gray-500'
            : 'text-gray-800 dark:text-gray-100 dark:group-hover:text-gray-900';

        li.innerHTML = `
            <div class="flex items-center gap-3">
                <input 
                    type="checkbox" 
                    class="task-checkbox w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all duration-200 hover:scale-110" 
                    ${task.completed ? 'checked' : ''}
                    data-task-id="${task.id}"
                >
                <span class="flex-1 ${completedClass} transition-all duration-200 task-text">
                    ${this.sanitizeHTML(task.text)}
                </span>
                <div class="flex gap-2">
                    <button 
                        class="edit-btn p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700 rounded transition-all duration-200 hover:scale-110" 
                        data-task-id="${task.id}"
                        aria-label="Editar tarea"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <button 
                        class="delete-btn p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 rounded transition-all duration-200 hover:scale-110" 
                        data-task-id="${task.id}"
                        aria-label="Eliminar tarea"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        return li;
    },

    /**
     * Open edit modal
     * @param {string} taskId - ID of task to edit
     * @param {string} currentText - Current task text
     */
    openEditModal(taskId, currentText) {
        this.elements.editModal.classList.remove('hidden');
        this.elements.editModal.classList.add('flex');
        this.elements.editTaskInput.value = currentText;
        this.elements.editTaskInput.focus();
        this.elements.editModal.dataset.editingTaskId = taskId;

        // Add animation
        setTimeout(() => {
            this.elements.editModalContent.classList.remove('scale-95');
            this.elements.editModalContent.classList.add('scale-100');
        }, 10);
    },

    /**
     * Close edit modal
     */
    closeEditModal() {
        this.elements.editModalContent.classList.remove('scale-100');
        this.elements.editModalContent.classList.add('scale-95');

        setTimeout(() => {
            this.elements.editModal.classList.add('hidden');
            this.elements.editModal.classList.remove('flex');
            this.elements.editTaskInput.value = '';
            delete this.elements.editModal.dataset.editingTaskId;
        }, 200);
    },

    /**
     * Get current editing task ID
     * @returns {string|null} Task ID or null
     */
    getEditingTaskId() {
        return this.elements.editModal.dataset.editingTaskId || null;
    },

    /**
     * Clear task input
     */
    clearTaskInput() {
        this.elements.taskInput.value = '';
        this.elements.taskInput.focus();
    },

    /**
     * Get task input value
     * @returns {string} Input value
     */
    getTaskInputValue() {
        return this.elements.taskInput.value;
    },

    /**
     * Get edit input value
     * @returns {string} Input value
     */
    getEditInputValue() {
        return this.elements.editTaskInput.value;
    },

    /**
     * Show a subtle notification (optional enhancement)
     * @param {string} message - Message to show
     * @param {string} type - Type of notification (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Optional: Can be implemented with toast notifications
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
};

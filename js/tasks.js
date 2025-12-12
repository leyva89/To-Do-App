/**
 * Tasks Module - Business logic for task operations
 */

const Tasks = {
    tasks: [],

    /**
     * Initialize tasks from storage
     */
    init() {
        this.tasks = Storage.getTasks();
    },

    /**
     * Generate unique ID for tasks
     * @returns {string} Unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * Get all tasks
     * @returns {Array} Array of tasks
     */
    getAll() {
        return this.tasks;
    },

    /**
     * Add a new task
     * @param {string} text - Task text
     * @returns {Object} The created task
     */
    addTask(text) {
        const trimmedText = text.trim();
        if (!trimmedText) {
            return null;
        }

        const newTask = {
            id: this.generateId(),
            text: trimmedText,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        Storage.saveTasks(this.tasks);
        return newTask;
    },

    /**
     * Toggle task completion status
     * @param {string} id - Task ID
     * @returns {Object|null} Updated task or null if not found
     */
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            Storage.saveTasks(this.tasks);
            return task;
        }
        return null;
    },

    /**
     * Delete a task
     * @param {string} id - Task ID
     * @returns {boolean} True if deleted, false otherwise
     */
    deleteTask(id) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(t => t.id !== id);

        if (this.tasks.length < initialLength) {
            Storage.saveTasks(this.tasks);
            return true;
        }
        return false;
    },

    /**
     * Update task text
     * @param {string} id - Task ID
     * @param {string} newText - New task text
     * @returns {Object|null} Updated task or null if not found or invalid text
     */
    updateTask(id, newText) {
        const trimmedText = newText.trim();
        if (!trimmedText) {
            return null;
        }

        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = trimmedText;
            Storage.saveTasks(this.tasks);
            return task;
        }
        return null;
    },

    /**
     * Clear all completed tasks
     * @returns {number} Number of tasks removed
     */
    clearCompleted() {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(t => !t.completed);

        const removedCount = initialLength - this.tasks.length;
        if (removedCount > 0) {
            Storage.saveTasks(this.tasks);
        }
        return removedCount;
    },

    /**
     * Get task by ID
     * @param {string} id - Task ID
     * @returns {Object|null} Task or null if not found
     */
    getTaskById(id) {
        return this.tasks.find(t => t.id === id) || null;
    }
};

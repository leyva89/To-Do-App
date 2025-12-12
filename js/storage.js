/**
 * Storage Module - Handles localStorage operations
 */

const Storage = {
    TASKS_KEY: 'todoApp_tasks',
    DARK_MODE_KEY: 'todoApp_darkMode',

    /**
     * Get tasks from localStorage
     * @returns {Array} Array of task objects
     */
    getTasks() {
        try {
            const tasks = localStorage.getItem(this.TASKS_KEY);
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error('Error parsing tasks from localStorage:', error);
            return [];
        }
    },

    /**
     * Save tasks to localStorage
     * @param {Array} tasks - Array of task objects
     */
    saveTasks(tasks) {
        try {
            localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks to localStorage:', error);
        }
    },

    /**
     * Clear all tasks from localStorage
     */
    clearTasks() {
        try {
            localStorage.removeItem(this.TASKS_KEY);
        } catch (error) {
            console.error('Error clearing tasks from localStorage:', error);
        }
    },

    /**
     * Get dark mode preference
     * @returns {boolean} Dark mode enabled or not
     */
    getDarkMode() {
        try {
            const darkMode = localStorage.getItem(this.DARK_MODE_KEY);
            return darkMode === 'true';
        } catch (error) {
            console.error('Error getting dark mode preference:', error);
            return false;
        }
    },

    /**
     * Save dark mode preference
     * @param {boolean} enabled - Dark mode enabled or not
     */
    saveDarkMode(enabled) {
        try {
            localStorage.setItem(this.DARK_MODE_KEY, enabled.toString());
        } catch (error) {
            console.error('Error saving dark mode preference:', error);
        }
    }
};

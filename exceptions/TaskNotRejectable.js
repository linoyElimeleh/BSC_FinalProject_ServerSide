class TaskNotRejectable extends Error {
    constructor(message) {
        message = message || "Task cannot be rejected. User might not have sufficient points.";
        super(message)

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = TaskNotRejectable;
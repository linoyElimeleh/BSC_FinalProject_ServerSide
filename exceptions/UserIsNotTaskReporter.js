class UserIsNotTaskReporter extends Error {
    constructor(message) {
        message = message ? message : "User is not an owner or assignee of this task and therefore not a reporter for this task."
        super(message)

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserIsNotTaskReporter
export class PasswordsDoNotMatchError extends Error {
    constructor() {
        super("Passwords do not match");
    }
}
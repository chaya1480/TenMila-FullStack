class PasswordError extends Error {
    constructor(massage) {
        super(`error: ${massage}`);
        this.name = 'PasswordError'; 
    }
}

module.exports = PasswordError;
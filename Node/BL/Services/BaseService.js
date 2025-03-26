const IdError = require("../ERRORS/IdError");

class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async get(queryParams) {
        let result = await this.repository.get(queryParams);
        return result;
    }
    async getById(id) {
        let result = await this.repository.getById(id);
        if(result)
            return result;
        else
            throw new IdError('the id is not exist');
    }
    async register(objToInsert) {
        let result = await this.repository.insert(objToInsert);
        return result;
    }
    async update(id, objToUpdate) {
        let result = await this.repository.update(id, objToUpdate);
        return result;
    }
    async delete(id) {
        let result = await this.repository.delete(id);
        return result;
    }
}
module.exports = BaseService;

class AuthorizationService {
    checkData(request) {
        if(!request)
        {
            throw new Error()
        }
        
    }
}

module.exports = new AuthorizationService();
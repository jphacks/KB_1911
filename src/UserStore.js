import {Auth} from 'aws-amplify'

class User {
    username = '';

    async init() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            this.username = user.username;
        } catch (err) {
            console.log('error getting user data... ', err)
        }
        console.log(this.username)
    }
}

export default new User()
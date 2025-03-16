export const users = {

    admin: { password: "securepassword123" },

};



export const authenticate = (username, password) => {

    if (users[username] && users[username].password === password) {

        return true;

    }

    return false;

};


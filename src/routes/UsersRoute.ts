import Db from "../Db";
import * as uuid from "uuid"
class UsersRoute {
    private static handleServerError(req, res, error): void {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
    }
    private static verifyUuid(id): boolean {
        const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (id.match(uuidV4Regex)) {
            return true;
        } else {
            return false;
        }
    }
    public static getAllUsers(req, res) :void {
        try {
            //throw new Error("random error in rroute");
            const allUsers = Db.getAllUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(allUsers));
            res.end();
        } catch (err) {
            UsersRoute.handleServerError(req, res, err);
        }
    }
    public static getUser(req, res, id):void {
        try {
            //throw new Error("random error in rroute");
            if (UsersRoute.verifyUuid(id)) {
                const singleUser = Db.getUser(id);
                if (singleUser != undefined) {
                    console.log(singleUser);
                    console.log(typeof singleUser);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify(singleUser));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify({ message: 'User doesn\'t exist' }));
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'User Id is invalid' }));
            }
            res.end();
        } catch (err) {
            UsersRoute.handleServerError(req, res, err);
        }
    }
    public static addUser(req, res):void {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                const { username, age, hobbies } = JSON.parse(body);
                if (username && age && hobbies) {
                    const newUser = { id: uuid.v4(), username: username, age: age, hobbies: hobbies }
                    Db.addUser(newUser);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newUser));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify({ message: 'required field(s) missing' }));
                    res.end();
                }
            });
        } catch (err) {
            UsersRoute.handleServerError(req, res, err);
        }
    }
    public static updateUser(req, res, id):void {
        try {
            if (UsersRoute.verifyUuid(id)) {
                const singleUser = Db.getUser(id);
                if (singleUser != undefined) {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    req.on('end', async () => {
                        const { username, age, hobbies } = JSON.parse(body);
                        if (username && age && hobbies) {
                            const updatedUser = { id: id, username: username, age: age, hobbies: hobbies }
                            Db.updateUser(updatedUser);
                            const retrieve = Db.getUser(id);
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            console.log(retrieve);
                            res.write(JSON.stringify(retrieve));
                            res.end();
                        } else {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.write(JSON.stringify({ message: 'required field(s) missing' }));
                            res.end();
                        }
                    });
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify({ message: 'User doesn\'t exist' }));
                    res.end();
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'User Id is invalid' }));
                res.end();
            }
        } catch (err) {
            UsersRoute.handleServerError(req, res, err);
        }
    }
    public static deleteUser(req, res, id) :void{
        try {
            if (UsersRoute.verifyUuid(id)) {
                const singleUser = Db.getUser(id);
                if (singleUser != undefined) {
                    console.log(singleUser);
                    if (Db.deleteUser(id)) {
                        console.log(`deleted ${id}`);
                        res.writeHead(204, { 'Content-Type': 'application/json' });
                    } else {
                        throw new Error("error deleting from Map");
                    };
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify({ message: 'User doesn\'t exist' }));
                }
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'User Id is invalid' }));
            }
            res.end();
        } catch (err) {
            UsersRoute.handleServerError(req, res, err);
        }
    }
}

export default UsersRoute;
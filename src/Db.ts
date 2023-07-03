//import { v4 as uuidv4 } from 'uuid';
import User from './models/User';

class Db {
    private static users: Map<string, User> = new Map<string, User>();

    constructor() {
        Db.users = new Map<string, User>();
    }

    static getUser(id: string): User | undefined {
        return Db.users.get(id);
    }

    static addUser(user: User): void {
        Db.users.set(user.id, user);
    }

    static deleteUser(id: string): boolean {
        return Db.users.delete(id);
    }

    static updateUser(user: User): void {
        //todo
        const record: User | undefined = Db.users.get(user.id);
        if (record) {
            /*let el: string;
            for (el of Object.keys(user)) {
                record[el as keyof] = user[el as keyof User];
            }*/
            Object.assign(record, user);
            Db.users.set(user.id, record);
        }
    }

    static getAllUsers(): Array<User> {
        const allUsers: Array<User> = [];
        for (const entry of Db.users.entries()) {
            console.log("adding", entry[0], entry[1] as User);
            allUsers.push(entry[1]);
        }
        return allUsers;
    }
}

export default Db;
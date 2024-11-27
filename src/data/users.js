// registered users in this array
export const users = [];

// online users who have socket connections right now
const onlineUsers = [];

export function joinUser(id, username, room) {
    const user = { id, username, room };

    onlineUsers.push(user);

    return user;
}

export function getCurrentUser(id) {
    return onlineUsers.find(user => user.id === id);
}

export function leaveUser(id) {
    const index = onlineUsers.findIndex(user => user.id === id);

    if (index !== -1) {
        return onlineUsers.splice(index, 1)[0];
    }
}

export function roomUsers(room) {
    return onlineUsers.filter(user => user.room === room);
}
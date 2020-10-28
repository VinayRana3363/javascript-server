export default interface Permissions {
    'getUsers': {
        all: string[],
        read: string[],
        write: string[],
        delete: string[],
    };
}


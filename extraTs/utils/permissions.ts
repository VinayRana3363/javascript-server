


export default function hasPermissio(moduleName, role, permissionType): boolean {
    console.log('Permissions module is started and verify the permissions');
    let type;
    const { all, read, write, Delete } = moduleName;
    if (permissionType === 'all')
        type = all;
    if (permissionType === 'read')
        type = read;
    if (permissionType === 'write')
        type = write;
    if (permissionType === 'Delete')
        type = Delete;
    if (role === 'head-trainer') { return true; }
    else {
        if (type.includes(role))
            return true;
        else return false;
    }
}



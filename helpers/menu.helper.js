
const getMenu = (role) => {
    const menu = [
        {
            title: 'Main',
            icon: 'mdi mdi-gauge',
            children: [
                { title: 'Progress bar', path: 'main/progress' },
                { title: 'Charts', path: 'main/charts' },
                { title: 'Promises', path: 'main/promises' },
                { title: 'Rxjs', path: 'main/rxjs' }
            ]
        },
        {
            title: 'Management',
            icon: 'mdi mdi-folder-lock-open',
            children: [
                { title: 'Users', path: 'management/users' },
                { title: 'Hospitals', path: 'management/hospitals' },
                { title: 'Doctors', path: 'management/doctors' },
            ]
        }
    ];

    if(role !== 'ADMIN_ROLE') {
        menu[menu.length -1].children.splice(0,1);
    }

    return menu;
}

module.exports = {
    getMenu
};
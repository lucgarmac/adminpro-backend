
const getMenu = (role) => {
    const menu = [
        {
            title: 'Main',
            icon: 'mdi mdi-gauge',
            children: [
                { title: 'Dashboard', path: '/' },
                { title: 'Progress bar', path: 'progress' },
                { title: 'Charts', path: 'charts' },
                { title: 'Promises', path: 'promises' },
                { title: 'Rxjs', path: 'rxjs' }
            ]
        },
        {
            title: 'Management',
            icon: 'mdi mdi-folder-lock-open',
            children: [
                { title: 'Users', path: 'users' },
                { title: 'Hospitals', path: 'hospitals' },
                { title: 'Doctors', path: 'doctors' },
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

const getMenuFrontEnd = ( role = 'USER_ROLE' ) => {
    const menu = [
        {
          title: 'Principal',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Progress', url: '/progress' },
            { title: 'Gráficas', url: '/graphs1' },
            { title: 'Promesas', url: '/promises' },
            { title: 'RXJS', url: '/rxjs' }
          ]
        },
    
        {
          title: 'Mantenimiento',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // { title: 'Usuarios', url: '/users' },
            { title: 'Hospitales', url: '/hospitals' },
            { title: 'Doctores', url: '/doctors' }
          ]
        }
      ]
    if ( role === 'ADMIN_ROLE' ) {
        menu[1].submenu.unshift( { title: 'Usuarios', url: '/users' } )
    }

    return menu
}

module.exports = {
    getMenuFrontEnd
}

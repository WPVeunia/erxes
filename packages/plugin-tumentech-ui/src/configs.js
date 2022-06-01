module.exports = {
  name: 'tumentech',
  port: 3023,
  scope: 'tumentech',
  url: 'http://localhost:3023/remoteEntry.js',
  exposes: {
    './routes': './src/routes.tsx',
    './participantsSection': './src/Participants.tsx',
    './carSection': './src/components/common/CarSection.tsx'
  },
  routes: {
    url: 'http://localhost:3023/remoteEntry.js',
    scope: 'tumentech',
    module: './routes'
  },
  menus: [
    {
      text: 'Tumentech',
      url: '/erxes-plugin-tumentech/list',
      icon: 'icon-car',
      location: 'mainNavigation',
      permission: 'showCars'
    }
  ],
  customerRightSidebarSection: [
    {
      text: 'customerSection',
      component: './carSection',
      scope: 'tumentech'
    }
  ],
  companyRightSidebarSection: [
    {
      text: 'companySection',
      component: './carSection',
      scope: 'tumentech'
    }
  ],
  dealRightSidebarSection: [
    {
      text: 'carSection',
      component: './carSection',
      scope: 'tumentech'
    },
    {
      text: 'participantsSection',
      component: './participantsSection',
      scope: 'tumentech'
    }
  ]
};
export function initialize(appInstance) {
  let lookupSource;

  if (appInstance.lookup) {
    lookupSource = appInstance;
  } else {
    // ember 1.13 support
    lookupSource = appInstance.container;
  }

  let { application } = appInstance;
  let fullName = 'service:router';
  let router = lookupSource.lookup('router:main');
  // use application for ember 1.13
  if (application.hasRegistration) {
    appInstance.register(fullName, router, { singleton: true, instantiate: false });
  } else {
    application.register(fullName, router, { singleton: true, instantiate: false });
  }

}

export default {
  name: 'router-service',
  initialize
};

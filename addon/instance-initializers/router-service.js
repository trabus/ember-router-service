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
  
  let registerSource;

  // use application for ember 1.13
  if (application.hasRegistration) {
    registerSource = appInstance;
  } else {
    registerSource = application;
  }

  let router = lookupSource.lookup('router:main');

  registerSource.register(fullName, router, { singleton: true, instantiate: false });
}

export default {
  name: 'router-service',
  initialize
};

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
  let registerOptions = { singleton: true, instantiate: false };
  // use application for ember 1.13
  if (application.hasRegistration) {
    appInstance.register(fullName, router, registerOptions);
  } else {
    application.register(fullName, router, registerOptions);
  }

}

export default {
  name: 'router-service',
  initialize
};

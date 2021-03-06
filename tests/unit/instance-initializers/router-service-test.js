import Ember from 'ember';
import { initialize } from 'dummy/instance-initializers/router-service';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import sinon from 'sinon';

module('Unit | Instance Initializer | router service', {
  beforeEach: function() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach: function() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});

test('can lookup service', function(assert) {
  initialize(this.appInstance);

  let lookupSource;

  if (this.appInstance.lookup) {
    lookupSource = this.appInstance;
  } else {
    // ember 1.13 support
    lookupSource = this.appInstance.container;
  }

  let router = lookupSource.lookup('service:router');

  assert.ok(router.transitionTo);
});

test('doesn\'t error when run multiple times (fastboot support)', function(assert) {
  if (!this.appInstance.hasRegistration) {
    // skip fastboot check if ember 1.13
    assert.ok(true);
    return;
  }

  initialize(this.appInstance);
  initialize(this.appInstance);

  assert.ok(this.appInstance.hasRegistration('service:router'));
});

test('ensure register is called for 1.13', function(assert) {
  let register = sinon.spy();

  let appInstance = {
    container: {
      lookup: sinon.stub().returns({}),
    },
    application: {
      register
    }
  };

  initialize(appInstance);

  assert.ok(register.calledOnce);
});

test('ensure register is called for 2.x', function(assert) {
  let register = sinon.spy();

  let appInstance = {
    lookup: sinon.stub().returns({}),
    register
  };

  initialize(appInstance);

  assert.ok(register.calledOnce);
});

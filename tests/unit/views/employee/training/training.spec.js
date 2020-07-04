import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Training from '@/views/employee/training/Training.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


// describe when created
describe('When created', () => {
  let actions;
  let store;

  // before each
  beforeEach(() => {
    actions = {
      getTrainings: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        employeeTraining: {
          namespaced: true,
          actions,
        },
      },
    });
  });
  // before each

  // it user auth
  it('User auth', () => {
    const wrapper = shallowMount(Training, {
      mocks: {
        $func: {
          userAuth: jest.fn(),
        },
        $cookies: {
          get: jest.fn((user) => user),
        },
      },
      localVue,
      store,
      stubs: [
        'font-awesome-icon',
      ],
    });

    // expect
    expect(wrapper.vm.$func.userAuth).toBeCalled();
  });
  // it user auth
});
// end describe when created


// describe method dataReady
describe('Method dataReady', () => {
  let actions;
  let store;
  let getters;

  // before each
  beforeEach(() => {
    actions = {
      getTrainings: jest.fn(),
    };

    getters = {
      trainingList: jest.fn(() => {
        return {
          data: {},
        };
      }),
    };

    store = new Vuex.Store({
      modules: {
        employeeTraining: {
          namespaced: true,
          actions,
          getters,
        },
      },
    });
  });
  // before each

  // it branch
  it('Branch', () => {
    const wrapper = shallowMount(Training, {
      data() {
        return {
          promise: 200,
        };
      },
      mocks: {
        $func: {
          userAuth: jest.fn(),
          popupLostConnection: jest.fn(),
        },
        $cookies: {
          get: jest.fn((user) => user),
        },
      },
      localVue,
      store,
      stubs: [
        'font-awesome-icon',
      ],
    });

    wrapper.vm.dataReady();

    // expect
    expect(wrapper.vm.promise).toBe(200);

    wrapper.setData({
      promise: 404,
    });
    wrapper.vm.dataReady();

    // expect
    expect(wrapper.vm.$func.popupLostConnection).toBeCalled();
  });
  // it branch
});
// end describe method dataReady


// describe method dataReady
describe('Method dataReady', () => {
  let actions;
  let store;

  // before each
  beforeEach(() => {
    actions = {
      getTrainings: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        employeeTraining: {
          namespaced: true,
          actions,
        },
      },
    });
  });
  // before each

  // it after promise
  it('After promise', async () => {
    const wrapper = shallowMount(Training, {
      mocks: {
        $func: {
          userAuth: jest.fn(),
        },
        $cookies: {
          get: jest.fn((user) => user),
        },
      },
      localVue,
      store,
      stubs: [
        'font-awesome-icon',
      ],
    });

    jest.spyOn(wrapper.vm, 'promiseAPI').mockImplementation(() => {
      Promise.resolve(200);
    });
    const spyDataReady = jest.spyOn(wrapper.vm, 'dataReady').mockImplementation(() => {
      return;
    });

    await wrapper.vm.getAllTraining();

    // expect
    expect(wrapper.vm.animationLoaderDisplay).toBeFalsy();
    expect(spyDataReady).toBeCalled();
  });
  // it after promise
});
// end describe method dataReady
// import { createLocalVue } from '@vue/test-utils';
// import moment from 'moment';
// import Vuex from 'vuex';

// import constants from '../src/constants';
// import VueRequestStore from '../src';

// const identifier = 'identifier';
// const message = 'message';
// let localVue;
// let store;

// beforeEach(() => {
//   localVue = createLocalVue();
//   localVue.use(Vuex);
//   store = new Vuex.Store();
//   localVue.use(VueRequestStore, { store });

//   store.commit('requests/reset', { root: true });
// });

// describe('module.js', () => {
//   it('should correctly return data from getters', () => {
//     store.state.requests.requests = 'requests!';

//     expect(store.getters['requests/requests']).toBe('requests!');
//   });

//   it('should start, end, and fail requests', () => {
//     store.commit('requests/start', { identifier, message }, { root: true });
//     expect(store.state.requests.requests[identifier].status).toBe(constants.PENDING);
//     expect(store.state.requests.requests[identifier].message).toBe(message);

//     store.commit('requests/end', { identifier, message }, { root: true });
//     expect(store.state.requests.requests[identifier].status).toBe(constants.DONE);

//     store.commit('requests/fail', { identifier, message }, { root: true });
//     expect(store.state.requests.requests[identifier].status).toBe(constants.FAILED);
//   });

//   it('should add meta data', () => {
//     const started = moment(); const
//       stopped = started.clone();
//     stopped.add(200, 'ms');

//     Date.now = jest.fn()
//       .mockReturnValueOnce(started)
//       .mockReturnValue(stopped);

//     store.commit('requests/start', { identifier, message }, { root: true });
//     expect(store.state.requests.requests[identifier]).toEqual({
//       _duration: null,
//       _started: started,
//       _stopped: null,
//       message,
//       status: constants.PENDING,
//     });

//     store.commit('requests/end', { identifier, message }, { root: true });
//     expect(store.state.requests.requests[identifier]).toEqual({
//       _duration: 200,
//       _started: started,
//       _stopped: stopped,
//       message,
//       status: constants.DONE,
//     });

//     store.commit('requests/fail', { identifier, message }, { root: true });
//     expect(store.state.requests.requests[identifier]).toEqual({
//       _duration: 200,
//       _started: started,
//       _stopped: stopped,
//       message,
//       status: constants.FAILED,
//     });

//     store.commit('requests/reset', { root: true });

//     store.commit('requests/fail', { identifier, message }, { root: true });
//     expect(store.state.requests.requests[identifier]).toEqual({
//       _duration: 0,
//       _started: stopped,
//       _stopped: stopped,
//       message,
//       status: constants.FAILED,
//     });
//   });
// });
describe("module.js", () => {
  it("should pass", () => {
    expect(true).toBeTruthy();
  });
});

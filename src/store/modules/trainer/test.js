import axios from 'axios';
import config from '@/config';

const { API } = config;

const data = {
  materialsTest: {},
  test: {},
};

const getters = {
  materialTestList(state) {
    return state.materialsTest;
  },

  questionTest(state) {
    return state.test;
  },
};

const mutations = {
  setMaterialTest(state, value) {
    state.materialsTest = value;
  },

  setTest(state, value) {
    state.test = value;
  },
};

const actions = {
  getMaterialsTest({ commit }, payload) {
    axios({
      method: 'get',
      url: `${API}/trainer/test`,
      params: payload.params,
      responseType: 'json',
    })
      .then((res) => {
        commit('setMaterialTest', res.data);
        payload.resolve(res.data.code);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getTest({ commit }, payload) {
    axios({
      method: 'get',
      url: `${API}/trainer/test/preview`,
      params: payload.params,
      responseType: 'json',
    })
      .then((res) => {
        commit('setTest', res.data);
        payload.resolve(res.data.code);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  postTest({ commit }, payload) {
    axios({
      method: 'post',
      url: `${API}/trainer/test`,
      data: payload.params,
      responseType: 'json',
    })
      .then((res) => {
        console.log(commit);
        payload.resolve(res.data.code);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  putTest({ commit }, payload) {
    axios({
      method: 'put',
      url: `${API}/trainer/test`,
      data: payload.params,
      responseType: 'json',
    })
      .then((res) => {
        console.log(commit);
        payload.resolve(res.data.code);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions,
};
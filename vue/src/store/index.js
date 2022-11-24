import { createStore } from 'vuex';
import axiosClient from '../axios';
import router  from '../router';


const store = createStore({
  state: {
    user: {
      data: JSON.parse(sessionStorage.getItem('USER')),
      token: sessionStorage.getItem('TOKEN'),
    },
    dashboard: {
      loading: false,
      data: {
        totalSurveys:null,
        latestSurvey:{
        title:null,
        slug:null,
        status:null,
        image:null,
        description:null,
        questions:[],
        _id:null,
        created_at:null,
        updated_at:null,
        answers:[]},
        totalAnswers:null,
        latestAnswers:[{answers:[],surveyTitle:null,_id:null,created_at:null}]
      }
    },
    currentSurvey: {
      loading: false,
      data: {}
    },
    currentAnswer: {
      loading: false,
      data: []
    },
    surveys: {
      loading: false,
      data: []
    },
    answers: {
      loading: false,
      data: []
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    notification: {
      show: false,
      type: null,
      message: null
    }
  },
  getters: {},
  actions: {
    getAnswers({ commit }) {
      commit("setAnswersLoading", true)
      return axiosClient.get("/api/answers").then((res) => {
        commit("setAnswersLoading", false)
        commit("setAnswers", res.data)
        return res;
      })
    },
    getAnswer({ commit }, {sid, aid}) {
      commit("setCurrentAnswerLoading", true);
      return axiosClient.get(`/api/answers/${sid}/${aid}`).then((res) => {
        commit("setCurrentAnswer", res.data);
        commit("setCurrentAnswerLoading", false);
        return res
      }).catch((err) => {
        commit("setCurrentAnswerLoading", false);
        throw err
      })
    },
    getSurvey({ commit }, id) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient.get(`/api/surveys/${id}`).then((res) => {
        commit("setCurrentSurvey", res.data);
        commit("setCurrentSurveyLoading", false);
        return res
      }).catch((err) => {
        commit("setCurrentSurveyLoading", false);
        throw err
      })
    },
    getSurveys({ commit }) {
      commit("setSurveysLoading", true)
      return axiosClient.get("/api/surveys").then((res) => {
        commit('setSurveysLoading', false)
        commit("setSurveys", res.data)
        return res;
      })
    },
    saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        response = axiosClient.put(`/api/surveys/${survey.id}`, survey).then((res) => {
          commit("updateSurvey", res.data);
          commit("notify", {
            type: "success",
            message: "Survey was successfully updated",
          });
          return res;
        })
      } else {
        response = axiosClient.post('/api/surveys', survey).then((res) => {
          commit("saveSurvey", res.data);
          commit("notify", {
            type: "success",
            message: "Survey was successfully created",
          });
          return res;
        });
      }
      return response;
    },
    deleteSurvey({}, id) {
      return axiosClient.delete(`/api/surveys/${id}`);
    },
    deleteAnswer({}, {sid, aid}) {
      return axiosClient.delete(`/api/answers/${sid}/${aid}`);
    },
    getDashboardData({ commit }) {
      commit("setDashboardLoading", true);
      return axiosClient.get(`/api/dashboard`).then((res) => {
        commit("setDashboardLoading", false);
        commit("setDashboardData", res.data);
        return res
      }).catch((err) => {
        commit("setDashboardLoading", false);
        throw err;
      })
    },
    getSurveyBySlug({ commit }, {id, slug}) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient.get(`/api/guest_survey/${id}/${slug}`).then((res) => {
        commit("setCurrentSurvey", res.data);
        commit("setCurrentSurveyLoading", false);
        return res;
      }).catch((err) => {
        commit("setCurrentSurveyLoading", false);
        throw err;
      })
    },
    saveSurveyAnswer({commit}, {userId, surveyId, answers}) {
      return axiosClient.post(`/api/guest_survey/${userId}/${surveyId}`, {answers})
    },
    register({ commit }, user) {
      return axiosClient.post('/register', user).then(({data}) => {
        commit('setUser', data);
        return data;
      })
    },
    login({ commit }, user) {
      return axiosClient.post('/login', user).then(({data}) => {
        commit('setUser', data);
        return data;
      })
    },
  },
  mutations: {
    setAnswers: (state, answers) => {
      state.answers.data = answers.data
    },
    setAnswersLoading: (state, loading) => {
      state.answers.loading = loading;
    },
    setCurrentAnswer: (state, answer) => {
      state.currentAnswer.data = answer.data
    },
    setCurrentAnswerLoading: (state, loading) => {
      state.currentAnswer.loading = loading;
    },
    setDashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data.data;
    },
    setCurrentSurvey: (state, survey) => {
      survey.data.id = survey.data._id;
      delete survey.data._id
      state.currentSurvey.data = survey.data
    },
    setSurveys: (state, surveys) => {
      surveys.data = surveys.data.map(survey => {
        survey.id = survey._id;
        delete survey._id
        return survey;
      })
      state.surveys.data = surveys.data
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    saveSurvey: (state, survey) => {
      survey.id = survey._id;
      delete survey._id
      state.surveys.data = [...state.surveys.data, survey];
    },
    updateSurvey: (state, survey) => {
      survey.id = survey._id;
      delete survey._id
      state.surveys.data = state.surveys.data.map((s) => {
        if(s.id == survey.id) {
          return survey;
        }
        return s;
      });
    },
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN');
      router.push({
        name: "Login",
      });
    },
    setUser: (state, userData) => {
      const user = {
        name: userData.name,
        email: userData.email,
        id: userData._id
      }
      state.user.token = userData.token;
      state.user.data = user;
      sessionStorage.setItem('TOKEN', userData.token);
      sessionStorage.setItem('USER', JSON.stringify(user));
    },
    notify: (state, {message, type}) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000);
    }
  },
  modules: {},
})

export default store;

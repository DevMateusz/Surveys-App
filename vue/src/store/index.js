import { createStore } from 'vuex';
import axiosClient from '../axios';

const tmpSurveys = [
  {
    id: 100,
    title: "Some super survey",
    slug: "some-super-survey",
    status: "draft",
    image: "https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    description: "My name is john cena. look at my super survay. Try win prize",
    created_at: "21-12-20 18:00:00",
    updated_at: "21-12-20 18:00:00",
    expire_at: "21-12-31 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "aa1fss-23fs-2342-f32d-32rfwdf2143", text: "USA" },
            { uuid: "aa2fss-23fs-2342-f32d-32sfwdf2143", text: "Poland" },
            { uuid: "aa3fss-23fs-2342-f32d-32bfwdf2143", text: "Germany" },
            { uuid: "aa4fss-23fs-2342-f32d-32vfwdf2143", text: "India" },
            { uuid: "aa5fss-23fs-2342-f32d-32xfwdf2143", text: "What is country?" },
          ]
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "Which language do you speak",
        description: "something something something something something something something something something something ",
        data: {
          options: [
            { uuid: "bb1fss-23fs-2342-f32d-32rfwdf2143", text: "USA" },
            { uuid: "bb2fss-23fs-2342-f32d-32sfwdf2143", text: "Poland" },
            { uuid: "bb3fss-23fs-2342-f32d-32bfwdf2143", text: "Germany" },
            { uuid: "bb4fss-23fs-2342-f32d-32vfwdf2143", text: "India" },
            { uuid: "bb5fss-23fs-2342-f32d-32xfwdf2143", text: "What is country?" },
          ]
        },
      },
      {
        id: 3,
        type: "text",
        question: "What is your favorite YouTube channel?",
        description: null,
        data: {},
      },
      {
        id: 4,
        type: "textarea",
        question: "What do you think about this survey",
        description: "Write something",
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: "22222Some super survey",
    slug: "some-super-survey",
    status: "draft",
    image: "https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    description: "My name is john cena. look at my super survay. Try win prize",
    created_at: "21-12-20 18:00:00",
    updated_at: "21-12-20 18:00:00",
    expire_at: "21-12-31 18:00:00",
    questions: []
  },
  {
    id: 300,
    title: "33333Some super survey",
    slug: "some-super-survey",
    status: "draft",
    image: "https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    description: "My name is john cena. look at my super survay. Try win prize",
    created_at: "21-12-20 18:00:00",
    updated_at: "21-12-20 18:00:00",
    expire_at: "21-12-31 18:00:00",
    questions: []
  },
  {
    id: 400,
    title: "4444Some super survey",
    slug: "some-super-survey",
    status: "draft",
    image: "https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    description: "My name is john cena. look at my super survay. Try win prize",
    created_at: "21-12-20 18:00:00",
    updated_at: "21-12-20 18:00:00",
    expire_at: "21-12-31 18:00:00",
    questions: []
  },
];


const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    surveys: [...tmpSurveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters: {},
  actions: {
    saveSurvey({ commit }, survey) {
      let response;
      if (survey.id) {
        response = axiosClient.put(`/survey/${survey.id}`, survey).then((res) => {
          commit("updateSurvey", res.data);
          return res;
        })
      } else {
        response = axiosClient.post('/survey', survey).then((res) => {
          console.log(res.data);
          commit("saveSurvey", res.data);
          return res;
        });
      }
      return response;
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
    saveSurvey: (state, survey) => {
      console.log(survey);
      state.surveys = [...state.surveys, survey];
    },
    updateSurey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if(s.id == survey.data.id) {
          return survey.data;
        }
        return s;
      });
    },
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN');
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
    }
  },
  modules: {},
})

export default store;

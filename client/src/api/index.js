import axios from 'axios'

const API = axios.create({ baseURL: 'http://192.168.43.22:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);

export const getProfile = (id) => API.get(`/user/profile/${id}`);
export const updateProfile = (profileData, id) => API.patch(`/user/profile/update/${id}`, profileData);

// export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
// export const getAllQuestions = () => API.get('/questions/get');
// export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`) 
// export const voteQuestion = (id, value ) => API.patch(`/questions/vote/${id}`, { value })

// export const postAnswer = (id, noOfAnswers, answerBody, userAnswered ) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered })
// export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers})

// export const getAllUsers = () => API.get('/user/getAllUsers');
// export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)

// export const sendMessage = (messageData) => API.patch(`/chatbot`, messageData)
import * as api from './api1.js'

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllIdeas() {
    return api.get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
}

export async function getById(id){
    return api.get('/data/ideas/' + id);
}

export async function createIdea(ideaData){
    return api.post('/data/ideas', ideaData);
}

export async function deleteIdeaById(id) {
    return api.del('/data/ideas/'+ id);
}
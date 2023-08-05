import { get, post } from "./api.js";

const endpoints = {
    likes: '/data/likes',
    byFactId: factId => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    byFactIdAndUserId: (factId, userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function like(factId){
    return post(endpoints.likes, {factId});
}

export async function getLikes(factId){
    return get(endpoints.byFactId(factId));
}

export async function getUserLikes(factId, userId) {
    return get(endpoints.byFactIdAndUserId(factId, userId));
}
import { del, get, post, put } from "./api.js";

const endpoints = {
    catalog: '/data/fruits?sortBy=_createdOn%20desc',
    byId: '/data/fruits/',
    create: '/data/fruits'
}

export async function getAllFruits() {
    return get(endpoints.catalog);
}

export async function getById(id) {
    return get(endpoints.byId + id);
}

export async function createFruit(data) {
    return post(endpoints.create, data);
}

export async function updateFruit(id, data) {
    return put(endpoints.byId + id, data);
}

export async function deleteFruit(id) {
    return del(endpoints.byId + id);
}

export async function searchFruit(query) {
    const searchParam = `name LIKE "${query}"`;
    return get(endpoints.create + `?where=${encodeURIComponent(searchParam)}`);
}

window.api = {searchFruit,
getAllFruits}
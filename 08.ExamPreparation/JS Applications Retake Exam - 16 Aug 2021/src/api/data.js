import { del, get, post, put } from "./api.js";

export async function getAll() {
    return get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function getById(id) {
    return get('/data/games/' + id);
}

export async function deleteById(id) {
    return del('/data/games/' + id);
}

export async function createGame(gameData) {
    return post('/data/games', gameData);
}

export async function editGame(id, gameData) {
    return put('/data/games/' + id, gameData);
}
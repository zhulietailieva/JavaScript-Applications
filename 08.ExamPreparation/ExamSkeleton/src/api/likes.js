import { get, post } from './api.js';

export async function like(itemID) {
        //url from the Problem description file
    return post('/data/likes', {
        itemID
    });
}

export async function getLikes(itemID) {
        //url from the Problem description file
    return get(`/data/likes?where=albumId%3D%22${itemID}%22&distinct=_ownerId&count`);
}

export async function getOwnLikes(itemID, userId) {
    //url from the Problem description file
    return get(`/data/likes?where=albumId%3D%22${itemID}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
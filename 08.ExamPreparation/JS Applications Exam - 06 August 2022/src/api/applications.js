import {get,post} from './api.js';

export async function apply(itemId){
    return post('/data/applications',{itemId});
}

export async function getApplications(itemId){
    return get(`/data/applications?where=offerId%3D%22${itemId}%22&distinct=_ownerId&count`);
}

export async function getOwnApplication(itemId,userId){
    return get(`/data/applications?where=offerId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
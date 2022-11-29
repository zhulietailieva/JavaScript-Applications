import { get } from "./api";

export async function getAll(){
    return get('/data/shoes?sortBy=_createdOn%20desc');
}
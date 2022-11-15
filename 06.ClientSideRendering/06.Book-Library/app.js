import {html,render} from './node_modules/lit-html/lit-html.js';

let response= await fetch('http://localhost:3030/jsonstore/collections/books');
let data =await response.json();
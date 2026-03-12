// src/routes/api/villages/+server.js


import pool from '$lib/server/database.js';
import { API_USER, API_PASS } from '$env/static/private';
 

function checkAuth(request) {
    const auth = request.headers.get('Authorization');
    if (!auth?.startsWith('Basic ')) return false;
    const decoded = atob(auth.slice(6));
    const [user, pass] = decoded.split(':');
    return user === API_USER && pass === API_PASS;
}


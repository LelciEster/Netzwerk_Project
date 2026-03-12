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
export async function GET() {
    const [rows] = await pool.query('SELECT * FROM villages');
    return Response.json(rows, { status: 200 });
}

export async function POST({request}) {
    if (!checkAuth(request))  {
        return Response.json({ message:'Unauthorized'}, { status: 401 });
        }
       const { name, location, type, population, area_km2, elevation_m, municipality, description } = await request.json(); if (!name || !location || !type) { return Response.json({ message: 'Missing required fields: name, location, type' }, { status: 400 }); }
    
}

const [result] = await pool.query( 'INSERT INTO villages (name, location, type, population, area_km2, elevation_m, municipality, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, location, type, population ?? null, area_km2 ?? null, elevation_m ?? null, municipality ?? null, description ?? null]

 ); 
 return Response.json({  message: 'Village created', id: result.insertId }, { status: 201 });
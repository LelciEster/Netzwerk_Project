import pool from '$lib/server/database.js';
import { API_USER, API_PASS } from '$env/static/private';

// Checks if the request has valid Basic Auth credentials
// Decodes the Base64 header and compares with env variables

function checkAuth(request) {
    const auth = request.headers.get('Authorization');
    if (!auth?.startsWith('Basic ')) return false;
    const decoded = atob(auth.slice(6));
    const [user, pass] = decoded.split(':');
    return user === API_USER && pass === API_PASS;
}
// GET /api/villages/:id - public, no auth needed
// Returns 404 if the village does not exist

export async function GET({ params }) {
    const [rows] = await pool.query('SELECT * FROM villages WHERE id = ?', [params.id]);

    if (rows.length === 0) {
        return Response.json({ message: 'Village not found' }, { status: 404 });
    }

    return Response.json(rows[0], { status: 200 });
}
export async function PUT({ params, request }) {
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [existing] = await pool.query('SELECT * FROM villages WHERE id = ?', [params.id]);
    if (existing.length === 0) {
        return Response.json({ message: 'Village not found' }, { status: 404 });
    }

    const { name, location, type, population, area_km2, elevation_m, municipality, description } = await request.json();

    if (!name || !location || !type) {
        return Response.json({ message: 'Missing required fields: name, location, type' }, { status: 400 });
    }

    await pool.query(
        'UPDATE villages SET name = ?, location = ?, type = ?, population = ?, area_km2 = ?, elevation_m = ?, municipality = ?, description = ? WHERE id = ?',
        [name, location, type, population ?? null, area_km2 ?? null, elevation_m ?? null, municipality ?? null, description ?? null, params.id]
    );

    return Response.json({ message: 'Village updated' }, { status: 200 });
}

export async function DELETE({ params, request }) {
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [existing] = await pool.query('SELECT * FROM villages WHERE id = ?', [params.id]);
    if (existing.length === 0) {
        return Response.json({ message: 'Village not found' }, { status: 404 });
    }

    await pool.query('DELETE FROM villages WHERE id = ?', [params.id]);

    // 204 No Content - successful deletion, no response body needed
    return new Response(null, { status: 204 });
}
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

async function fetchRandomArtisan() {
    const result = await sql`
        SELECT * FROM artisans
        ORDER BY RANDOM()
        LIMIT 1
    `
    return result.rows[0] || null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const artisan = await fetchRandomArtisan()
        
        if (artisan) {
            return res.status(200).json({
                message: 'Fetch random Artisan successfully',
                data: artisan
            })
        } else {
            return res.status(404).json({
                message: 'Random artisan not found',
                data: null
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch random artisan',
            error: error instanceof Error ? error.message : error
        })
    }
}
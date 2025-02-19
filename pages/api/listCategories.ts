import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

async function listCategories() {
  
    const result = await sql`
        SELECT * FROM categories
    `;
    return result.rows || [];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const categories = await listCategories()
        if (categories.length > 0) {
            return res.status(200).json({
                message: 'List categories successfully',
                data: categories
            })
        } else {
            return res.status(404).json({
                message: 'No categories found',
                data: []
            })
        }
    } catch (error: unknown) {
        return res.status(500).json({
            message: 'Failed to list categories',
            error: error instanceof Error ? error.message : error
        })
    }
    
}

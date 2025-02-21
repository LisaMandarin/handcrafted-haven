import { NextApiRequest, NextApiResponse } from "next"
import { sql } from "@vercel/postgres"

async function fetchLatest3Products() {
    const result = await sql`
        SELECT p.id, p.product_name, p.price, p.image_url
        FROM products p
        ORDER BY p.created_at DESC
        LIMIT 3
    `
    return result.rows || []
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const products = await fetchLatest3Products()

        if (products.length > 0) {
            return res.status(200).json({
                message: 'Fetch the latest 3 products successfully',
                data: products
            })
        } else {
            return res.status(404).json({
                message: 'No products found',
                data: []
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch the latest 3 products',
            error: error instanceof Error ? error.message : error
        })
    }
}
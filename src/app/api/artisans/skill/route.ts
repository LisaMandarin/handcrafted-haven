import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

async function listLeatherArtisans() {
    const leatherCategory = "21dff6d8-3a79-4882-b8ef-78412b7ba946"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${leatherCategory}
    `
    return result.rows || []
}

async function listMosaicArtisans() {
    const mosaicCategory = "34a76a1b-6d4c-4911-9f93-093129c3a4b6"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${mosaicCategory}
    `
    return result.rows || []
}

async function listTextileArtisans() {
    const textileCategory = "712e774e-0ad4-4c10-8a1a-981f9df5f7e8"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${textileCategory}
    `
    return result.rows || []
}

async function listBathArtisans() {
    const bathCategory = "8761b01c-b6c3-4f3d-901a-196451de41fa"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${bathCategory}
    `
    return result.rows || []
}

async function listMetalArtisans() {
    const metalCategory = "a5f1749f-89be-44e1-a6e1-f2c21b5eb930"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${metalCategory}
    `
    return result.rows || []
}

async function listWoodcraftArtisans() {
    const woodcraftCategory = "b9e1a526-77c1-4a9a-8e0f-6599b6e2f00c"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${woodcraftCategory}
    `
    return result.rows || []
}

async function listPaperArtisans() {
    const paperCategory = "c1a6319c-5825-4d83-8989-c05b4a3cb3cb"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${paperCategory}
    `
    return result.rows || []
}

async function listPotteryArtisans() {
    const potteryCategory = "d8e9f8b6-7cb4-4fbb-bc07-23dfeff30c2d"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${potteryCategory}
    `
    return result.rows || []
}

async function listOtherArtisans() {
    const otherCategory = "e10d8d8d-8c91-44d3-b8c0-1dfb6d2179a3"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${otherCategory}
    `
    return result.rows || []
}

async function listGlassArtisans() {
    const glassCategory = "f40f68b8-e8c3-473a-b6b3-324684703c19"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${glassCategory}
    `
    return result.rows || []
}

async function listCandlesArtisans() {
    const candlesCategory = "f65053b2-3d83-4ef4-a6fa-e3b34f43f3d7"
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${candlesCategory}
    `
    return result.rows || []
}

export async function GET() {
    try {
        const [
            leatherResult,
            mosaicResult,
            textileResult,
            bathResult,
            metalResult,
            woodcraftResult,
            paperResult,
            potteryResult,
            otherResult,
            glassResult,
            candlesResult,
        ] = await Promise.all([
            listLeatherArtisans(),
            listMosaicArtisans(),
            listTextileArtisans(),
            listBathArtisans(),
            listMetalArtisans(),
            listWoodcraftArtisans(),
            listPaperArtisans(),
            listPotteryArtisans(),
            listOtherArtisans(),
            listGlassArtisans(),
            listCandlesArtisans()
        ])

        if (leatherResult.length === 0 ||
            mosaicResult.length === 0 ||
            textileResult.length === 0 ||
            bathResult.length === 0 ||
            metalResult.length === 0 ||
            woodcraftResult.length === 0 ||
            paperResult.length === 0 ||
            potteryResult.length === 0 ||
            otherResult.length === 0 ||
            glassResult.length === 0 ||
            candlesResult.length === 0
        ) {
            return NextResponse.json({
                message: "No artisans found",
                data: []
            }, {status: 400})
        }

        return NextResponse.json({
            message: "Fetch artisans by categories successfully",
            data: {
                leather: leatherResult,
                mosaic: mosaicResult,
                textile: textileResult,
                bath: bathResult,
                metal: metalResult,
                woodcraft: woodcraftResult,
                paper: paperResult,
                pottery: potteryResult,
                other: otherResult,
                glass: glassResult,
                candles: candlesResult
            }
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            message: `Error while listing artisans by categories: ${error}`,
        }, {status: 500})
    }
}
import { db } from "@vercel/postgres";
// import bcrypt from "bcryptjs";
import {
  // categories,
  // users,
  // artisans,
  // products,
  reviews,
} from "../../../data/placeholder";

const client = await db.connect();

// async function seedCategories() {
//   try {
//     await client.sql`BEGIN`;

//     await Promise.all(
//       categories.map(
//         (category) => client.sql`
//                   INSERT INTO categories (id, category_name, category_url)  
//                   VALUES (${category.id}, ${category.category_name}, ${category.category_url})  
//                   ON CONFLICT (id) DO NOTHING;
//               `
//       )
//     );

//     await client.sql`COMMIT`;
//     return { success: true };
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     return { success: false, error: error };
//   } finally {
//     client.release();
//   }
// }

// async function seedUsers() {
//   try {
//     await client.sql`BEGIN`;
//     await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return client.sql`
//             INSERT INTO users (id, username, email, created_at, password)
//             VALUES (${user.id}, ${user.username}, ${user.email}, ${user.created_at}, ${hashedPassword})
//             ON CONFLICT (id) DO NOTHING`;
//       })
//     );
//     await client.sql`COMMIT`;
//     return { success: true };
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     return { success: false, error: error };
//   } finally {
//     client.release();
//   }
// }

// async function seedArtisans() {
//   try {
//     await client.sql`BEGIN`;
//     await Promise.all(
//       artisans.map(
//         (artisan) => client.sql`
//             INSERT INTO artisans (id, first_name, last_name, address, image_url, introduction, user_id)
//             VALUES (${artisan.id}, ${artisan.first_name}, ${artisan.last_name}, ${artisan.address}, ${artisan.image_url}, ${artisan.introduction}, ${artisan.user_id})
//             ON CONFLICT (id) DO NOTHING
//         `
//       )
//     );
//     await client.sql`COMMIT`;
//     return { success: true };
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     return { success: false, error };
//   } finally {
//     client.release();
//   }
// }

// async function seedProducts() {
//   try {
//     await client.sql`BEGIN`;
//     await Promise.all(
//       products.map(
//         (product) => client.sql`
//                 INSERT INTO products (id, product_name, price, quantity, description, image_url, created_at, artisan_id, category_id)
//                 VALUES (${product.id}, ${product.product_name}, ${product.price}, ${product.quantity}, ${product.description}, ${product.image_url}, ${product.created_at}, ${product.artisan_id}, ${product.category_id})
//                 ON CONFLICT (id) DO NOTHING
//             `
//       )
//     );
//     await client.sql`COMMIT`;
//     return { success: true };
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     return { success: false, error };
//   } finally {
//     client.release();
//   }
// }

async function seedReviews() {
  try {
    await client.sql`BEGIN`;
    await Promise.all(
      reviews.map(
        (review) => client.sql`
                INSERT INTO reviews (id, created_at, rate, comment, product_id, user_id)
                VALUES (${review.id}, ${review.created_at}, ${review.rate}, ${review.comment}, ${review.product_id}, ${review.user_id} )
                ON CONFLICT (id) DO NOTHING
            `
      )
    );

    await client.sql`COMMIT`;
    return { success: true };
  } catch (error) {
    await client.sql`ROLLBACK`;
    return { success: false, error };
  } finally {
    client.release();
  }
}

export async function GET() {
  const result = await seedReviews();
  if (result.error) {
    return Response.json({ error: result.error }, { status: 500 });
  }
  if (result.success) {
    return Response.json(
      { message: "Data seeded successfully!" },
      { status: 200 }
    );
  }
}

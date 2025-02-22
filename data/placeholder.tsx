const categories = [
  {
    id: "21dff6d8-3a79-4882-b8ef-78412b7ba946",
    category_name: "Leather Goods", //0
    category_url: "/category/leather.webp",
  },
  {
    id: "34a76a1b-6d4c-4911-9f93-093129c3a4b6",
    category_name: "Mosaic & Mixed Media", //1
    category_url: "/category/mixed-media.webp",
  },
  {
    id: "712e774e-0ad4-4c10-8a1a-981f9df5f7e8",
    category_name: "Textile & Fiber Arts", //2
    category_url: "/category/textile.webp",
  },
  {
    id: "8761b01c-b6c3-4f3d-901a-196451de41fa",
    category_name: "Bath & Body", //3
    category_url: "/category/bath.webp",
  },
  {
    id: "a5f1749f-89be-44e1-a6e1-f2c21b5eb930",
    category_name: "Metal Art & Jewelry", //4
    category_name_url: "/category_name/metal.webp",
  },
  {
    id: "b9e1a526-77c1-4a9a-8e0f-6599b6e2f00c",
    category_name: "Woodcraft & Carving", //5
    category_url: "/category/woodcraft.webp",
  },
  {
    id: "c1a6319c-5825-4d83-8989-c05b4a3cb3cb",
    category_name: "Paper & Stationery", //6
    category_url: "/category/paper.webp",
  },
  {
    id: "d8e9f8b6-7cb4-4fbb-bc07-23dfeff30c2d",
    category_name: "Pottery & Ceramics", //7
    category_url: "/category/pottery.webp",
  },
  {
    id: "e10d8d8d-8c91-44d3-b8c0-1dfb6d2179a3",
    category_name: "Other", //8
    category_url: "/category/other.webp",
  },
  {
    id: "f40f68b8-e8c3-473a-b6b3-324684703c19",
    category_name: "Glass Creations", //9
    category_url: "/category/glass.webp",
  },
  {
    id: "f65053b2-3d83-4ef4-a6fa-e3b34f43f3d7",
    category_name: "Candles & Scents", //10
    category_url: "/category/candles.webp",
  },
];

const users = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",  //0
    username: "Jay",
    email: "user1@gmail.com",
    created_at: "2025-01-01 00:00:00.000Z",
    password: "123$abc",
    
  },
  {
    id: "a2f50c11-1f14-43d8-8f70-42b54a4b7f28",  //1
    username: "SW",
    email: "user2@gmail.com",
    created_at: "2025-01-02 00:00:00.000Z",
    password: "123456",    
  },
  {
    id: "f74a9f60-6f0c-4c1d-8746-1d2831be8f46",  //2
    username: "DogInTheHouse",
    email: "user3@gmail.com",
    created_at: "2025-01-03 00:00:00.000Z",
    password: "123$abc",
  },
  {
    id: "42f527d7-94b9-45fa-bd62-ee1f4c4a62a3",  //3
    username: "sheeeeeeep",
    email: "user4@gmail.com",
    created_at: "2025-01-30 12:00:00.000Z",
    password: "123$abc",
  },
  {
    id: "a596e307-b358-4f22-9c64-98531d9b8371",  //4
    username: "wowo",
    email: "user5@gmail.com",
    created_at: "2024-11-25 15:00:00.000Z",
    password: "123$abc",
  },
  {
    id: "4c2df2fe-e6f7-4c5d-98f5-a7580619a536",  //5
    username: "MayDay",
    email: "user6@gmail.com",
    created_at: "2025-01-30 18:00:00.000Z",
    password: "123$abc",
  },
  {
    id: "9d25a7b1-e59a-42c1-8450-021843e98280",  //6
    username: "5566",
    email: "user7@gmail.com",
    created_at: "2025-01-13 21:00:00.000Z",
    password: "123$abc",
  },
  {
    id: "acf893ca-6c06-4305-b1d2-c999db7a311b",  //7
    username: "8u8u",
    email: "user8@gmail.com",
    created_at: "2024-10-31 00:00:00.000Z",
    password: "123$abc",
  },
  {
    id: "8b77725a-9345-4370-9804-ce02696cbb21",  //8
    username: "Ramen",
    email: "user9@gmail.com",
    created_at: "2024-11-30 03:00:00.000Z",
    password: "123$abc",
  },
  {
    id: "bfc5af1d-0b87-4a82-90a4-d231088e49a7",  //9
    username: "BPbody",
    email: "user10@gmail.com",
    created_at: "2025-02-14 06:00:00.000Z",
    password: "123$abc",
  }
];

const artisans = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a", //0
    first_name: "Alex",
    last_name: "Johnson",
    address: "1600 Pennsylvania Avenue NW, Washington, DC 20500, USA",
    image_url: "/artisans/artisan1.webp",
    introduction:
      "Hello! I'm Alex Johnson, a dedicated artisan specializing in handcrafted accessories and home decor. My passion lies in creating intricate textile pieces, elegant jewelry, and stylish leather goods that blend functionality with artistic flair. From cozy crocheted scarves and embroidered brooches to vintage-inspired rings and handcrafted pendants, every item in my collection is designed with love and attention to detail. I also enjoy crafting unique pop-up greeting cards and dollhouse miniatures, offering my customers beautifully crafted keepsakes and collectibles. Each piece I create is a reflection of my dedication to craftsmanship, ensuring that my customers receive high-quality, one-of-a-kind treasures that bring joy and elegance to their everyday lives.",
    user_id: users[0].id,
  },
  {
    id: "5123bcde-1234-5678-9abc-def012345678", //1
    first_name: "Sophia",
    last_name: "Williams",
    address: "100 Queen St W, Toronto, ON M5H 2N2, Canada",
    image_url: "/artisans/artisan2.webp",
    introduction:
      "Hi there! I'm Sophia Williams, a passionate artisan with a deep love for creating beautiful glass art, home decor, and unique handmade accessories. My work features stunning mosaic lanterns, intricate glass candle holders, and charming terrariums that bring a touch of nature indoors. I also craft elegant wooden kitchenware and delightful scented candles, perfect for adding warmth and personality to any space. My goal is to blend creativity with sustainability, ensuring that every piece I design not only enhances your home but also supports eco-friendly living. I take pride in offering handcrafted treasures that reflect both artistry and functionality, making every item special and meaningful.",
    user_id: users[1].id,
  },
  {
    id: "8a126989-a1af-4dc9-9ae6-cb66a10b4625", //2
    first_name: "Michael",
    last_name: "Lee",
    address: "1 Macquarie St, Sydney NSW 2000, Australia",
    image_url: "/artisans/artisan3.webp",
    introduction:
      "Greetings! I'm Michael Lee, a dedicated artisan with a passion for ceramics, wooden crafts, and home essentials. My specialty lies in creating exquisite pottery, hand-carved wooden sculptures, and luxurious bath products that offer a spa-like experience at home. From intricately designed Kintsugi ceramic bowls to hand-carved wooden elephants and aromatic bath bomb sets, every piece I create is crafted with care and precision. I believe that art should be both beautiful and practical, which is why I strive to make products that enhance daily life while adding a touch of artistic elegance. My collection is designed for those who appreciate craftsmanship, tradition, and a connection to nature.",
    user_id: users[2].id,
  },
  {
    id: "8bad634a-a4a0-4411-8517-e5519d816193", //3
    first_name: "Emma",
    last_name: "Carter",
    address: "10 Downing St, London SW1A 2AA, UK",
    image_url: "/artisans/artisan4.webp",
    introduction:
      "Hello! I'm Emma Carter, a textile artist and craftswoman with a passion for handmade fashion, accessories, and personalized keepsakes. I create cozy crocheted scarves, stylish leather keychains, and adorable handmade dolls, each carefully designed to bring warmth and charm to your life. My collection also includes vintage-inspired bookmarks, elegant leather wallets, and thoughtful DIY crafting kits, making my work perfect for those who love handmade artistry. I am inspired by traditional craftsmanship and modern aesthetics, and I take pride in offering unique, high-quality pieces that tell a story. Whether you're looking for a meaningful gift or a stylish addition to your wardrobe, my handmade creations are designed with love and dedication.",
    user_id: users[3].id,
  },
  {
    id: "c297ea25-f7bf-4c75-827a-745a3675e849", //4
    first_name: "Pierre",
    last_name: "Dupont",
    address: "1 Rue de Rivoli, 75001 Paris, France",
    image_url: "/artisans/artisan5.webp",
    introduction:
      "Bonjour! I'm Pierre Dupont, a skilled woodcraft artisan dedicated to creating elegant and functional handcrafted pieces. My specialty lies in beautifully engraved wooden kitchenware, finely crafted wooden jewelry boxes, and unique wood and resin decor pieces that blend natural beauty with artistic detail. I also design handcrafted mosaic vases and artistic home accents that add a touch of sophistication to any space. My philosophy is to bring craftsmanship and sustainability together, using high-quality materials to create timeless pieces that are both decorative and practical. Whether you're looking for a heartfelt gift or a statement decor piece, my handcrafted works are designed to bring joy and artistry into your home.",
    user_id: users[4].id,
  },
];

const products = [
  {
    id: "06e99fdc-6d59-4532-8893-22f9a9ebda98", //0
    product_name: "Embroidered Leaf Brooch",
    price: 10,
    quantity: 100,
    description:
      "Add a touch of nature to your style with our Embroidered Leaf Brooch. Made with intricate stitching and vibrant green hues, this brooch is perfect for accessorizing jackets, bags, or scarves. A wonderful gift for nature lovers and embroidery enthusiasts.",
    image_url: "/products/textile-leaf.webp",
    created_at: "2024-10-21 20:47:42+00",
    artisan_id: artisans[0].id,
    category_id: categories[2].id,
  },
  {
    id: "19e24558-5087-4b44-9c9d-4b31eaf30a47", //1
    product_name: "Mosaic Solar-Powered Lanterns",
    price: 50,
    quantity: 25,
    description:
      "Light up your nights with our stunning Mosaic Solar-Powered Lanterns. Featuring intricate glass designs that cast mesmerizing patterns, these eco-friendly lanterns charge during the day and glow beautifully at night. Perfect for outdoor gatherings, garden decor, or adding a pop of color to your home, these lanterns blend functionality with artistic flair.",
    image_url: "/products/glass-light.webp",
    created_at: "2025-01-15 11:29:52+00",
    artisan_id: artisans[1].id,
    category_id: categories[9].id,
  },
  {
    id: "1bb5b9e8-0e3f-4e3b-a146-cc22f2ab429b", //2
    product_name: "Luxury Bath Soap Set",
    price: 25,
    quantity: 50,
    description:
      "Pamper yourself or your loved ones with this luxurious bath soap set! Featuring three handcrafted soaps infused with natural ingredients and an orange scrub for gentle exfoliation, this set offers a spa-like experience right at home. The beautiful floral packaging makes it a perfect gift for any occasion. Indulge in a refreshing cleanse that nourishes your skin while delighting your senses!",
    image_url: "/products/bath-bath-set.webp",
    created_at: "2024-10-10 16:53:34+00",
    artisan_id: artisans[2].id,
    category_id: categories[3].id,
  },
  {
    id: "1fa9e5ff-52a5-4aed-95f6-51afadb15d5a", //3
    product_name: "Herbal Lightening Cream",
    price: 18,
    quantity: 30,
    description:
      "Achieve radiant, glowing skin with our Herbal Lightening Cream! Made with a blend of natural herbal ingredients, this cream moisturizes, nourishes, and brightens your skin without any harsh chemicals. Perfect for daily use, it's ideal for anyone seeking a more even complexion and a healthy glow. Add this must-have to your skincare routine and see the difference!",
    image_url: "/products/bath-lightening-cream.webp",
    created_at: "2024-12-23 06:11:00+00",
    artisan_id: artisans[3].id,
    category_id: categories[3].id,
  },
  {
    id: "29195daa-b926-4ef8-9bf4-157aaf16daa1", //4
    product_name: "Aromatic Bath Bomb Set",
    price: 15,
    quantity: 100,
    description:
      "Transform your bath into a fragrant oasis with our Aromatic Bath Bomb Set! With delightful scents like lavender, strawberry, lemon, and more, these colorful bath bombs fizz and release essential oils that relax your body and rejuvenate your mind. Perfect for self-care routines or as a thoughtful gift, this set guarantees a luxurious soak every time. Treat yourself to the ultimate relaxation experience!",
    image_url: "/products/bath-bathball.webp",
    created_at: "2024-11-07 14:45:50+00",
    artisan_id: artisans[4].id,
    category_id: categories[3].id,
  },
  {
    id: "2c407920-1332-4eb2-87f2-74c88738c14c", //5
    product_name: "Elegant Lace Leather Belt",
    price: 20,
    quantity: 80,
    description:
      "Add a touch of sophistication to your outfit with our Elegant Lace Leather Belt. Designed with intricate lace patterns and made from high-quality leather, this belt is perfect for enhancing dresses, coats, and more. Its adjustable tie ensures a perfect fit for any waist size. A must-have accessory for fashion enthusiasts!",
    image_url: "/products/leather-belt.webp",
    created_at: "2025-01-03 04:23:45+00",
    artisan_id: artisans[0].id,
    category_id: categories[0].id,
  },
  {
    id: "3b5bc02c-3fd2-4b4f-bab6-4901ff8d64c0", //6
    product_name: "Miniature Glass Garden Terrarium",
    price: 40,
    quantity: 30,
    description:
      "Bring a piece of nature into your home with our Miniature Glass Garden Terrarium. Featuring adorable hand-painted figurines and lush greenery, this self-contained ecosystem is a delightful way to add charm and tranquility to any room. Perfect as a unique gift or centerpiece, this terrarium is a miniature world waiting to brighten your day.",
    image_url: "/products/glass-garden.webp",
    created_at: "2025-01-14 00:55:24+00",
    artisan_id: artisans[1].id,
    category_id: categories[9].id,
  },
  {
    id: "41d2c5a4-06d8-4c3e-8ad6-92de80b77e1b", //7
    product_name: "Handmade Boy Doll with Outfits",
    price: 35,
    quantity: 40,
    description:
      "Bring joy to kids and collectors alike with our Handmade Boy Doll. This adorable doll comes with two interchangeable outfits, crafted with love and attention to detail. Perfect as a cuddly companion or a decorative piece, it’s a charming addition to any doll collection.",
    image_url: "/products/textile-boy-doll.webp",
    created_at: "2025-01-30 21:38:54+00",
    artisan_id: artisans[2].id,
    category_id: categories[2].id,
  },
  {
    id: "53a26c5e-1e52-441d-851d-99b0ee978f76", //8
    product_name: "Fantasy Feather Metal Bookmarks",
    price: 12,
    quantity: 100,
    description:
      "Add a touch of elegance to your reading experience with our Fantasy Feather Metal Bookmarks. Crafted with intricate feather designs and golden accents, these bookmarks are perfect for book lovers who appreciate beauty and functionality. A wonderful gift for avid readers and collectors!",
    image_url: "/products/paper-bookmark.webp",
    created_at: "2024-12-30 18:35:43+00",
    artisan_id: artisans[3].id,
    category_id: categories[6].id,
  },
  {
    id: "54cfb496-9494-4e2a-b8f3-21f0d7b9cbd7", //9
    product_name: "Crocheted Star Scarf",
    price: 40,
    quantity: 30,
    description:
      "Stay cozy and stylish with our Crocheted Star Scarf. Handcrafted with colorful yarn and adorned with playful star tassels, this scarf is a unique blend of warmth and whimsy. Perfect for chilly days or as a delightful gift for crochet lovers.",
    image_url: "/products/textile-scarf.webp",
    created_at: "2024-10-31 06:35:39+00",
    artisan_id: artisans[4].id,
    category_id: categories[2].id,
  },
  {
    id: "64d3c927-4f1a-437b-83a5-499d9703a791", //10
    product_name: "DIY Gingerbread House Kit",
    price: 25,
    quantity: 50,
    description:
      "Unleash your creativity this holiday season with our DIY Gingerbread House Kit! Complete with all the materials you need to build and decorate your own festive house, this kit is perfect for family bonding or as a thoughtful gift. Bring the joy of the season to life with this delightful activity!",
    image_url: "/products/paper-house.webp",
    created_at: "2024-12-19 00:53:12+00",
    artisan_id: artisans[3].id,
    category_id: categories[6].id,
  },
  {
    id: "64e5a9cd-999e-46f7-82be-c74f98d11b40", //11
    product_name: "Vintage Wooden Jewelry Box",
    price: 45,
    quantity: 20,
    description:
      "Store your treasures in style with our Vintage Wooden Jewelry Box. Featuring ornate metal accents and a timeless design, this handcrafted box is both functional and decorative. A perfect gift for anyone who loves rustic charm and quality craftsmanship.",
    image_url: "/products/woodcraft-box.webp",
    created_at: "2024-12-09 13:26:32+00",
    artisan_id: artisans[2].id,
    category_id: categories[5].id,
  },
  {
    id: "6fa182e4-d64e-4049-b8b6-35b38f07a5cf", //12
    product_name: "Vintage Metal Motorcycle Models",
    price: 60,
    quantity: 20,
    description:
      "Add a touch of retro charm to your home or office with our Vintage Metal Motorcycle Models. These handcrafted models are intricately designed with fine details, making them the perfect gift for motorcycle enthusiasts or collectors. Ideal as a centerpiece or unique decor, these models bring an adventurous spirit to any space.",
    image_url: "/products/metal-motorcycles.webp",
    created_at: "2025-01-28 01:18:23+00",
    artisan_id: artisans[1].id,
    category_id: categories[4].id,
  },
  {
    id: "71263ee4-b75a-4f40-95b5-1b4174db2fcb", //13
    product_name: "Handcrafted Rose Quartz Pendant",
    price: 25,
    quantity: 50,
    description:
      "Elegantly crafted, our Rose Quartz Pendant is a timeless piece that exudes natural beauty. Encased in an intricate metal wire wrap, this necklace symbolizes love and tranquility, making it a meaningful gift or a perfect accessory for any outfit. Add a touch of elegance and spirituality to your jewelry collection today.",
    image_url: "/products/metal-necklace.webp",
    created_at: "2024-12-31 20:34:01+00",
    artisan_id: artisans[0].id,
    category_id: categories[4].id,
  },
  {
    id: "77a641fc-5220-40c1-a391-ff1c94f20fbb", //14
    product_name: "Engraved Wooden Spoons Set",
    price: 20,
    quantity: 50,
    description:
      "Upgrade your kitchen with our Engraved Wooden Spoons Set. Featuring unique patterns and crafted from durable wood, these spoons are perfect for cooking, serving, or displaying as rustic decor. A thoughtful gift for home cooks and kitchen enthusiasts!",
    image_url: "/products/woodcraft-spoon.webp",
    created_at: "2025-01-10 20:21:39+00",
    artisan_id: artisans[1].id,
    category_id: categories[5].id,
  },
  {
    id: "7d1ea43e-62c5-46a7-8f48-63a2a1c60f6c", //15
    product_name: "Miniature Bistro Dollhouse",
    price: 70,
    quantity: 15,
    description:
      "Bring your creative dreams to life with our Miniature Bistro Dollhouse! This detailed DIY kit comes with all the materials you need to craft a charming restaurant scene, complete with furniture, decor, and a cozy ambiance. Perfect as a relaxing project or a delightful gift, this dollhouse is a true treasure for hobbyists and collectors.",
    image_url: "/products/mixed-house.webp",
    created_at: "2025-01-18 11:35:15+00",
    artisan_id: artisans[0].id,
    category_id: categories[1].id,
  },
  {
    id: "86a49916-d0f1-40f5-8ef1-7f9ff438fc42", //16
    product_name: "Hand-Carved Wooden Elephants",
    price: 30,
    quantity: 40,
    description:
      "Bring the spirit of the jungle into your home with our Hand-Carved Wooden Elephants. Crafted with care from quality wood, these intricate figurines are perfect as decor pieces or gifts for wildlife enthusiasts. A symbol of strength and wisdom, they’re a charming addition to any space.",
    image_url: "/products/woodcraft-elephants.webp",
    created_at: "2024-11-13 09:35:04+00",
    artisan_id: artisans[2].id,
    category_id: categories[5].id,
  },
  {
    id: "86c35669-b6bc-4640-9a38-79c9820e77c4", //17
    product_name: "Leather Horse Keychain",
    price: 12,
    quantity: 150,
    description:
      "Carry charm and functionality with our Leather Horse Keychain. Featuring an adorable hand-stitched horse design and an initial letter for personalization, this keychain is both stylish and practical. Perfect as a thoughtful gift or a fun accessory for your keys and bags!",
    image_url: "/products/leather-keyring.webp",
    created_at: "2024-11-09 20:45:23+00",
    artisan_id: artisans[3].id,
    category_id: categories[0].id,
  },
  {
    id: "8b5e3c58-b81b-49b7-8701-fb45b0a22cda", //18
    product_name: "Antique-Style Engraved Ring",
    price: 30,
    quantity: 40,
    description:
      "Celebrate timeless elegance with our Antique-Style Engraved Ring. Featuring detailed engravings and a classic design, this ring is a beautiful symbol of love and commitment. Perfect for weddings, anniversaries, or as a statement piece, this ring blends tradition with sophistication for any occasion.",
    image_url: "/products/metal-ring.webp",
    created_at: "2024-11-04 19:50:52+00",
    artisan_id: artisans[4].id,
    category_id: categories[4].id,
  },
  {
    id: "8b8a5db7-66c5-4a8f-91d5-41b68f3d19a7", //19
    product_name: "Quilted Dog Vest",
    price: 25,
    quantity: 60,
    description:
      "Keep your furry friend stylish and warm with our Quilted Dog Vest. Featuring adorable bear patterns and soft, breathable fabric, this vest ensures comfort and cuteness for your pet. Ideal for walks, chilly weather, or as a unique gift for pet lovers!",
    image_url: "/products/textile-dog-vest.webp",
    created_at: "2024-12-30 13:42:11+00",
    artisan_id: artisans[0].id,
    category_id: categories[2].id,
  },
  {
    id: "a4e449e2-7eec-4616-95e8-3f85c8eef300", //20
    product_name: "Fragrant Stone Diffuser",
    price: 30,
    quantity: 40,
    description:
      "Enhance your room's ambiance with our Fragrant Stone Diffuser. Designed with a natural aesthetic, it features handcrafted owls, flower petals, and Himalayan salt stones to create a cozy, refreshing atmosphere. Just add your favorite essential oil for a long-lasting aroma that soothes your senses. Perfect for home decor or as a thoughtful gift!",
    image_url: "/products/candles-fragrant-stone.webp",
    created_at: "2024-10-09 10:09:37+00",
    artisan_id: artisans[2].id,
    category_id: categories[10].id,
  },
  {
    id: "a5d676c2-0dfc-4c58-86ec-b6cc59466b38", //21
    product_name: "Gold Number Birthday Candles",
    price: 5,
    quantity: 120,
    description:
      "Make your celebrations memorable with our Gold Number Birthday Candles. With their sleek metallic finish and modern design, these candles add a touch of sophistication to any cake. Ideal for birthdays, anniversaries, or milestone events, they’re sure to make your special moments shine!",
    image_url: "/products/candles-number-candle.webp",
    created_at: "2025-01-18 03:42:09+00",
    artisan_id: artisans[1].id,
    category_id: categories[10].id,
  },
  {
    id: "b1c8e90c-617e-4070-87b6-603ea8368cc8", //22
    product_name: "Colorful Kids' Animal Artwork",
    price: 45,
    quantity: 20,
    description:
      "Celebrate creativity with our Colorful Kids' Animal Artwork! This vibrant, hand-painted piece features a charming ensemble of wild animals, making it perfect for brightening up kids' rooms or as a unique gift for art lovers. Let the vivid colors and playful design bring joy to your space!",
    image_url: "/products/other-kids-drawing.webp",
    created_at: "2024-12-28 05:26:53+00",
    artisan_id: artisans[3].id,
    category_id: categories[8].id,
  },
  {
    id: "b4585f60-9993-428d-bc00-18fe7fe2b2c1", //23
    product_name: "Handcrafted Jelly Candles",
    price: 20,
    quantity: 60,
    description:
      "Light up your space with these stunning handcrafted jelly candles. Embedded with dried flowers, cinnamon sticks, and other natural elements, these candles bring warmth and charm to any occasion. With their translucent glow, they’re perfect for home decor, romantic evenings, or gifting. Experience elegance in every flicker!",
    image_url: "/products/candles-jelly-candle.webp",
    created_at: "2024-12-29 19:56:43+00",
    artisan_id: artisans[2].id,
    category_id: categories[10].id,
  },
  {
    id: "b6c2d5a4-4ebc-4d40-96b0-2a1e7ff4b52c", //24
    product_name: "Pop-Up Heart Love Card",
    price: 8,
    quantity: 150,
    description:
      "Express your love in a creative way with our Pop-Up Heart Love Card. This intricately designed card features a 3D heart that pops up with the message 'I Love You,' making it perfect for Valentine's Day, anniversaries, or any special occasion. Show your loved ones how much you care with this thoughtful gesture!",
    image_url: "/products/paper-card.webp",
    created_at: "2024-12-13 17:15:42+00",
    artisan_id: artisans[0].id,
    category_id: categories[6].id,
  },
  {
    id: "d0ad9d5e-0982-4e4b-995c-41edfc0710da", //25
    product_name: "Wood & Resin Ocean Lamp",
    price: 120,
    quantity: 10,
    description:
      "Immerse yourself in the beauty of the ocean with our Wood & Resin Ocean Lamp. Featuring breathtaking underwater details captured in resin, this lamp is a perfect blend of artistry and functionality. Its soft glow creates a relaxing atmosphere, making it a unique decor piece for your living space or a thoughtful gift for art lovers.",
    image_url: "/products/mixed-lamp.webp",
    created_at: "2024-11-04 11:17:08+00",
    artisan_id: artisans[1].id,
    category_id: categories[1].id,
  },
  {
    id: "e6a8b015-47b3-4263-8925-4cc5648f6526", //26
    product_name: "Kintsugi Ceramic Bowl",
    price: 50,
    quantity: 25,
    description:
      "Celebrate imperfection with our Kintsugi Ceramic Bowl, a symbol of resilience and beauty. Featuring hand-applied gold accents on cracks, this bowl embraces the Japanese art of repairing with elegance. Perfect as a decorative piece or a thoughtful gift for those who value artistry and history.",
    image_url: "/products/pottery-cup.webp",
    created_at: "2025-01-25 18:32:58+00",
    artisan_id: artisans[4].id,
    category_id: categories[7].id,
  },
  {
    id: "e6e57e49-4a8b-4ac3-b9e6-6617ebbb0dc5", //27
    product_name: "Classic Leather Wallet",
    price: 40,
    quantity: 60,
    description:
      "Keep your essentials organized in style with our Classic Leather Wallet. Crafted from premium genuine leather, this wallet features multiple compartments for cash, cards, and coins. Its timeless design and durable build make it a perfect choice for everyday use or as a thoughtful gift for someone special.",
    image_url: "/products/leather-wallet.webp",
    created_at: "2025-01-12 23:41:44+00",
    artisan_id: artisans[3].id,
    category_id: categories[0].id,
  },
  {
    id: "f1c9d849-1b70-4fc3-84a5-fdb30a254198", //28
    product_name: "Handcrafted Glass Candle Holders",
    price: 35,
    quantity: 50,
    description:
      "Elevate your decor with our Handcrafted Glass Candle Holders. Designed with embedded dried flowers, these stunning pieces add a touch of elegance and warmth to any space. Perfect for weddings, dinner tables, or as thoughtful gifts, these candle holders combine artistry and functionality in one beautiful package.",
    image_url: "/products/glass-candle-holder.webp",
    created_at: "2024-11-26 09:14:46+00",
    artisan_id: artisans[2].id,
    category_id: categories[9].id,
  },
  {
    id: "fc5d7ee5-b0c2-468c-b3bb-798b38fa0078", //29
    product_name: "Mandala Mosaic Coaster Set",
    price: 25,
    quantity: 50,
    description:
      "Add a splash of color to your table with our Mandala Mosaic Coaster Set. These beautifully designed coasters are handcrafted with vibrant glass beads, making them both functional and decorative. Perfect for protecting surfaces while elevating your home decor, they also make a fantastic gift for any occasion!",
    image_url: "/products/mosaic-pad.webp",
    created_at: "2025-01-14 13:04:37+00",
    artisan_id: artisans[0].id,
    category_id: categories[1].id,
  },
  {
    id: "fe11fffb-ec6b-4d97-bab0-8dc7b426f632", //30
    product_name: "Colorful Mosaic Vase Collection",
    price: 35,
    quantity: 30,
    description:
      "Brighten up your space with our Colorful Mosaic Vase Collection! Each vase features intricate mosaic patterns in vibrant colors, perfect for showcasing flowers or as stand-alone decor. These artistic vases are a beautiful blend of craftsmanship and functionality, making them an excellent choice for home decor or as a unique gift.",
    image_url: "/products/mosaic-vase.webp",
    created_at: "2025-01-18 06:51:43+00",
    artisan_id: artisans[4].id,
    category_id: categories[1].id,
  },
];

const reviews = [
  {
    id: "369e214c-7bc9-4ff8-a97f-6ea108238d9f",
    created_at: "2025-01-30 00:00:00+00",
    rate: "5.0",
    comment:
      "I love these wooden spoons! The engravings are beautifully done, and the wood feels very sturdy. Perfect for cooking and serving.",
    product_id: products[14].id,
    user_id: users[0].id,
  },
  {
    id: "82edf010-1d56-4a0f-8820-1e8a9cfc1d75",
    created_at: "2024-12-05 00:00:00+00",
    rate: "4.5",
    comment:
      "This ring has a timeless elegance, and the craftsmanship is impressive. The only reason I'm giving it 4.5 instead of 5 is that the metal is a bit thinner than I expected. Still, it's a stunning ring!",
    product_id: products[18].id,
    user_id: users[1].id,
  },
  {
    id: "89c837c3-0114-41f7-8efa-83e7c1266ff5",
    created_at: "2024-11-15 00:00:00+00",
    rate: "4.5",
    comment:
      "This scarf is beautifully made and super soft. The star tassels add a unique touch. I love it, but I wish it was slightly longer for better wrapping.",
    product_id: products[9].id,
    user_id: users[2].id,
  },
  {
    id: "8bdaee39-7c5b-4b5c-a6b0-0c2c7741e123",
    created_at: "2024-11-20 00:00:00+00",
    rate: "5.0",
    comment:
      "This ring exceeded my expectations! The engravings are so detailed, and the antique-style design gives it such a timeless charm. It fits perfectly and looks elegant with any outfit. Highly recommend!",
    product_id: products[18].id,
    user_id: users[3].id,
  },
  {
    id: "b9ab5edc-82a2-47d7-b3f1-a22c4423832d",
    created_at: "2024-10-20 00:00:00+00",
    rate: "3.0",
    comment:
      "The design is lovely, and I love the handcrafted details. However, the scent doesn’t last as long as I expected, and I have to reapply the essential oil frequently.",
    product_id: products[20].id,
    user_id: users[4].id,
  },
  {
    id: "d8ba327b-bf7a-4231-ab38-13e318b33c65",
    created_at: "2024-11-15 00:00:00+00",
    rate: "4.5",
    comment:
      "I really enjoy this diffuser. The stones and details make it a beautiful decorative piece, and it works well with my essential oils. I just wish the scent diffusion lasted a bit longer without needing to refresh it.",
    product_id: products[20].id,
    user_id: users[5].id,
  },
  {
    id: "df12b456-7890-4c3d-b9e3-123456789abc",
    created_at: "2025-02-01 00:00:00+00",
    rate: "4.0",
    comment:
      "This Kintsugi bowl is a stunning piece of art. The golden repairs give it a unique charm and symbolize resilience beautifully. I love using it as a decorative piece. However, I expected it to be a bit heavier and sturdier.",
    product_id: products[26].id,
    user_id: users[6].id,
  },
  {
    id: "ecb7d41e-9561-479f-92e7-82584353e714",
    created_at: "2024-11-25 00:00:00+00",
    rate: "4.0",
    comment:
      "The ring is beautifully designed, and the engravings are exquisite. However, it runs slightly smaller than expected, so make sure to check the sizing carefully. Still a great piece!",
    product_id: products[18].id,
    user_id: users[7].id,
  },
  {
    id: "ecd8a8e9-3b4a-4e4e-84a0-5d9651983004",
    created_at: "2024-11-05 00:00:00+00",
    rate: "5.0",
    comment:
      "This diffuser is perfect! The scent spreads beautifully, and the design adds such a cozy touch to my space. I highly recommend it to anyone who loves home decor and relaxing aromas.",
    product_id: products[20].id,
    user_id: users[8].id,
  },
  {
    id: "27681ff0-2361-437a-8ab3-71ec2f7fb969",
    created_at: "2025-01-30T00:00:00+00",
    rate: "0.5",
    comment:
      "Not what I expected. The embroidery is nice, but it\u2019s smaller than I thought.",
    product_id: products[0].id,
    user_id: users[9].id,
  },
  {
    id: "721c9b01-f828-49f0-a93a-f6d0eecb0e7c",
    created_at: "2025-01-30T00:00:00+00",
    rate: "2.0",
    comment:
      "Beautifully crafted, but the pin is a bit weak. Still looks great on my bag.",
    product_id: products[0].id,
    user_id: users[6].id,
  },
  {
    id: "b6806431-7b6c-4abf-b56b-8c411b867955",
    created_at: "2025-01-30T00:00:00+00",
    rate: "3.5",
    comment:
      "Really cute and well-made! The details are amazing, and the colors are lovely.",
    product_id: products[0].id,
    user_id: users[7].id,
  },
  {
    id: "2ff6887a-23f2-4df8-8db2-d43cad86b176",
    created_at: "2025-01-30T00:00:00+00",
    rate: "5.0",
    comment:
      "Absolutely perfect! The stitching is high quality, and it adds a unique touch to my outfits.",
    product_id: products[0].id,
    user_id: users[8].id,
  },
  {
    id: "e3358b52-17d0-45ad-8b57-aaa43220bd9c",
    created_at: "2025-01-30T00:00:00+00",
    rate: "4.0",
    comment:
      "Such a cute and calming addition to my desk! The figurines are adorable, and the greenery is well arranged.",
    product_id: products[6].id,
    user_id: users[9].id,
  },
  {
    id: "b2a586de-c9dd-4b95-8a5b-c8f9181a4e40",
    created_at: "2025-01-30T00:00:00+00",
    rate: "5.0",
    comment:
      "Absolutely love this terrarium! It looks magical, and the details are stunning. Worth every penny!",
    product_id: products[6].id,
    user_id: users[6].id,
  },
];

export { categories, users, artisans, products, reviews}
const User = require('./model/users')
const Book = require('./model/books')
const { connect } = require('./database')
require('dotenv').config()

/* eslint-disable no-console */
const seedData = async () => {
  try {
    await connect()

    // Clear existing data
    await User.deleteMany({})
    await Book.deleteMany({})
    console.log('Cleared existing data')

    // Seed Users
    const users = [
      {
        name: 'Rowland Momoh',
        username: 'rowleks',
        email: 'admin@readlyst.com',
        passwordHash: 'admin_hash_123',
        role: 'admin',
      },
      {
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        passwordHash: 'user_hash_456',
        role: 'user',
      },
    ]

    await User.insertMany(users)
    console.log('Users seeded')

    // Seed Books
    const books = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        publishedYear: 1925,
        genres: ['Classic', 'Fiction'],
        description: 'A novel set in the Jazz Age on Long Island.',
        coverImageUrl:
          'https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1',
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        publishedYear: 1937,
        genres: ['Fantasy', 'Adventure'],
        description: 'The prelude to The Lord of the Rings.',
        coverImageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTto06ST5vShkYugiBPqD-BhbCV0kk-HGzRw&s',
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        publishedYear: 1988,
        genres: ['Fiction', 'Adventure', 'Philosophy'],
        description:
          'A story about following your dreams and listening to your heart.',
        coverImageUrl:
          'https://thebookmarketng.com/wp-content/uploads/2025/01/The-Alchemist.jpg',
      },
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publishedYear: 2008,
        genres: ['Programming', 'Technology', 'Education'],
        description: 'A Handbook of Agile Software Craftsmanship.',
        coverImageUrl:
          'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg',
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt and David Thomas',
        publishedYear: 1999,
        genres: ['Programming', 'Technology'],
        description: 'Your journey to mastery.',
        coverImageUrl:
          'https://cdn.kobo.com/book-images/bdb65902-20f1-4ab2-8fc6-a373a18d6069/1200/1200/False/the-pragmatic-programmer-from-journeyman-to-master-1.jpg',
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        publishedYear: 2018,
        genres: ['Self-help', 'Psychology'],
        description:
          'An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
        coverImageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT84Isi7w1AFCslqdLEirSajrz_N1iWbsCrQw&s',
      },
      {
        title: "You Don't Know JS",
        author: 'Kyle Simpson',
        publishedYear: 2014,
        genres: ['Programming', 'JavaScript', 'Education'],
        description:
          'Deep dive into the core mechanisms of the JavaScript language.',
        coverImageUrl:
          'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457542606i/25136217.jpg',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        publishedYear: 2011,
        genres: ['Psychology', 'Non-fiction'],
        description: 'The two systems that drive the way we think.',
        coverImageUrl: 'https://m.media-amazon.com/images/I/71f6DceqZAL.jpg',
      },
      {
        title: '1984',
        author: 'George Orwell',
        publishedYear: 1949,
        genres: ['Fiction', 'Dystopian'],
        description:
          'A dystopian social science fiction novel and cautionary tale.',
        coverImageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdHUyFdc81rHthZKgGjDUPNa-k4aRIqOMZ8w&s',
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        publishedYear: 1960,
        genres: ['Fiction', 'Classic'],
        description:
          'A novel about the serious issues of rape and racial inequality.',
        coverImageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn5xkKB1ByJI59VpGEBBkkFRN0_FJ9COkr2g&s',
      },
    ]

    await Book.insertMany(books)
    console.log('Books seeded')

    console.log('Seeding completed successfully')
    process.exit(0)
  } catch (err) {
    console.error('Error seeding data:', err)
    process.exit(1)
  }
}

seedData()

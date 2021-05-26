## Todo App with Next.js, Magic.link, and Sanity
This is a simple todo app set up for use in Sanity Studio. I made it for a tutorial.
Uses:

- [Next.js](https://nextjs.org/)
- [Magic.link](https://magic.link)
- [Sanity](https://sanity.io)
- [Tailwind](https://tailwindcss.com)

Auth code already implemented c/o [Eric Adamski](https://vercel.com/blog/simple-auth-with-magic-link-and-nextjs).
Just add your the following values to a `.env.local` file:

```
NEXT_PUBLIC_MAGIC_PUB_KEY=pk_test_12345
MAGIC_SECRET_KEY=sk_test_12345
ENCRYPTION_SECRET=random_encryption_string
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_ID=your_sanity_id
SANITY_WRITE_KEY=your_sanity_write_key
```

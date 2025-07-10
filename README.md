
## Project info

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Install the necessary dependencies.
npm i

# Step 2: Start the development server with auto-reloading and an instant preview.
npm run dev
```


The API data from [https://github.com/marckuz/TEG-Events-Manager-Test](https://teg-coding-challenge.s3.ap-southeast-2.amazonaws.com/events/event-data.json) even though the file is public, Amazon S3 blocks cross-origin browser-based requests unless CORS rules are configured on the bucket to allow them. I've decided to download the file instead and fetch that locally. 

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

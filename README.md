The repository for MiniHouse-server can be found [here](https://github.com/abhishekjain35/Mini-house-server)
## MiniHouse
This is a `House sharing app`. Users can `host` or `book` listings through this application. MiniHouse has features like `authentication`, `data persistence`, `payments through stripe`, `Dashboards for host and normal users` etc.

[Checkout live demo here](https://minihouse.herokuapp.com/)

### or
## Instruction to run on local machine

1. Clone the repository
2. Create `.env` file with two key value pairs, `REACT_APP_S_PUBLISHABLE_KEY` for stripe publishable key and `REACT_APP_S_CLIENT_ID` for stripe client id.
3. Run `npm install` to install dependencies
4. Run `npm start` to start the app on localhost
5. Open browser and go to [localhost:3000](http://localhost:3000)

## Features of the MiniHouse app
- `Sign in with google` with `OAuth 2.0`
- `Connect to stripe` if you're a host and want to host listings.
- `Search` for listings in your desired location, `filter` them with pricing high to low or viceversa.
- `Book` your desired listing by selecting `check-in` and `check-out` dates, paying through stripe.
- Visit the profile section to see your `created and booked listings`, see `income`, disconnecting from stripe etc...

## Some important libraries used for client

- React
- Ant design (React UI library for easy-to-use components like cards, datepickers)
- TypeScript (For efficient type checking)
- Apollo (Apollo provides a declarative API, intelligent caching and react hooks for API calls)
- Moment (For managing dates)
- React stripe elements (For getting card details in a proper manner)

## Some important libraries used for server

- Express with Apollo (It is a minimal and flexible Node.js framework for server side)
- MongoDB (A non relational database for storing the application data)
- GraphQL (A data query and manipulation language for APIs)
- Google APIs (For enabling sign in with google and geocoding)
- Stripe (For managing all the payments)
- Cloudinary (for uploading listing images)
- Compression (For sending compressed gzip formatted data to client)

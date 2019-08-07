require('dotenv').config()

const tcKey = process.env.TC_KEY
const stripeKey = process.env.STRIPE_KEY

module.exports = {
  tcKey,
  stripeKey
}
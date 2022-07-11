import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import services from 'src/services/**/*.{js,ts}'

const rwGqlHandler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})

export const handler = async (...all) => {
  console.log('🙇‍♀️', all)
  try {
    const test = rwGqlHandler(...all)
    console.log('🍋', await test)

    return test
  } catch (e) {
    console.log('ERROR:', e)
    throw e
  }
}

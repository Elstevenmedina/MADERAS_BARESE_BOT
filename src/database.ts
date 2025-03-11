import mongoose from 'mongoose'

export const initDB = (DB_HOST: string): void => {
  const connectWithRetry = () => {
    mongoose.connect(DB_HOST)
      .then(db => { console.log('DB is connected') })
      .catch(err => {
        console.error(`Error connecting to DB: ${err}`)
        console.log('Retrying connection in 5 seconds...')
        setTimeout(connectWithRetry, 5000)
      })
  }

  connectWithRetry()
}
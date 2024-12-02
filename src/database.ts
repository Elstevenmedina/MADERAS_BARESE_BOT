import mongoose from 'mongoose'

export const initDB = (DB_HOST: string): void => {
  mongoose.connect(DB_HOST)
    .then(db => { console.log('DB is connected') })
    .catch(err => { console.error(`Error connecting to DB: ${err}`) })
}

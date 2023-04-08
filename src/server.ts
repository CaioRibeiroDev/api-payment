import 'reflect-metadata'
import '../src/http/tsyringe'
import 'express-async-errors'
import cors from 'cors'
import express, { NextFunction, Request, Response, urlencoded } from 'express'
import { AppError } from './errors/app-error'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) return response.status(err.statusCode).json({ message: err.message })

  return response.status(500).json({
    status: 'Error',
    message: `Internal server error - ${err.message}`
  })
})

app.listen(3333)

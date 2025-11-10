import express from 'express'
import cors from 'cors'
import metricsRouter from './routes/metricsRouter'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/metrics', metricsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export { app }
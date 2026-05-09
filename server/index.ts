import "dotenv/config"
import express from "express"
import cors from "cors"
import ingestRouter from "./routes/ingest"
import tasteProfileRouter from "./routes/tasteProfile"
import preDeliveryRouter from "./routes/preDeliveryReview"

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors())
app.use(express.json({ limit: "2mb" }))

app.use("/api/ingest", ingestRouter)
app.use("/api/taste-profile", tasteProfileRouter)
app.use("/api/pre-delivery-review", preDeliveryRouter)

app.get("/api/health", (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Macrame API running on :${PORT}`)
})

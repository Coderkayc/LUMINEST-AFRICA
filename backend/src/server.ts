// backend/src/server.ts
import 'dotenv/config'
import app from './app'
import { connectDB } from './lib/mongodb'

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await connectDB()
    console.log('✅ MongoDB connected')

    app.listen(PORT, () => {
      console.log(`🚀 LUMINEST AFRICA API running on http://localhost:${PORT}`)
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (err) {
    console.error('❌ Failed to start server:', err)
    process.exit(1)
  }
}

start()

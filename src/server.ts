import { app } from './app'
import { env } from './env/env'

app.listen({
	port: env.PORT,
	host: '0.0.0.0'
}).then(() => {
	console.log(`Rodando na porta http://localhost${env.PORT}`)
})
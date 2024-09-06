import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    HOST: get('HOST').required().asString(),
    DB_HOST: get('DB_HOST').required().asString(),
}
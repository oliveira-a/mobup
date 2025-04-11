import config from '@/config/server';
import postgres from "postgres";

export default postgres(config.db.url);
import { createClient } from '@supabase/supabase-js'
import config from './config.js'

const supabaseUrl = config.URL
const supabaseKey = config.KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
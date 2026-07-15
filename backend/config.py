import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    DEBUG = os.getenv("DEBUG") == "True"
    SUPABASE_URL = os.getenv("https://wovtsafnippsbehnxbaf.supabase.co")
   SUPABASE_ANON_KEY = os.getenv("sb_publishable_0bASiUmQAfzn_wg7VyawEw_Dw8qZkJn")
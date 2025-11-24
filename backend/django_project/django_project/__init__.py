import os
import pymysql

pymysql.install_as_MySQLdb()

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

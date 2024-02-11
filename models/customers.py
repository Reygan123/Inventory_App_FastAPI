from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from db.base_class import Base

class Customers(Base):
    id = Column(Integer, primary_key=True, index=True)
    customer_number = Column(String(255), index=True)
    name = Column(String(255), index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())
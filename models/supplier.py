from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base_class import Base

class Supplier(Base):
    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(255), index=True)
    address = Column(String(255), index=True)
    email = Column(String(255), index=True)
    zip_code = Column(Integer, index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())

    supply_order = relationship("Supply_Order", back_populates="supplier")
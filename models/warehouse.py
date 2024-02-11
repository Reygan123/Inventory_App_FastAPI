from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base_class import Base

class Warehouse(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    address = Column(String(255), index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())

    product_warehouse = relationship("Product_Warehouse", back_populates="warehouse")
    order = relationship("Order", back_populates="warehouse")
    supply_order = relationship("Supply_Order", back_populates="warehouse")
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base_class import Base

class Order(Base):
    id = Column(Integer, primary_key=True, index=True)
    invoice = Column(Integer, index=True)
    total_price = Column(Integer, index=True)
    customer_id = Column(Integer, index=True)
    warehouse_id = Column(Integer, ForeignKey('warehouse.id'), index=True)
    status = Column(String (255), index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())

    warehouse = relationship("Warehouse", back_populates="order")
    order_products = relationship("Order_Product", back_populates="order")
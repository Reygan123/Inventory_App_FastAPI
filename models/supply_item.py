from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base_class import Base

class Supply_Item(Base):
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey('products.id'), index=True)
    supply_order_id = Column(Integer, ForeignKey('supply_order.id'), index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())

    products = relationship("Products", back_populates="supply_item")
    supply_order = relationship("Supply_Order", back_populates="supply_item") 
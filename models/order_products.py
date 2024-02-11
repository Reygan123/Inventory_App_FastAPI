from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base_class import Base

class Order_Product(Base):
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('order.id'), index=True)
    product_id = Column(Integer, ForeignKey('products.id'), index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())

    order = relationship("Order", back_populates="order_products")
    products = relationship("Products", back_populates="order_products")
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base_class import Base

class Product_Warehouse(Base):
    id = Column(Integer, primary_key=True, index=True)
    quantity = Column(Integer, index=True)
    product_id = Column(Integer, ForeignKey('products.id'), index=True)
    warehouse_id = Column(Integer, ForeignKey('warehouse.id'), index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())

    products = relationship("Products", back_populates="product_warehouse")
    warehouse = relationship("Warehouse", back_populates="product_warehouse")
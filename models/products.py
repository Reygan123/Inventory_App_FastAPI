from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base_class import Base

class Products(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    stok = Column(Integer, index=True)
    price = Column(Integer, index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())

    product_category = relationship("Product_Category", back_populates="products")
    product_warehouse = relationship("Product_Warehouse", back_populates="products")
    order_products = relationship("Order_Product", back_populates="products")
    supply_item = relationship("Supply_Item", back_populates="products")

from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base_class import Base

class Product_Category(Base):
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey('products.id'), index=True)
    category_id = Column(Integer, ForeignKey('category.id'), index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())

    products = relationship("Products", back_populates="product_category")
    category = relationship("Category", back_populates="product_category")

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base_class import Base

class Category(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())

    product_category = relationship("Product_Category", back_populates="category")
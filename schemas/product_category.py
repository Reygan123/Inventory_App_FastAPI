from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Product_CategoryBase(BaseModel):
    product_id: Optional[int] = None
    category_id: Optional[int] = None
    
class Product_Category(Product_CategoryBase):
    id: int
    product_id: int
    category_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class Product_CategoryCreate(Product_CategoryBase):
    product_id: int
    category_id: int
    
class Product_CategoryUpdate(Product_CategoryBase):
    product_id: int
    category_id: int
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    stok: Optional[int] = None
    name: Optional[str] = None
    price: Optional[int] = None
    
class Products(ProductBase):
    id: int
    stok: int
    name: str
    price: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class ProductCreate(ProductBase):
    stok: int
    name: str
    price: int
    
class ProductUpdate(ProductBase):
    stok: int
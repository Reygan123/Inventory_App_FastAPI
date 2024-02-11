from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Order_ProductBase(BaseModel):
    order_id: Optional[int] = None
    product_id: Optional[int] = None
    
class Order_Product(Order_ProductBase):
    id: int
    order_id: int
    product_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class Order_ProductCreate(Order_ProductBase):
    order_id: int
    product_id: int
    
class Order_ProductUpdate(Order_ProductBase):
    order_id: int
    product_id: int
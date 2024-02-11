from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Supply_ItemBase(BaseModel):
    product_id: Optional[int] = None
    supply_order_id: Optional[int] = None
    
class Supply_Item(Supply_ItemBase):
    id: int
    product_id: int
    supply_order_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class Supply_ItemCreate(Supply_ItemBase):
    product_id: int
    supply_order_id: int

class Supply_ItemUpdate(Supply_ItemBase):
    product_id: int
    supply_order_id: int
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OrderBase(BaseModel):
    invoice: Optional[int] = None
    total_price: Optional[int] = None
    customer_id: Optional[int] = None
    warehouse_id: Optional[int] = None
    status: Optional[str] = None
    
class Order(OrderBase):
    id: int
    invoice: int
    total_price: int
    customer_id: int
    warehouse_id: int
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class OrderCreate(OrderBase):
    invoice: int
    total_price: int
    customer_id: int
    warehouse_id: int
    status: str
    
class OrderUpdate(OrderBase):
    status: str
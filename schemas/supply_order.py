from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Supply_OrderBase(BaseModel):
    invoice: Optional[int] = None
    total_price: Optional[int] = None
    supplier_id: Optional[int] = None
    warehouse_id: Optional[int] = None
    status: Optional[str] = None
    
class Supply_Order(Supply_OrderBase):
    id: int
    invoice: int
    total_price: int
    supplier_id: int
    warehouse_id: int
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class Supply_OrderCreate(Supply_OrderBase):
    invoice: int
    total_price: int
    supplier_id: int
    warehouse_id: int
    status: str
    
class Supply_OrderUpdate(Supply_OrderBase):
    status: str
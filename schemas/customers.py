from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CustomerBase(BaseModel):
    customer_number: Optional[str] = None
    name: Optional[str] = None
    
class Customers(CustomerBase):
    id: int
    customer_number: str
    name: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class CustomerCreate(CustomerBase):
    customer_number: str
    name: str
    
class CustomerUpdate(CustomerBase):
    customer_number: str
    name: str
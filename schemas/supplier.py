from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SupplierBase(BaseModel):
    company_name: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    zip_code: Optional[int] = None
    
class Supplier(SupplierBase):
    id: int
    company_name: str
    address: str
    email: str
    zip_code: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class SupplierCreate(SupplierBase):
    company_name: str
    address: str
    email: str
    zip_code: int
    
class SupplierUpdate(SupplierBase):
    company_name: str
    address: str
    email: str
    zip_code: int
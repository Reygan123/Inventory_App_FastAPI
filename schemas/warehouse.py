from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class WarehouseBase(BaseModel):
    title: Optional[str] = None
    address: Optional[str] = None
    
class Warehouse(WarehouseBase):
    id: int
    title: str
    address: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class WarehouseCreate(WarehouseBase):
    title: str
    address: str
    
class WarehouseUpdate(WarehouseBase):
    title: str
    address: str
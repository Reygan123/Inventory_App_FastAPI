from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Product_WarehouseBase(BaseModel):
    quantity: Optional[int] = None
    product_id: Optional[int] = None
    warehouse_id: Optional[int] = None
    
class Product_Warehouse(Product_WarehouseBase):
    id: int
    quantity: int
    product_id: int
    warehouse_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class Product_WarehouseCreate(Product_WarehouseBase):
    quantity: int
    product_id: int
    warehouse_id: int
    
class Product_WarehouseUpdate(Product_WarehouseBase):
    quantity: int
    product_id: int
    warehouse_id: int
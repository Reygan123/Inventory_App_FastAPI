from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CategoryBase(BaseModel):
    name: Optional[str] = None
    
class Category(CategoryBase):
    id: int
    name: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
class CategoryCreate(CategoryBase):
    name: str
    
class CategoryUpdate(CategoryBase):
    name: str
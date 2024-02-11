from typing import List, Optional
from sqlalchemy.orm import Session
from crud.base import CRUDBase
from models.product_category import Product_Category as modelProductCategory
from schemas.product_category import Product_CategoryCreate, Product_CategoryUpdate
from datetime import datetime

class CRUDProductCategory(CRUDBase[modelProductCategory, Product_CategoryCreate, Product_CategoryUpdate]):
    def create(self, db: Session, *, obj_in: Product_CategoryCreate) -> modelProductCategory:
        db_obj = modelProductCategory(
            product_id=obj_in.product_id,
            category_id=obj_in.category_id,
            updated_at=datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi(
        self, db: Session, skip: int = 0, limit: int = 35, product_id: Optional[int] = None
    ) -> List[modelProductCategory]:
        query = db.query(self.model)
        if product_id is not None:
            query = query.filter(self.model.product_id == product_id)
        return query.offset(skip).limit(limit).all()

product_category = CRUDProductCategory(modelProductCategory)

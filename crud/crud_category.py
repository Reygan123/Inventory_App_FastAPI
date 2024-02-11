
from crud.base import CRUDBase
from models.category import Category as modelCategory
from sqlalchemy.orm import Session
from schemas.category import CategoryCreate, CategoryUpdate
from datetime import datetime

class CRUDCategory(CRUDBase[modelCategory, CategoryCreate, CategoryUpdate]):
    def create(self, db:Session, *, obj_in: CategoryCreate) -> modelCategory:
        db_obj = modelCategory(
            name = obj_in.name,
            updated_at = datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

category = CRUDCategory(modelCategory)

    
from typing import List, Optional
from crud.base import CRUDBase
from models.supply_item import Supply_Item as modelSupplyItem
from sqlalchemy.orm import Session
from schemas.supply_item import Supply_ItemCreate, Supply_ItemUpdate
from datetime import datetime

class CRUDSupplyItem(CRUDBase[modelSupplyItem, Supply_ItemCreate, Supply_ItemUpdate]):
    def create(self, db:Session, *, obj_in: Supply_ItemCreate) -> modelSupplyItem:
        db_obj = modelSupplyItem(
            product_id = obj_in.product_id,
            supply_order_id = obj_in.supply_order_id,
            updated_at = datetime.now()
        )
        db.add(db_obj) 
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi(
        self, db: Session, skip: int = 0, limit: int = 35, supply_order_id: Optional[int] = None
    ) -> List[modelSupplyItem]:
        query = db.query(self.model)
        if supply_order_id is not None:
            query = query.filter(self.model.supply_order_id == supply_order_id)
        return query.offset(skip).limit(limit).all()

supply_item = CRUDSupplyItem(modelSupplyItem)

    
from typing import Any, Dict, Optional, List
from crud.base import CRUDBase
from models.order import Order as modelOrder
from sqlalchemy.orm import Session
from schemas.order import OrderCreate, OrderUpdate
from datetime import datetime

class CRUDOrder(CRUDBase[modelOrder, OrderCreate, OrderUpdate]):
    def create(self, db:Session, *, obj_in: OrderCreate) -> modelOrder:
        db_obj = modelOrder(
            invoice = obj_in.invoice,
            total_price = obj_in.total_price,
            customer_id = obj_in.customer_id,
            warehouse_id = obj_in.warehouse_id,
            status = obj_in.status,
            updated_at = datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj) 
        return db_obj

    def get_multi(
        self, db: Session, skip: int = 0, limit: int = 35, warehouse_id: Optional[int] = None
    ) -> List[modelOrder]:
        query = db.query(self.model)
        if warehouse_id is not None:
            query = query.filter(self.model.warehouse_id == warehouse_id)
        return query.offset(skip).limit(limit).all()

order = CRUDOrder(modelOrder)

    
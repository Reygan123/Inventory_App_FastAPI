from typing import List, Optional
from crud.base import CRUDBase
from models.supply_order import Supply_Order as modelSupplyOrder
from sqlalchemy.orm import Session
from schemas.supply_order import Supply_OrderCreate, Supply_OrderUpdate
from datetime import datetime

class CRUDSupplyOrder(CRUDBase[modelSupplyOrder, Supply_OrderCreate, Supply_OrderUpdate]):
    def create(self, db:Session, *, obj_in: Supply_OrderCreate) -> modelSupplyOrder:
        db_obj = modelSupplyOrder(
            invoice = obj_in.invoice,
            total_price = obj_in.total_price,
            supplier_id = obj_in.supplier_id,
            warehouse_id = obj_in.warehouse_id,
            status = obj_in.status,
            updated_at = datetime.now()
        )
        db.add(db_obj) 
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi(
        self, db: Session, skip: int = 0, limit: int = 35, supplier_id: Optional[int] = None
    ) -> List[modelSupplyOrder]:
        query = db.query(self.model)
        if supplier_id is not None:
            query = query.filter(self.model.supplier_id == supplier_id)
        return query.offset(skip).limit(limit).all()

supply_order = CRUDSupplyOrder(modelSupplyOrder)

    
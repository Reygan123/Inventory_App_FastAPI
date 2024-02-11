from typing import List, Optional
from crud.base import CRUDBase
from models.product_warehouse import Product_Warehouse as modelProductWarehouse
from sqlalchemy.orm import Session
from schemas.product_warehouse import Product_WarehouseCreate, Product_WarehouseUpdate
from datetime import datetime

class CRUDProductWarehouse(CRUDBase[modelProductWarehouse, Product_WarehouseCreate, Product_WarehouseUpdate]):
    def create(self, db:Session, *, obj_in: Product_WarehouseCreate) -> modelProductWarehouse:
        db_obj = modelProductWarehouse(
            quantity = obj_in.quantity,
            product_id = obj_in.product_id,
            warehouse_id = obj_in.warehouse_id,
            updated_at = datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def get_multi(
        self, db: Session, skip: int = 0, limit: int = 35, product_id: Optional[int] = None, warehouse_id: Optional[int] = None
    ) -> List[modelProductWarehouse]:
        query = db.query(self.model)
        if product_id is not None:
            query = query.filter(self.model.product_id == product_id)
        if warehouse_id is not None:
            query = query.filter(self.model.warehouse_id == warehouse_id)
        return query.offset(skip).limit(limit).all()

product_warehouse = CRUDProductWarehouse(modelProductWarehouse)

    
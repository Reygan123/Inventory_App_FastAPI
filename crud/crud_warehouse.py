
from crud.base import CRUDBase
from models.warehouse import Warehouse as modelWarehouse
from sqlalchemy.orm import Session
from schemas.warehouse import WarehouseCreate, WarehouseUpdate
from datetime import datetime

class CRUDWarehouses(CRUDBase[modelWarehouse, WarehouseCreate, WarehouseUpdate]):
    def create(self, db:Session, *, obj_in: WarehouseCreate) -> modelWarehouse:
        db_obj = modelWarehouse(
            title = obj_in.title,
            address = obj_in.address,
            updated_at = datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

warehouse = CRUDWarehouses(modelWarehouse)

    
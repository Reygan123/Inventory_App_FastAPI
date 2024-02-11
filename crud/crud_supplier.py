
from crud.base import CRUDBase
from models.supplier import Supplier as modelSupplier
from sqlalchemy.orm import Session
from schemas.supplier import SupplierCreate, SupplierUpdate
from datetime import datetime

class CRUDSupplier(CRUDBase[modelSupplier, SupplierCreate, SupplierUpdate]):
    def create(self, db:Session, *, obj_in: SupplierCreate) -> modelSupplier:
        db_obj = modelSupplier(
            company_name = obj_in.company_name,
            address = obj_in.address,
            email = obj_in.email,
            zip_code = obj_in.zip_code,
            updated_at = datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

supplier = CRUDSupplier(modelSupplier)

    
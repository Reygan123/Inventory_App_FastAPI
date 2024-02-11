
from crud.base import CRUDBase
from models.customers import Customers as modelCustomers
from sqlalchemy.orm import Session
from schemas.customers import CustomerCreate, CustomerUpdate
from datetime import datetime

class CRUDCustomers(CRUDBase[modelCustomers, CustomerCreate, CustomerUpdate]):
    def create(self, db:Session, *, obj_in: CustomerCreate) -> modelCustomers:
        db_obj = modelCustomers(
            customer_number = obj_in.customer_number,
            name = obj_in.name,
            updated_at = datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

customers = CRUDCustomers(modelCustomers)

    
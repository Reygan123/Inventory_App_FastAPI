
from crud.base import CRUDBase
from models.products import Products as modelProducts
from sqlalchemy.orm import Session
from schemas.products import ProductCreate, ProductUpdate
from datetime import datetime

class CRUDProducts(CRUDBase[modelProducts, ProductCreate, ProductUpdate]):
    def create(self, db:Session, *, obj_in: ProductCreate) -> modelProducts:
        db_obj = modelProducts(
            stok = obj_in.stok,
            name = obj_in.name,
            price = obj_in.price,
            updated_at = datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

products = CRUDProducts(modelProducts)

    
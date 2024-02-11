from typing import List, Optional
from crud.base import CRUDBase
from models.order_products import Order_Product as modelOrder_Products
from sqlalchemy.orm import Session
from schemas.order_product import Order_ProductCreate, Order_ProductUpdate
from datetime import datetime

class CRUDOrder_Products(CRUDBase[modelOrder_Products, Order_ProductCreate, Order_ProductUpdate]):
    def create(self, db:Session, *, obj_in: Order_ProductCreate) -> modelOrder_Products:
        db_obj = modelOrder_Products(
            order_id = obj_in.order_id,
            product_id = obj_in.product_id,
            updated_at = datetime.now()
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi(
        self, db: Session, skip: int = 0, limit: int = 35, order_id: Optional[int] = None
    ) -> List[modelOrder_Products]:
        query = db.query(self.model)
        if order_id is not None:
            query = query.filter(self.model.order_id == order_id)
        return query.offset(skip).limit(limit).all()

Order_Product = CRUDOrder_Products(modelOrder_Products)
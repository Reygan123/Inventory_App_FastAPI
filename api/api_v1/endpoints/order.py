from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict, Optional
from schemas import order
from sqlalchemy.orm import Session
from api import deps
from crud import crud_order

router = APIRouter()

@router.get("/", response_model=Dict[str, Any])
def read_Orders(db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 35, warehouse_id: Optional[int] = None) -> Any:
    orders = crud_order.order.get_multi(db, skip=skip, limit=limit, warehouse_id=warehouse_id)
    
    detailed_orders = []
    for o in orders:
        detailed_orders.append({
            "id": o.id,
            "invoice": o.invoice,
            "total_price": o.total_price, 
            "customer_id": o.customer_id,
            "warehouse_id": o.warehouse_id,
            "status": o.status,
            "created_at": o.created_at,
            "updated_at": o.updated_at,
            "warehouse_detail": {
                "warehouse_name": o.warehouse.title,
            }
        })

    return {"data":detailed_orders}

@router.get("/{id}", response_model=Dict[str, order.Order])
def get_order(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    order = crud_order.order.get(db=db, id=id)
    if not order:
        raise HTTPException(status_code=404, detail="order not found")

    detailed_order = {
        "id": order.id,
        "customer_id": order.customer_id,
        "warehouse_id": order.warehouse_id,
        "invoice": order.invoice,
        "total_price": order.total_price,
        "status": order.status,
        "warehouse_detail": {
            "warehouse_name": order.warehouse.title,
        },
        "created_at": order.created_at,
        "updated_at": order.updated_at 
    }

    return {"data": detailed_order}

@router.post("/", response_model=Dict[str, order.Order])
def create_Order(
    *,
    db: Session = Depends(deps.get_db),
    order_in: order.OrderCreate
) -> Any:
    order_data = crud_order.order.create(db, obj_in=order_in)
    
    detailed_order = {
        "id": order_data.id,
        "customer_id": order_data.customer_id,
        "warehouse_id": order_data.warehouse_id,
        "invoice": order_data.invoice,
        "total_price": order_data.total_price,
        "status": order_data.status,
        "warehouse_detail": {
            "warehouse_name": order_data.warehouse.title,
        },
        "created_at": order_data.created_at,
        "updated_at": order_data.updated_at 
    }
    return {"data": detailed_order}

@router.put("/{id}", response_model=Dict[str, order.Order])
def update_Order(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    order_in: order.OrderUpdate
) -> Any:
    order_data = crud_order.order.get(db=db, id=id)
    if not order_data:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order_data = crud_order.order.update(db=db, db_obj=order_data, obj_in=order_in)
    
    detailed_order = {
        "id": order_data.id,
        "customer_id": order_data.customer_id,
        "warehouse_id": order_data.warehouse_id,
        "invoice": order_data.invoice,
        "total_price": order_data.total_price,
        "status": order_data.status,
        "warehouse_detail": {
            "warehouse_name": order_data.warehouse.title,
        },
        "created_at": order_data.created_at,
        "updated_at": order_data.updated_at 
    }
    return {"data": detailed_order}

@router.delete("/{id}", response_model=Dict[str, order.Order])
def delete_Orders(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    order_data = crud_order.order.get(db=db, id=id)
    if not order_data:
        raise HTTPException(status_code=404, detail="Order not found")
    
    crud_order.order.remove(db=db, id=id)
    return {"data": order_data}

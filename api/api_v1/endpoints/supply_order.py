from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict, Optional
from schemas import supply_order
from sqlalchemy.orm import Session
from api import deps
from crud import crud_supplyOrder

router = APIRouter()

@router.get("/", response_model=Dict[str, Any])
def read_supplyOrder(db: Session = Depends(deps.get_db), skip: int=0, limit: int=35, supplier_id: Optional[int] = None) -> Any:
    supply_orders = crud_supplyOrder.supply_order.get_multi(db, skip=skip, limit=limit, supplier_id=supplier_id)

    detailed_supply_orders = []
    for so in supply_orders: 
        detailed_supply_orders.append({
            "id": so.id,
            "invoice": so.invoice,
            "total_price": so.total_price,
            "supplier_id": so.supplier_id,
            "warehouse_id": so.warehouse_id,
            "status": so.status,
            "created_at": so.created_at,
            "updated_at": so.updated_at,
            "supplier_detail": {
                "supplier_name": so.supplier.company_name,
            },
            "warehouse_detail": {
                "warehouse_name": so.warehouse.title,
            }
        })

    return {"data": detailed_supply_orders}

@router.get("/{id}", response_model=Dict[str, Any])
def get_supplyOrder(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    supply_order_data = crud_supplyOrder.supply_order.get(db=db, id=id)
    if not supply_order_data:
        raise HTTPException(status_code=404, detail="Supply Order not found")
    
    detailed_supply_order = {
        "id": supply_order_data.id,
        "invoice": supply_order_data.invoice,
        "total_price": supply_order_data.total_price,
        "supplier_id": supply_order_data.supplier_id,
        "warehouse_id": supply_order_data.warehouse_id,
        "status": supply_order_data.status,
        "created_at": supply_order_data.created_at,
        "updated_at": supply_order_data.updated_at,
        "supplier_detail": {
            "supplier_name": supply_order_data.supplier.company_name,
        },
        "warehouse_detail": {
            "warehouse_name": supply_order_data.warehouse.title,
        },
    }
    return {"data": detailed_supply_order}

@router.post("/", response_model=Dict[str, supply_order.Supply_Order])
def create_supplyOrder(
    *,
    db: Session = Depends(deps.get_db),
    customer_in: supply_order.Supply_OrderCreate
) -> Any:
    supply_order_data = crud_supplyOrder.supply_order.create(db, obj_in=customer_in)
    
    detailed_supply_order = {
        "id": supply_order_data.id,
        "invoice": supply_order_data.invoice,
        "total_price": supply_order_data.total_price,
        "supplier_id": supply_order_data.supplier_id,
        "warehouse_id": supply_order_data.warehouse_id,
        "status": supply_order_data.status,
        "created_at": supply_order_data.created_at,
        "updated_at": supply_order_data.updated_at,
        "supplier_detail": {
            "supplier_name": supply_order_data.supplier.company_name,
        },
        "warehouse_detail": {
            "warehouse_name": supply_order_data.warehouse.title,
        }
    }
    return {"data": detailed_supply_order}

@router.put("/{id}", response_model=Dict[str, supply_order.Supply_Order])
def update_supplyOrder(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    customer_in: supply_order.Supply_OrderUpdate
) -> Any:
    supply_order_data = crud_supplyOrder.supply_order.get(db=db, id=id)
    if not supply_order_data:
        raise HTTPException(status_code=404, detail="Supply Order not found")
    
    supply_order_data = crud_supplyOrder.supply_order.update(db=db, db_obj=supply_order_data, obj_in=customer_in)
    
    detailed_supply_order = {
        "id": supply_order_data.id,
        "invoice": supply_order_data.invoice,
        "total_price": supply_order_data.total_price,
        "supplier_id": supply_order_data.supplier_id,
        "warehouse_id": supply_order_data.warehouse_id,
        "status": supply_order_data.status,
        "created_at": supply_order_data.created_at,
        "updated_at": supply_order_data.updated_at,
        "supplier_detail": {
            "supplier_name": supply_order_data.supplier.company_name,
        },
        "warehouse_detail": {
            "warehouse_name": supply_order_data.warehouse.title,
        }
    }
    return {"data": detailed_supply_order}

@router.delete("/{id}", response_model=Dict[str, supply_order.Supply_Order])
def delete_supplyOrders(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    supply_order_data = crud_supplyOrder.supply_order.get(db=db, id=id)
    if not supply_order_data:
        raise HTTPException(status_code=404, detail="Supply Order not found")
    
    crud_supplyOrder.supply_order.remove(db=db, id=id)
    
    detailed_supply_order = {
        "id": supply_order_data.id,
        "invoice": supply_order_data.invoice,
        "total_price": supply_order_data.total_price,
        "supplier_id": supply_order_data.supplier_id,
        "warehouse_id": supply_order_data.warehouse_id,
        "status": supply_order_data.status,
        "created_at": supply_order_data.created_at,
        "updated_at": supply_order_data.updated_at,
        "supplier_detail": {
            "supplier_name": supply_order_data.supplier.company_name,
        },
        "warehouse_detail": {
            "warehouse_name": supply_order_data.warehouse.title,
        }
    }
    return {"data": detailed_supply_order}

from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict, Optional
from schemas import supply_item
from sqlalchemy.orm import Session
from api import deps
from crud import crud_supplyItem

router = APIRouter()

@router.get("/", response_model=Dict[str, Any])
def read_supplyOrder(db: Session = Depends(deps.get_db), skip: int=0, limit: int=35, supply_order_id: Optional[int] = None) -> Any:
    supply_orders = crud_supplyItem.supply_item.get_multi(db, skip=skip, limit=limit, supply_order_id=supply_order_id)

    detailed_supply_orders = []
    for so in supply_orders: 
        detailed_supply_orders.append({
            "id": so.id,
            "product_id": so.product_id,
            "supply_order_id": so.supply_order_id,
            "created_at": so.created_at,
            "updated_at": so.updated_at,
            "product_detail": {
                "product_name": so.procuts.name,
            },
            "supply_order_detail": {
                "invoice": so.supply_order.invoice,
            }
        })

    return {"data": detailed_supply_orders}

@router.get("/{id}", response_model=Dict[str, Any])
def get_supplyOrder(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    supply_item_data = crud_supplyItem.supply_item.get(db=db, id=id)
    if not supply_item_data:
        raise HTTPException(status_code=404, detail="Supply Order not found")
    
    detailed_supply_item = {
        "id": supply_item_data.id,
        "product_id": supply_item_data.product_id,
        "supply_order_id": supply_item_data.supply_order_id,
        "created_at": supply_item_data.created_at,
        "updated_at": supply_item_data.updated_at,
        "product_detail": {
            "product_name": supply_item_data.procuts.name,
        },
        "supply_order_detail": {
            "invoice": supply_item_data.supply_order.invoice,
        },
    }
    return {"data": detailed_supply_item}

@router.post("/", response_model=Dict[str, supply_item.Supply_Item])
def create_supplyOrder(
    *,
    db: Session = Depends(deps.get_db),
    customer_in: supply_item.Supply_ItemCreate
) -> Any:
    supply_item_data = crud_supplyItem.supply_item.create(db, obj_in=customer_in)
    
    detailed_supply_item = {
        "id": supply_item_data.id,
        "product_id": supply_item_data.product_id,
        "supply_order_id": supply_item_data.supply_order_id,
        "created_at": supply_item_data.created_at,
        "updated_at": supply_item_data.updated_at,
        "product_detail": {
            "product_name": supply_item_data.procuts.name,
        },
        "supply_order_detail": {
            "invoice": supply_item_data.supply_order.invoice,
        }
    }
    return {"data": detailed_supply_item}

@router.put("/{id}", response_model=Dict[str, supply_item.Supply_Item])
def update_supplyItem(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    customer_in: supply_item.Supply_ItemUpdate
) -> Any:
    supply_item_data = crud_supplyItem.supply_item.get(db=db, id=id)
    if not supply_item_data:
        raise HTTPException(status_code=404, detail="Supply Item not found")
    
    supply_item_data = crud_supplyItem.supply_item.update(db=db, db_obj=supply_item_data, obj_in=customer_in)
    
    detailed_supply_item = {
        "id": supply_item_data.id,
        "product_id": supply_item_data.product_id,
        "supply_order_id": supply_item_data.supply_order_id,
        "created_at": supply_item_data.created_at,
        "updated_at": supply_item_data.updated_at,
        "product_detail": {
            "product_name": supply_item_data.procuts.name,
        },
        "supply_order_detail": {
            "invoice": supply_item_data.supply_order.invoice,
        }
    }
    return {"data": detailed_supply_item}

@router.delete("/{id}", response_model=Dict[str, supply_item.Supply_Item])
def delete_supplyOrders(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    supply_item_data = crud_supplyItem.supply_item.get(db=db, id=id)
    if not supply_item_data:
        raise HTTPException(status_code=404, detail="Supply Order not found")
    
    crud_supplyItem.supply_item.remove(db=db, id=id)
    
    detailed_supply_item = {
        "id": supply_item_data.id,
        "product_id": supply_item_data.product_id,
        "supply_order_id": supply_item_data.supply_order_id,
        "created_at": supply_item_data.created_at,
        "updated_at": supply_item_data.updated_at,
        "product_detail": {
            "product_name": supply_item_data.procuts.name,
        },
        "supply_order_detail": {
            "invoice": supply_item_data.supply_order.invoice,
        }
    }
    return {"data": detailed_supply_item}

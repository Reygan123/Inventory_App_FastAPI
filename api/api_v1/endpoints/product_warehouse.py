from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict, Optional
from schemas import product_warehouse
from sqlalchemy.orm import Session
from api import deps
from crud import crud_productWarehouse

router = APIRouter()

@router.get("/", response_model=Dict[str, Any])
def read_productWarehouses(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 35,
    product_id: Optional[int] = None,
    warehouse_id: Optional[int] = None
) -> Any:
    product_warehouses = crud_productWarehouse.product_warehouse.get_multi(
        db, skip=skip, limit=limit, product_id=product_id, warehouse_id=warehouse_id
    )
    
    detailed_product_warehouses = []
    for pw in product_warehouses:
        detailed_product_warehouses.append({
            "id": pw.id,
            "product_id": pw.product_id,
            "warehouse_id": pw.warehouse_id,
            "quantity": pw.quantity,
            "created_at": pw.created_at,
            "updated_at": pw.updated_at,
            "product_detail": {
                "product_id": pw.products.id,
                "product_name": pw.products.name,
                "product_stok": pw.products.stok,
                "product_price": pw.products.price,
            },
            "warehouse_detail": {
                "warehouse_id": pw.warehouse.id,
                "warehouse_name": pw.warehouse.title,
            }
        })

    return {"data": detailed_product_warehouses}


@router.get("/{id}", response_model=Dict[str, product_warehouse.Product_Warehouse])
def get_productWarehouse(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    product_warehouse_data = crud_productWarehouse.product_warehouse.get(db=db, id=id)
    if not product_warehouse_data:
        raise HTTPException(status_code=404, detail="Product_Warehouse not found")
    
    detailed_product_warehouse = {
        "id": product_warehouse_data.id,
        "product_id": product_warehouse_data.product_id,
        "warehouse_id": product_warehouse_data.warehouse_id,
        "quantity": product_warehouse_data.quantity,
        "created_at": product_warehouse_data.created_at,
        "updated_at": product_warehouse_data.updated_at,
        "product_detail": {
            "product_id": product_warehouse_data.products.id,
            "product_name": product_warehouse_data.products.name,
            "product_stok": product_warehouse_data.products.stok,
            "product_price": product_warehouse_data.products.price,
        },
        "warehouse_detail": {
            "warehouse_id": product_warehouse_data.warehouse.id,
            "warehouse_name": product_warehouse_data.warehouse.name,
        }
    }
    return {"data": detailed_product_warehouse}

@router.post("/", response_model=Dict[str, product_warehouse.Product_Warehouse])
def create_productWarehouse(
    *,
    db: Session = Depends(deps.get_db),
    customer_in: product_warehouse.Product_WarehouseCreate
) -> Any:
    product_warehouse_data = crud_productWarehouse.product_warehouse.create(db, obj_in=customer_in)
    
    detailed_product_warehouse = {
        "id": product_warehouse_data.id,
        "product_id": product_warehouse_data.product_id,
        "warehouse_id": product_warehouse_data.warehouse_id,
        "quantity": product_warehouse_data.quantity,
        "created_at": product_warehouse_data.created_at,
        "updated_at": product_warehouse_data.updated_at,
        "product_detail": {
            "product_id": product_warehouse_data.products.id,
            "product_name": product_warehouse_data.products.name,
            "product_stok": product_warehouse_data.products.stok,
            "product_price": product_warehouse_data.products.price,
        },
        "warehouse_detail": {
            "warehouse_id": product_warehouse_data.warehouse.id,
            "warehouse_name": product_warehouse_data.warehouse.name,
        }
    }
    return {"data": detailed_product_warehouse}

@router.put("/{id}", response_model=Dict[str, product_warehouse.Product_Warehouse])
def update_productWarehouse(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    customer_in: product_warehouse.Product_WarehouseUpdate
) -> Any:
    product_warehouse_data = crud_productWarehouse.product_warehouse.get(db=db, id=id)
    if not product_warehouse_data:
        raise HTTPException(status_code=404, detail="Product Warehouse not found")
    
    product_warehouse_data = crud_productWarehouse.product_warehouse.update(db=db, db_obj=product_warehouse_data, obj_in=customer_in)
    
    detailed_product_warehouse = {
        "id": product_warehouse_data.id,
        "product_id": product_warehouse_data.product_id,
        "warehouse_id": product_warehouse_data.warehouse_id,
        "quantity": product_warehouse_data.quantity,
        "created_at": product_warehouse_data.created_at,
        "updated_at": product_warehouse_data.updated_at,
        "product_detail": {
            "product_name": product_warehouse_data.products.name,
        },
        "warehouse_detail": {
            "warehouse_id": product_warehouse_data.warehouse.id,
            "warehouse_name": product_warehouse_data.warehouse.name,
        }
    }
    return {"data": detailed_product_warehouse}

@router.delete("/{id}", response_model=Dict[str, product_warehouse.Product_Warehouse])
def delete_productWarehouses(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    product_warehouse_data = crud_productWarehouse.product_warehouse.get(db=db, id=id)
    if not product_warehouse_data:
        raise HTTPException(status_code=404, detail="Product Warehouse not found")
    
    crud_productWarehouse.product_warehouse.remove(db=db, id=id)
    return {"data": product_warehouse_data}

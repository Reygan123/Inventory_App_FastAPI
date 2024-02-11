from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict
from schemas import warehouse
from sqlalchemy.orm import Session
from api import deps
from crud import crud_warehouse


router = APIRouter()

@router.get("/", response_model=Dict[str, list[warehouse.Warehouse]])
def read_warehouse(db: Session = Depends(deps.get_db), skip: int=0, limit: int=35) -> Any:
    warehouse = crud_warehouse.warehouse.get_multi(db, skip=skip, limit=limit)
    return {"data": warehouse}

@router.get("/{id}", response_model=Dict[str, warehouse.Warehouse])
def get_warehouse(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    warehouse = crud_warehouse.warehouse.get(db=db, id=id)
    if not warehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    return {"data": warehouse}

@router.post("/", response_model=Dict[str, warehouse.Warehouse])
def create_warehouse(
    *,
    db: Session = Depends(deps.get_db),
    customer_in: warehouse.WarehouseCreate
    ) -> Any:
    
    dataWarehouse = crud_warehouse.warehouse.create(db, obj_in=customer_in)
    return {"data": dataWarehouse}

@router.put("/{id}", response_model=Dict[str, warehouse.Warehouse])
def update_warehouse(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    customer_in: warehouse.WarehouseUpdate
) -> Any:
    dataWarehouse = crud_warehouse.warehouse.get(db=db, id=id)
    if not dataWarehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    dataWarehouse = crud_warehouse.warehouse.update(db=db, db_obj=dataWarehouse, obj_in=customer_in)
    return {"data": dataWarehouse}



@router.delete("/{id}", response_model=Dict[str, warehouse.Warehouse])
def delete_warehouses(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    dataWarehouse = crud_warehouse.warehouse.get(db=db, id=id)
    if not dataWarehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    dataWarehouse = crud_warehouse.warehouse.remove(db=db, id=id)
    return {"data": dataWarehouse}




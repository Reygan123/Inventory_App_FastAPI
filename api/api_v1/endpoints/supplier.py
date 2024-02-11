from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict
from schemas import supplier
from sqlalchemy.orm import Session
from api import deps
from crud import crud_supplier


router = APIRouter()

@router.get("/", response_model=Dict[str, list[supplier.Supplier]])
def read_supplier(db: Session = Depends(deps.get_db), skip: int=0, limit: int=35) -> Any:
    supplier = crud_supplier.supplier.get_multi(db, skip=skip, limit=limit)
    return {"data": supplier}

@router.get("/{id}", response_model=Dict[str, supplier.Supplier])
def get_supplier(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    supplier = crud_supplier.supplier.get(db=db, id=id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return {"data": supplier}

@router.post("/", response_model=Dict[str, supplier.Supplier])
def create_supplier(
    *,
    db: Session = Depends(deps.get_db),
    customer_in: supplier.SupplierCreate
    ) -> Any:
    
    supplier = crud_supplier.supplier.create(db, obj_in=customer_in)
    return {"data": supplier}

@router.put("/{id}", response_model=Dict[str, supplier.Supplier])
def update_supplier(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    customer_in: supplier.SupplierUpdate
) -> Any:
    supplier = crud_supplier.supplier.get(db=db, id=id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    supplier = crud_supplier.supplier.update(db=db, db_obj=supplier, obj_in=customer_in)
    return {"data": supplier}



@router.delete("/{id}", response_model=Dict[str, supplier.Supplier])
def delete_suppliers(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    supplier = crud_supplier.supplier.get(db=db, id=id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    supplier = crud_supplier.supplier.remove(db=db, id=id)
    return {"data": supplier}
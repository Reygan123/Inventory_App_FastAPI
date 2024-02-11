from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict
from schemas import products
from sqlalchemy.orm import Session
from api import deps
from crud import crud_products

router = APIRouter()

@router.get("/", response_model=Dict[str, list[products.Products]])
def read_products(db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 35) -> Any:
    products = crud_products.products.get_multi(db, skip=skip, limit=limit)
    return {"data": products}

@router.get("/{id}", response_model=Dict[str, products.Products])
def get_product(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    product = crud_products.products.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"data": product}

@router.post("/", response_model=Dict[str, products.Products])
def create_product(
    *,
    db: Session = Depends(deps.get_db),
    customer_in: products.ProductCreate
    ) -> Any:
    
    product = crud_products.products.create(db, obj_in=customer_in)
    return {"data": product}

@router.put("/{id}", response_model=Dict[str, products.Products])
def update_product(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    customer_in: products.ProductUpdate
) -> Any:
    product = crud_products.products.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product = crud_products.products.update(db=db, db_obj=product, obj_in=customer_in)
    return {"data": product}



@router.delete("/{id}", response_model=Dict[str, products.Products])
def delete_products(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    product = crud_products.products.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product = crud_products.products.remove(db=db, id=id)
    return {"data": product}
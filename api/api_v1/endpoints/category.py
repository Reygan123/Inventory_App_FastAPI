from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict
from schemas import category
from sqlalchemy.orm import Session
from api import deps
from crud import crud_category


router = APIRouter()

@router.get("/", response_model=Dict[str, list[category.Category]])
def read_category(db: Session = Depends(deps.get_db), skip: int=0, limit: int=35) -> Any:
    category = crud_category.category.get_multi(db, skip=skip, limit=limit)
    return {"data": category}

@router.get("/{id}", response_model=Dict[str, category.Category])
def get_category(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    category = crud_category.category.get(db=db, id=id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"data": category}

@router.post("/", response_model=Dict[str, category.Category])
def create_category(
    *,
    db: Session = Depends(deps.get_db),
    customer_in: category.CategoryCreate
    ) -> Any:
    
    category = crud_category.category.create(db, obj_in=customer_in)
    return {"data": category}

@router.put("/{id}", response_model=Dict[str, category.Category])
def update_category(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    customer_in: category.CategoryUpdate
) -> Any:
    category = crud_category.category.get(db=db, id=id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    category = crud_category.category.update(db=db, db_obj=category, obj_in=customer_in)
    return {"data": category}



@router.delete("/{id}", response_model=Dict[str, category.Category])
def delete_category(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    category = crud_category.category.get(db=db, id=id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    category = crud_category.category.remove(db=db, id=id)
    return {"data": category}




from fastapi import APIRouter, Depends, HTTPException
from typing import Any
from schemas import customers
from sqlalchemy.orm import Session
from api import deps
from crud import crud_customers


router = APIRouter()

@router.get("/", response_model=list[customers.Customers])
def read_customes(db: Session = Depends(deps.get_db), skip: int=0, limit: int=35) -> Any:
    customers = crud_customers.customers.get_multi(db, skip=skip, limit=limit)
    return customers

@router.post("/", response_model=customers.Customers)
def create_customer(
    *,
    db: Session = Depends(deps.get_db),
    customer_in: customers.CustomerCreate
    ) -> Any:
    
    customer = crud_customers.customers.create(db, obj_in=customer_in)
    return customer

@router.put("/{id}", response_model=customers.Customers)
def update_customer(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    customer_in: customers.CustomerUpdate
) -> Any:
    customer = crud_customers.customers.get(db=db, id=id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    customer = crud_customers.customers.update(db=db, db_obj=customer, obj_in=customer_in)
    return customer



@router.delete("/{id}", response_model=customers.Customers)
def delete_customers(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    customer = crud_customers.customers.get(db=db, id=id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    customer = crud_customers.customers.remove(db=db, id=id)
    return customer




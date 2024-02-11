from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict, Optional
from schemas import order_product
from sqlalchemy.orm import Session
from api import deps
from crud import crud_orderProducts

router = APIRouter()

@router.get("/", response_model=Dict[str, Any])
def read_orderProducts(db: Session = Depends(deps.get_db), skip: int=0, limit: int=35, order_id: Optional[int] = None) -> Any:
    order_products = crud_orderProducts.Order_Product.get_multi(db, skip=skip, limit=limit, order_id=order_id)
    
    detailed_order_products = []
    for op in order_products:
        detailed_order_products.append({
            "id": op.id,
            "product_id": op.product_id,
            "order_id": op.order_id,
            "created_at": op.created_at,
            "updated_at": op.updated_at,
            "product_detail": {
                "product_name": op.products.name,
            },
            "order_detail": {
                "order_number": op.order.invoice,
            }
        })

    return {"data":detailed_order_products}

@router.post("/", response_model=Dict[str, order_product.Order_Product])
def create_orderProduct(
    *,
    db: Session = Depends(deps.get_db),
    customer_in: order_product.Order_ProductCreate
) -> Any:
    order_product_data = crud_orderProducts.Order_Product.create(db, obj_in=customer_in)
    
    detailed_order_product = {
        "id": order_product_data.id,
        "product_id": order_product_data.product_id,
        "order_id": order_product_data.order_id,
        "created_at": order_product_data.created_at,
        "updated_at": order_product_data.updated_at,
        "product_detail": {
            "product_name": order_product_data.products.name,
        },
        "order_detail": {
            "order_number": order_product_data.order.invoice,
        }
    }
    return {"data":detailed_order_product}

@router.put("/{id}", response_model=Dict[str, order_product.Order_Product])
def update_orderProduct(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    customer_in: order_product.Order_ProductUpdate
) -> Any:
    order_product_data = crud_orderProducts.Order_Product.get(db=db, id=id)
    if not order_product_data:
        raise HTTPException(status_code=404, detail="Order Product not found")
    
    order_product_data = crud_orderProducts.Order_Product.update(db=db, db_obj=order_product_data, obj_in=customer_in)
    
    detailed_order_product = {
        "id": order_product_data.id,
        "product_id": order_product_data.product_id,
        "order_id": order_product_data.order_id,
        "product_detail": {
            "product_name": order_product_data.products.name,
        },
        "order_detail": {
            "order_number": order_product_data.order.invoice,
        }
    }
    return {"data":detailed_order_product}

@router.delete("/{id}", response_model=Dict[str, order_product.Order_Product])
def delete_orderProducts(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    order_product_data = crud_orderProducts.Order_Product.get(db=db, id=id)
    if not order_product_data:
        raise HTTPException(status_code=404, detail="Order Product not found")
    
    crud_orderProducts.Order_Product.remove(db=db, id=id)
    return order_product_data

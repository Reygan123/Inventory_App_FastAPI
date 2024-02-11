from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Dict, Optional
from schemas import product_category
from sqlalchemy.orm import Session
from api import deps
from crud import crud_productCategory

router = APIRouter()

@router.get("/", response_model=Dict[str, Any])
def read_productCategories(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 35,
    product_id: Optional[int] = None
) -> Any:
    product_categories = crud_productCategory.product_category.get_multi(db, skip=skip, limit=limit, product_id=product_id)
    
    detailed_product_categories = []
    for pc in product_categories:
        detailed_product_categories.append({
            "id": pc.id,
            "product_id": pc.product_id,
            "category_id": pc.category_id,
            "created_at": pc.created_at,
            "updated_at": pc.updated_at,
            "product_detail": {
                "product_name": pc.products.name,
            },
            "category_detail": {
                "category_name": pc.category.name,
            }
        })

    return {"data": detailed_product_categories}

@router.get("/{id}", response_model=Dict[str, product_category.Product_Category])
def get_productCategory(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    product_category_data = crud_productCategory.product_category.get(db=db, id=id)
    if not product_category_data:
        raise HTTPException(status_code=404, detail="Product_Category not found")
    
    detailed_product_category = {
        "id": product_category_data.id,
        "product_id": product_category_data.product_id,
        "category_id": product_category_data.category_id,
        "created_at": product_category_data.created_at,
        "updated_at": product_category_data.updated_at,
        "product_detail": {
            "product_name": product_category_data.products.name,
        },
        "category_detail": {
            "category_name": product_category_data.category.name,
        }
    }
    return {"data": detailed_product_category}

@router.post("/", response_model=Dict[str, product_category.Product_Category])
def create_productCategory(
    *,
    db: Session = Depends(deps.get_db),
    customer_in: product_category.Product_CategoryCreate
) -> Any:
    product_category_data = crud_productCategory.product_category.create(db, obj_in=customer_in)
    
    detailed_product_category = {
        "id": product_category_data.id,
        "product_id": product_category_data.product_id,
        "category_id": product_category_data.category_id,
        "created_at": product_category_data.created_at,
        "updated_at": product_category_data.updated_at,
        "product_detail": {
            "product_name": product_category_data.products.name,
        },
        "category_detail": {
            "category_name": product_category_data.category.name,
        }
    }
    return {"data": detailed_product_category}

@router.put("/{id}", response_model=Dict[str, product_category.Product_Category])
def update_productCategory(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    customer_in: product_category.Product_CategoryUpdate
) -> Any:
    product_category_data = crud_productCategory.product_category.get(db=db, id=id)
    if not product_category_data:
        raise HTTPException(status_code=404, detail="Product Category not found")
    
    product_category_data = crud_productCategory.product_category.update(db=db, db_obj=product_category_data, obj_in=customer_in)
    
    detailed_product_category = {
        "id": product_category_data.id,
        "product_id": product_category_data.product_id,
        "category_id": product_category_data.category_id,
        "created_at": product_category_data.created_at,
        "updated_at": product_category_data.updated_at,
        "product_detail": {
            "product_name": product_category_data.products.name,
        },
        "category_detail": {
            "category_name": product_category_data.category.name,
        }
    }
    return {"data": detailed_product_category}

@router.delete("/{id}", response_model=Dict[str, product_category.Product_Category])
def delete_productCategorys(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    product_category_data = crud_productCategory.product_category.get(db=db, id=id)
    if not product_category_data:
        raise HTTPException(status_code=404, detail="Product Category not found")
    
    crud_productCategory.product_category.remove(db=db, id=id)
    return {"data": product_category_data}

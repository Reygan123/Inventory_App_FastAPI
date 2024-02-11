from fastapi import APIRouter
from api.api_v1.endpoints import Order_Product, home, customers, products, supplier, supply_order, product_warehouse, category, product_category, warehouse, order, supply_item


api_router = APIRouter()
api_router.include_router(home.router, tags=["home"])
api_router.include_router(customers.router,prefix="/customers", tags=["customers"])
api_router.include_router(products.router,prefix="/products", tags=["products"])
api_router.include_router(Order_Product.router,prefix="/order-products", tags=["order-products"])
api_router.include_router(supplier.router,prefix="/supplier", tags=["supplier"])
api_router.include_router(supply_order.router,prefix="/supply-order", tags=["supply-order"])
api_router.include_router(supply_item.router,prefix="/supply-item", tags=["supply-item"])
api_router.include_router(product_warehouse.router,prefix="/product-warehouse", tags=["product-warehouse"])
api_router.include_router(category.router,prefix="/category", tags=["category"])
api_router.include_router(product_category.router,prefix="/product-category", tags=["product-category"])
api_router.include_router(warehouse.router,prefix="/warehouse", tags=["warehouse"])
api_router.include_router(order.router,prefix="/order", tags=["order"])
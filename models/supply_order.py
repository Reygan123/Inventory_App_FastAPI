from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base_class import Base

class Supply_Order(Base):
    id = Column(Integer, primary_key=True, index=True)
    invoice = Column(Integer, index=True)
    total_price = Column(Integer, index=True)
    supplier_id = Column(Integer, ForeignKey('supplier.id'), index=True)
    warehouse_id = Column(Integer, ForeignKey('warehouse.id'), index=True)
    status = Column(String (255), index=True)
    created_at = Column(DateTime(), default=datetime.now())
    updated_at = Column(DateTime(), onupdate=datetime.now())

    supplier = relationship("Supplier", back_populates="supply_order")
    warehouse = relationship("Warehouse", back_populates="supply_order")
    supply_item = relationship("Supply_Item", back_populates="supply_order") 
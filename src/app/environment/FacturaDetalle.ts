export interface FacturaDetalle {
    Descripcion: string;
    Cantidad: number;
    PrecioUnitario: number;
    IVA: number; // 0 para IVA 0%, 12 para IVA 12%
    Subtotal: number;
  }
import { FacturaDetalle } from "./FacturaDetalle";

export interface Factura {
    FacturaId: number;
    ClienteNombre: string;
    Detalles: FacturaDetalle[];
    BaseImponibleIVA0: number;
    BaseImponibleIVA12: number;
    IVA: number;
    TotalPagar: number;
  }
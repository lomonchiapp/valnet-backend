"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodoPago = exports.StatusPago = void 0;
var StatusPago;
(function (StatusPago) {
    StatusPago["PENDIENTE"] = "pendiente";
    StatusPago["PAGADO"] = "pagado";
    StatusPago["CANCELADO"] = "cancelado";
})(StatusPago || (exports.StatusPago = StatusPago = {}));
var MetodoPago;
(function (MetodoPago) {
    MetodoPago["EFECTIVO"] = "efectivo";
    MetodoPago["TRANSFERENCIA"] = "transferencia";
    MetodoPago["CHEQUE"] = "cheque";
})(MetodoPago || (exports.MetodoPago = MetodoPago = {}));

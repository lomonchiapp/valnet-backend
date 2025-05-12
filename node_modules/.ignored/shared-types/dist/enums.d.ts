export declare enum UserRole {
    ADMIN = "admin",
    SUPERVISOR = "supervisor",
    INSPECTOR = "inspector",
    USER = "user"
}
export declare enum ServicePricingType {
    FIXED = "fijo",
    CALCULATED = "calculado"
}
export declare enum InvoiceStatus {
    PENDING = "pendiente",
    PAID = "pagado",
    OVERDUE = "vencido"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare enum UserGender {
    MALE = "male",
    FEMALE = "female"
}
export declare enum ServiceAssignmentStatus {
    PENDING = "pendiente",
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare enum RecurringInvoiceFrequency {
    MONTHLY = "monthly",
    WEEKLY = "weekly",
    ANNUALLY = "annually"
}
export declare enum ItemType {
    MEDICINE = "Medicamento",
    SUPPLIES = "Suministros",
    EQUIPMENT = "Equipo",
    DESPENSES = "Despensa (Alimentos)"
}
export declare enum InventoryMovementType {
    INPUT = "entrada",
    OUTPUT = "salida"
}
export declare enum AccAccountType {
    ASSETS = "assets",
    LIABILITIES = "liabilities",
    INCOME = "income",
    EXPENSES = "expenses"
}
export declare enum MeasurementUnit {
    TABLET = "tableta",
    CAPSULE = "c\u00E1psula",
    PILL = "p\u00EDldora",
    AMPOULE = "ampolla",
    VIAL = "vial",
    BOTTLE = "frasco",
    DROPS = "gotas",
    INHALER = "inhalador",
    SYRINGE = "jeringa",
    PIECE = "pieza",
    BOX = "caja",
    PACK = "paquete",
    SET = "set",
    PAIR = "par",
    ROLL = "rollo",
    BAG = "bolsa",
    KIT = "kit",
    UNIT = "unidad",
    GRAM = "gramo",
    MILLILITER = "mililitro",
    METER = "metro",
    CENTIMETER = "cent\u00EDmetro"
}
export declare enum PaymentStatus {
    PENDING = "pendiente",
    CONFIRMED = "confirmado"
}
export declare enum RecurringInvoiceStatus {
    OVERDUE = "vencida",
    PAID = "pagada",
    PARTIALLY_PAID = "parcialmente pagada",
    PENDING = "pendiente"
}
export declare enum PaymentMethod {
    CASH = "cash",
    CREDIT_CARD = "credit_card",
    DEBIT_CARD = "debit_card",
    TRANSFER = "transfer",
    CHECK = "check"
}
export declare enum CashRegisterStatus {
    AVAILABLE = "available",
    IN_USE = "in_use",
    MAINTENANCE = "maintenance"
}
export declare enum CashMovementType {
    OPEN = "open",
    CLOSE = "close",
    INCOME = "income",
    EXPENSE = "expense",
    PAYMENT = "payment"
}
export declare enum CashMovementStatus {
    COMPLETED = "completed",
    PENDING = "pending",
    CANCELLED = "cancelled"
}
export declare enum CashSessionStatus {
    ACTIVE = "active",
    CLOSED = "closed"
}
export declare enum AppointmentStatus {
    CONFIRMED = "confirmed",
    PENDING = "pending",
    CANCELLED = "cancelled"
}
export declare enum AppointmentType {
    INITIAL = "initial",
    FOLLOW_UP = "follow-up",
    CONSULTATION = "consultation"
}
export declare enum TicketStatus {
    PENDING = "pending",
    BILLING = "billing",
    IN_QUEUE = "in_queue",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare enum RecurringExpenseFrequency {
    WEEKLY = "weekly",
    MONTHLY = "monthly",
    YEARLY = "yearly"
}
export declare enum RecurringExpenseStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare enum ExpenseStatus {
    PAID = "paid",
    UNPAID = "unpaid"
}
export declare enum ItemPackagingType {
    SINGLE = "SINGLE",// Unidad
    PACKAGE = "PACKAGE",// Paquete
    BOX = "BOX",// Caja
    COMPLEX = "COMPLEX"
}
//# sourceMappingURL=enums.d.ts.map
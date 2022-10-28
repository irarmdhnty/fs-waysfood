package transactiondto

type CreateTransaction struct {
	Status    string `json:"status" form:"status" gorm:"type: varchar(255)"`
	Qty       int    `json:"qty" form:"qty" gorm:"type: int"`
	ProductID int    `json:"product_id" form:"product_id" gorm:"type: int"`
}

type UpdateTransaction struct {
	Status    string `json:"status" form:"status" gorm:"type: varchar(255)"`
	Qty       int    `json:"qty" form:"qty" gorm:"type: int"`
	ProductID int    `json:"product_id" form:"product_id" gorm:"type: int"`
}

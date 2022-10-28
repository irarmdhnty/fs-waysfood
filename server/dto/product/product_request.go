package productdto

type CreateProduct struct {
	Title string `json:"title" validate:"required"`
	Image string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Price int    `json:"price" validate:"required"`
	Qty   int    `json:"qty" form:"qty" gorm:"type: int"`
}

type UpdateProduct struct {
	Title string `json:"title" validate:"required"`
	Image string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Price int    `json:"price" validate:"required"`
	Qty   int    `json:"qty" form:"qty" gorm:"type: int"`
}

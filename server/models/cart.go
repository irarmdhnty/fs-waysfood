package models

type Cart struct {
	ID        int             `json:"id" gorm:"primary_key:auto_increment"`
	ProductID int             `json:"product_id" gorm:"type: int"`
	Products  ProductResponse `json:"product" gorm:"foreignKey:product_id;references:ID;constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	UsersID   int             `json:"user_id"`
	Users     UserProfile     `json:"user" gorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	Qty       int             `json:"qty" form:"qty"`
	Price     int             `json:"price" form:"price"`
}

type CartResponse struct {
	ID       int             `json:"id"`
	User     UserProfile     `json:"user"`
	Products ProductResponse `json:"product`
	Qty      int             `json:"qty"`
	Price    int             `json:"price"`
}

func (CartResponse) TableName() string {
	return "carts"
}

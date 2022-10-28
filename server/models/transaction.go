package models

type Transaction struct {
	ID        int             `json:"id"`
	Qty       int             `json:"qty"`
	UserID    int             `json:"user_id"`
	User      UserProfile     `json:"user" `
	Status    string          `json:"status"`
	ProductID int             `json:"product_id" gorm:"type: int"`
	Product   ProductResponse `json:"product"`
}

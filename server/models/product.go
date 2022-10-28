package models

import "time"

type Product struct {
	ID        int         `json:"id"`
	Title     string      `json:"title" gorm:"type: varchar(255)"`
	Price     int         `json:"price" gorm:"type: varchar(255)"`
	Image     string       `json:"image" form:"image" gorm:"type: varchar(255)"`
	Qty       int         `json:"qty" form:"qty"`
	UserID    int         `json:"-"`
	User      UserProfile `json:"users"`
	CreatedAt time.Time   `json:"-"`
	UpdatedAt time.Time   `json:"-"`
}

type ProductUser struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Price  int    `json:"price"`
	Image  string `json:"image"`
	Qty    int    `json:"qty" form:"qty"`
	UserID int    `json:"-"`
}

type ProductResponse struct {
	ID     int         `json:"id"`
	Title  string      `json:"name"`
	Price  int         `json:"price"`
	Image  string      `json:"image"`
	Qty    int         `json:"qty"`
	UserID int         `json:"-"`
	User   UserProfile `json:"user"`
}

func (ProductUser) TableName() string {
	return "products"
}

func (ProductResponse) TableName() string {
	return "products"
}

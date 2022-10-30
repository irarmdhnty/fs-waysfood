package database

import (
	"fmt"
	"foodways/models"
	"foodways/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(&models.User{}, &models.Product{}, &models.Product{}, &models.Transaction{}, &models.Cart{})

	if err != nil{
		fmt.Println(err)
		panic("migration eror")
	}
	fmt.Println("migration success")
}
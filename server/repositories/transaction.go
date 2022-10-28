package repositories

import (
	"foodways/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransactions(ID int) (models.Transaction, error)
	CreateTransactions(transaction models.Transaction) (models.Transaction, error)
	UpdateTransactions(transaction models.Transaction, ID int) (models.Transaction, error)
	DeleteTransactions(transaction models.Transaction, ID int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("User").Preload("Product").Find(&transaction).Error

	return transaction, err
}

func (r *repository) GetTransactions(ID int) (models.Transaction, error){
	var transactions models.Transaction
	err := r.db.Preload("User").Preload("Product").First(&transactions, ID).Error

	return transactions, err
}

func (r *repository) CreateTransactions(transaction models.Transaction) (models.Transaction, error){
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransactions(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Model(&transaction).Where("id=?", ID).Updates(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransactions(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}
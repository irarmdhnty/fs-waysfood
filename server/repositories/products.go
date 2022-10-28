package repositories

import (
	"foodways/models"

	"gorm.io/gorm"
)

type ProductRepository interface {
	FindProducts() ([]models.Product, error)
	GetProducts(ID int) (models.Product, error)
	GetProductByPartner(userID int) ([]models.Product, error)
	CreateProducts(product models.Product) (models.Product, error)
	UpdateProducts(product models.Product, ID int) (models.Product, error)
	DeleteProducts(product models.Product, ID int) (models.Product, error)
}

func RepositoryProduct(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindProducts() ([]models.Product, error) {
	var products []models.Product
	err := r.db.Preload("User").Find(&products).Error

	return products, err
}

func (r *repository) GetProducts(ID int) (models.Product, error) {
	var product models.Product
	err := r.db.Preload("User").First(&product, ID).Error

	return product, err
}

func (r *repository) GetProductByPartner(userID int) ([]models.Product, error) {
	var products []models.Product
	err := r.db.Preload("User").Where("user_id = ?", userID).Find(&products).Error

	return products, err
}

func (r *repository) CreateProducts(product models.Product) (models.Product, error) {
	err := r.db.Create(&product).Error

	return product, err
}

func (r *repository) UpdateProducts(product models.Product, ID int) (models.Product, error) {
	err := r.db.Model(&product).Where("id = ?", ID).Updates(&product).Error

	return product, err
}

func (r *repository) DeleteProducts(Product models.Product, ID int) (models.Product, error) {
	err := r.db.Delete(&Product).Error

	return Product, err
}

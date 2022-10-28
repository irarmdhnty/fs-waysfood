package transactiondto

import "foodways/models"

type TransactionResponse struct {
	ID      int                      `json:"id"`
	Users   models.UserProfile       `json:"userOrder"`
	Status  string                   `json:"status"`
	Product []models.ProductResponse `json:"order"`
}

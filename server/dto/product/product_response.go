package productdto

type ProductResponse struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Image string `json:"image"`
	Price int    `json:"price"`
	User  string `json:"user"`
}

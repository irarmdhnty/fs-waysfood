package routes

import "github.com/gorilla/mux"

func RouteInit(r *mux.Router) {
	AuthRoutes(r)
	userRouter(r)
	ProductRouter(r)
	TransactionRoutes(r)
}

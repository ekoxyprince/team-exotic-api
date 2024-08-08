import express from 'express'
const router:express.Router = express.Router()
import * as controller from '../controllers/admin.controller'
import upload from '../middlewares/upload.middleware'

router
.route("/details")
.get(controller.getAdminDetails)
.patch([upload.array("image")],controller.updateAdminDetails)
router
.route("/orders")
.get(controller.findAllOrders)
router
.route("/order/:id")
.get(controller.findSingleOrder)
.patch(controller.findAndUpdateOrder)
.delete(controller.findAndDeleteOrder)
router
.route("/client/:id")
.patch(controller.verifyUser)
router
.route("/payments")
.get(controller.getPayments)
router
.route("/payment/:id")
.delete(controller.deletePayment)
router
.route("/dashboard_details")
.get(controller.fetchDashboardData)

export default router
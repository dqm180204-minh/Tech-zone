import express from 'express';
import { getCoupons, createCoupon, toggleCoupon } from '../controllers/couponController.js';

const router = express.Router();

router.get('/', getCoupons);
router.post('/', createCoupon);
router.put('/:id/toggle', toggleCoupon);

export default router;

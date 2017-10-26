insert into appointments (shop_id, start_time, product_id, qty, total, tip, pay_mth)
 values ($1, $2, $3, $4, $5, $6, $7);
update
	products
set
	quantity = (quantity - $4)
where
	p_id = $3

select * from appointments, products
where products.p_id = appointments.product_id 
and appointments.shop_id = $1
and appointments.status = 'completed'
and appointments.start_time between $2 and $3
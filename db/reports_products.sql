select * from appointments, products
where appointments.start_time between $2 and $3
and products.p_id = appointments.product_id
and appointments.qty >= 1
and appointments.shop_id = $1
and appointments.status = 'completed'
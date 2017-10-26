insert into
	services
	(service, price, est_time, shop_id)
values
	($1, $2, $3, $4)
returning *
